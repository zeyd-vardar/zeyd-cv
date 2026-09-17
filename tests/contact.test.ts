import assert from "node:assert/strict";
import test from "node:test";
import { validateContact, contactLimits } from "../src/utils/validateContact.ts";

const validValues = {
  name: "Test Visitor",
  email: "test@example.com",
  subject: "Portfolio feedback",
  message: "This is a sufficiently detailed test message.",
};

test("accepts a valid contact message", () => {
  assert.deepEqual(validateContact(validValues), {});
});

test("rejects empty and whitespace-only values", () => {
  assert.deepEqual(validateContact({ name: " ", email: "", subject: "\n", message: "   " }), {
    name: "required",
    email: "required",
    subject: "required",
    message: "required",
  });
});

test("rejects malformed emails and short trimmed messages", () => {
  assert.deepEqual(
    validateContact({ ...validValues, email: "not-an-email", message: "  short  " }),
    {
      email: "email",
      message: "short",
    },
  );
});

test("enforces the message boundary and maximum length", () => {
  assert.equal(validateContact({ ...validValues, message: "a".repeat(19) }).message, "short");
  assert.deepEqual(validateContact({ ...validValues, message: "a".repeat(20) }), {});
  assert.equal(
    validateContact({ ...validValues, message: "a".repeat(contactLimits.message + 1) }).message,
    "long",
  );
});

test("allows surrounding whitespace in a valid email", () => {
  assert.deepEqual(validateContact({ ...validValues, email: " test@example.com " }), {});
});
