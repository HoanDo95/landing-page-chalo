import assert from "node:assert/strict";
import test from "node:test";

import {
  B2C_LEAD_SHEET_VALUE_INPUT_OPTION,
  buildB2CLeadSheetRow,
  isB2CGoogleSheetsConfigured
} from "../lib/b2c/google-sheets.ts";

test("buildB2CLeadSheetRow formats B2C lead data in sheet column order", () => {
  assert.deepEqual(
    buildB2CLeadSheetRow({
      numberOfPeople: 2,
      travelDate: "2026-06-15",
      numberOfNights: 7,
      phone: "+12345678901",
      destinations: ["Hanoi city", "Halong Bay"],
      notes: "Looking for beach tours",
      pagePath: "/b2c",
      submittedAt: "2026-05-13T10:30:00.000Z"
    }),
    [
      "2026-05-13T10:30:00.000Z",
      2,
      "2026-06-15",
      7,
      "Looking for beach tours",
      "+12345678901",
      "Hanoi city, Halong Bay",
      "/b2c"
    ]
  );
});

test("buildB2CLeadSheetRow stores null notes as an empty string", () => {
  assert.deepEqual(
    buildB2CLeadSheetRow({
      numberOfPeople: 1,
      travelDate: "2026-12-01",
      numberOfNights: 3,
      phone: "0901234567",
      destinations: ["Ho Chi Minh city"],
      notes: null,
      pagePath: "/",
      submittedAt: "2026-05-13T11:00:00.000Z"
    }),
    ["2026-05-13T11:00:00.000Z", 1, "2026-12-01", 3, "", "0901234567", "Ho Chi Minh city", "/"]
  );
});

test("B2C Google Sheets append writes raw values so + phone numbers stay as text", () => {
  assert.equal(B2C_LEAD_SHEET_VALUE_INPUT_OPTION, "RAW");
});

test("isB2CGoogleSheetsConfigured returns false when the required env vars are missing", () => {
  const originalSheetId = process.env.GOOGLE_SHEETS_ID;
  const originalKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

  delete process.env.GOOGLE_SHEETS_ID;
  delete process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

  try {
    assert.equal(isB2CGoogleSheetsConfigured(), false);
  } finally {
    process.env.GOOGLE_SHEETS_ID = originalSheetId;
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 = originalKey;
  }
});

test("isB2CGoogleSheetsConfigured returns true when the required env vars are present", () => {
  const originalSheetId = process.env.GOOGLE_SHEETS_ID;
  const originalKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

  process.env.GOOGLE_SHEETS_ID = "sheet-id";
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 = "encoded-key";

  try {
    assert.equal(isB2CGoogleSheetsConfigured(), true);
  } finally {
    process.env.GOOGLE_SHEETS_ID = originalSheetId;
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 = originalKey;
  }
});
