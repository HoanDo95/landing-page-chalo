import { createSign } from "node:crypto";

import type { B2CGatedLeadData } from "@/lib/b2c/b2c-lead-validation";

interface GoogleServiceAccountKey {
  client_email?: string;
  private_key?: string;
  token_uri?: string;
}

type B2CLeadSheetData = Required<Pick<B2CGatedLeadData, "numberOfPeople" | "travelMonth" | "numberOfNights" | "phone" | "city">> &
  Pick<B2CGatedLeadData, "notes"> & {
    pagePath: string;
    submittedAt: string;
  };

const GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }

  return value;
}

function parseServiceAccountKey(): GoogleServiceAccountKey {
  const encodedKey = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_KEY_BASE64");

  try {
    return JSON.parse(Buffer.from(encodedKey, "base64").toString("utf8")) as GoogleServiceAccountKey;
  } catch {
    throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_KEY_BASE64");
  }
}

function createJwtAssertion(key: GoogleServiceAccountKey) {
  if (!key.client_email || !key.private_key) {
    throw new Error("Google service account key must include client_email and private_key");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: key.client_email,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: key.token_uri || GOOGLE_TOKEN_URI,
    exp: now + 3600,
    iat: now
  };
  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signature = createSign("RSA-SHA256").update(signingInput).sign(key.private_key);

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

async function getAccessToken() {
  const key = parseServiceAccountKey();
  const response = await fetch(key.token_uri || GOOGLE_TOKEN_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJwtAssertion(key)
    })
  });

  const payload = (await response.json().catch(() => ({}))) as { access_token?: string; error_description?: string };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || "Failed to authenticate with Google Sheets");
  }

  return payload.access_token;
}

export function buildB2CLeadSheetRow(data: B2CLeadSheetData) {
  return [
    data.submittedAt,
    data.numberOfPeople,
    data.travelMonth,
    data.numberOfNights,
    data.notes || "",
    data.phone,
    data.city,
    data.pagePath
  ];
}

export async function appendB2CLeadToSheet(data: B2CLeadSheetData): Promise<void> {
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEETS_ID");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "B2C_Leads";
  const accessToken = await getAccessToken();
  const endpoint = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(sheetName)}!A:H:append`
  );

  endpoint.searchParams.set("valueInputOption", "USER_ENTERED");
  endpoint.searchParams.set("insertDataOption", "INSERT_ROWS");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values: [buildB2CLeadSheetRow(data)]
    })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(payload.error?.message || "Google Sheets append failed");
  }
}
