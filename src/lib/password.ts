import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

export interface PasswordHash {
  salt: string;
  hash: string;
}

export function hashPassword(password: string): PasswordHash {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password: string, stored: PasswordHash): boolean {
  const hash = scryptSync(password, stored.salt, 64);
  const expected = Buffer.from(stored.hash, "hex");
  return hash.length === expected.length && timingSafeEqual(hash, expected);
}
