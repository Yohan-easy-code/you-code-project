import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export const action = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ServerError) {
      return error.message;
    }

    return "An unexpected error occurred";
  },
});

export const authenticatedAction = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ServerError) {
      return error.message;
    }

    return "An unexpected error occurred";
  },
}).use(async ({ next }) => {
  const session = await auth();

  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw new ServerError("You must be logged in to perform this action");
  }

  return next({
    ctx: {
      userId,
      user,
      session,
    },
  });
});
