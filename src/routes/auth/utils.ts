import { GraphQLContext } from "~/context";
import { isWithinExpiration } from "lucia/utils";

const EMAIL_VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 60; // 1 hour

export async function generateEmailVerificationToken(
  context: GraphQLContext,
  user_id: string
): Promise<string> {
  const storedUserTokens = await context.prisma.emailVerification.findMany({
    where: {
      user_id,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      return isWithinExpiration(
        Number(token.expires) - EMAIL_VERIFICATION_TOKEN_EXPIRES_IN / 2
      );
    });

    if (reusableStoredToken) return reusableStoredToken.id;
  }

  try {
    const newEmailVerificationToken =
      await context.prisma.emailVerification.create({
        data: {
          user_id,
          expires: new Date(
            new Date().getTime() + EMAIL_VERIFICATION_TOKEN_EXPIRES_IN
          ),
        },
      });

    return newEmailVerificationToken.id;
  } catch (error) {
    throw new Error("Could not generate email verification token");
  }
}

export async function validateEmailVerificationToken(
  context: GraphQLContext,
  token: string
) {
  const storedToken = await context.prisma.emailVerification.findUnique({
    where: {
      id: token,
    },
  });

  if (!storedToken) throw new Error("Invalid token");

  const tokenExpires = Number(storedToken.expires);

  if (!isWithinExpiration(tokenExpires)) throw new Error("Token expired");

  return storedToken.user_id;
}
