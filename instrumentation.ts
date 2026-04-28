import type { Instrumentation } from "next";

const SENSITIVE_HEADER_NAMES = /authorization|cookie|token|secret|key/i;

function redactHeaders(headers: Record<string, string | string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(headers)
      .filter((entry): entry is [string, string | string[]] => {
        const [, value] = entry;
        return value !== undefined;
      })
      .map(([name, value]) => [
        name,
        SENSITIVE_HEADER_NAMES.test(name) ? "[redacted]" : value,
      ]),
  );
}

function formatError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      digest:
        "digest" in error && typeof error.digest === "string"
          ? error.digest
          : undefined,
    };
  }

  return {
    name: "UnknownError",
    message: String(error),
    digest: undefined,
  };
}

export function register() {
  if (process.env.NODE_ENV === "development") {
    console.info("[instrumentation] registered", {
      runtime: process.env.NEXT_RUNTIME ?? "nodejs",
    });
  }
}

export const onRequestError: Instrumentation.onRequestError = (
  error,
  request,
  context,
) => {
  console.error("[request-error]", {
    error: formatError(error),
    request: {
      method: request.method,
      path: request.path,
      headers: redactHeaders(request.headers),
    },
    context: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
      revalidateReason: context.revalidateReason,
    },
  });
};
