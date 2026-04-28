const isDevelopment = process.env.NODE_ENV === "development";

function logClientError(type: string, payload: unknown) {
  if (!isDevelopment) return;

  console.error("[client-error]", {
    type,
    payload,
  });
}

try {
  performance.mark("app-client-init");

  window.addEventListener("error", (event) => {
    logClientError("error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logClientError("unhandledrejection", {
      reason:
        event.reason instanceof Error
          ? {
              name: event.reason.name,
              message: event.reason.message,
            }
          : String(event.reason),
    });
  });
} catch (error) {
  logClientError("instrumentation-client", error);
}

export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse",
) {
  try {
    performance.mark(`navigation-start:${navigationType}:${url}`);

    if (isDevelopment) {
      console.info("[navigation-start]", { url, navigationType });
    }
  } catch (error) {
    logClientError("navigation-instrumentation", error);
  }
}
