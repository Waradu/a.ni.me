export const errorMsg = (error: unknown) =>
  typeof error === "string"
    ? error
    : error instanceof Error
    ? error.message
    : JSON.stringify(error);
