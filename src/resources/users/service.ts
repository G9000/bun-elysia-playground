import { NotFoundError, t } from "elysia";
import { Static } from "@sinclair/typebox";
import { typeid } from "typeid-js";
import { GraphQLContext } from "~/context";

export const UserInput = t.Object({
  email: t.String(),
  username: t.Optional(t.String()),
});

type UserInputType = Static<typeof UserInput>;

function userPrisma(context: GraphQLContext) {
  return context.prisma.user;
}

function handleErrors(error: unknown, message: string): void {
  if (error instanceof NotFoundError) {
    throw error;
  }
  console.error(message, error);
}

export async function fetchUser(
  id: string,
  context: GraphQLContext
): Promise<any> {
  try {
    const user = await userPrisma(context).findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User not found");
    return user;
  } catch (error) {
    handleErrors(error, "Error finding user:");
  }
}

export async function fetchUsers(context: GraphQLContext): Promise<any[]> {
  try {
    return await userPrisma(context).findMany();
  } catch (error) {
    handleErrors(error, "Error fetching users:");
  }
}

export async function createUser(
  args: UserInputType,
  context: GraphQLContext
): Promise<any> {
  try {
    return await userPrisma(context).create({
      data: {
        id: typeid("user").toString(),
        ...args,
      },
    });
  } catch (error) {
    handleErrors(error, "Error creating user:");
  }
}
