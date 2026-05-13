import assert from "node:assert/strict";
import test from "node:test";

import { buildB2CLeadSheetRow } from "../lib/b2c/google-sheets.ts";

test("buildB2CLeadSheetRow formats B2C lead data in sheet column order", () => {
  assert.deepEqual(
    buildB2CLeadSheetRow({
      numberOfPeople: 2,
      travelMonth: "Jun",
      numberOfNights: 7,
      phone: "+12345678901",
      city: "Hanoi",
      notes: "Looking for beach tours",
      pagePath: "/b2c",
      submittedAt: "2026-05-13T10:30:00.000Z"
    }),
    ["2026-05-13T10:30:00.000Z", 2, "Jun", 7, "Looking for beach tours", "+12345678901", "Hanoi", "/b2c"]
  );
});

test("buildB2CLeadSheetRow stores null notes as an empty string", () => {
  assert.deepEqual(
    buildB2CLeadSheetRow({
      numberOfPeople: 1,
      travelMonth: "Dec",
      numberOfNights: 3,
      phone: "0901234567",
      city: "HCMC",
      notes: null,
      pagePath: "/",
      submittedAt: "2026-05-13T11:00:00.000Z"
    }),
    ["2026-05-13T11:00:00.000Z", 1, "Dec", 3, "", "0901234567", "HCMC", "/"]
  );
});
