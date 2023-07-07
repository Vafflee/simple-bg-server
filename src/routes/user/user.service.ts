import { db } from "../../db/prisma";
import { hashPassword } from "../../utils/password/hashPassword";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const hash = await hashPassword(password);

  return await db.user.create({
    data: {
      ...rest,
      password: hash
    }
  })
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email
    }
  })
}

export async function getUsers() {
  return await db.user.findMany();
}