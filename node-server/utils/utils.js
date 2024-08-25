import bcrypt from "bcryptjs/dist/bcrypt.js";

export function encryptPass(password) {
  const salt = bcrypt.genSaltSync(3);
  return bcrypt.hashSync(password, salt);
}
