import bcrypt from 'bcrypt';

export async function validatePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}