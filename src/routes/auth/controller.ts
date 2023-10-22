import { LuciaError } from "lucia";
import { GraphQLContext } from "~/context";
import { betterTryCatch } from "utils/error-utils";
import { generateEmailVerificationToken } from "./utils";
import { sendVerificationEmail } from "./email";
import { CreateUserInfoPayload, authResponse } from "./validation";

export async function createUser(
  args: CreateUserInfoPayload,
  context: GraphQLContext
): Promise<authResponse> {
  const createUserPromise = context.auth.createUser({
    key: {
      password: args.password,
      providerId: "email",
      providerUserId: args.email.toLowerCase(),
    },
    attributes: {
      username: args.email.split("@")[0],
      email: args.email,
    },
  });

  const [user, error] = await betterTryCatch(createUserPromise);

  if (error) {
    return {
      success: false,
      message: `Failed to create user: ${error}`,
    };
  }

  const token = await generateEmailVerificationToken(context, user.userId);
  await sendVerificationEmail(args.email, token)();

  return {
    success: true,
    message: "Registration successful!",
  };
}

export async function signIn(
  args: CreateUserInfoPayload,
  context: GraphQLContext
): Promise<authResponse> {
  const { email, password } = args;
  try {
    const [key, error] = await betterTryCatch(
      context.auth.useKey("email", email, password)
    );

    if (error) {
      return {
        success: false,
        message: "Invalid Email or password",
      };
    }

    const user = await context.auth.getUser(key.userId);

    if (!user.emailVerified) {
      return {
        success: false,
        message: "Please verify your email first ??",
      };
    }

    const session = await context.auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    context.auth.createSessionCookie(session);

    return {
      success: true,
      message: `Sign in as ${email}`,
    };
  } catch (error) {
    if (
      error instanceof LuciaError &&
      error.message === `AUTH_INVALID_USER_ID`
    ) {
      return {
        success: false,
        message: "Invalid user ID.",
      };
    }
    return {
      success: false,
      message: `An unexpected error occurred during the sign-in process: ${error}`,
    };
  }
}
