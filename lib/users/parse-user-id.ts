export function parseUserId(id: string): number | null {
  const userId = Number(id);
  if (!Number.isInteger(userId) || userId < 1) {
    return null;
  }
  return userId;
}

/** Only allow return paths within the users list to avoid open redirects. */
export function parseReturnTo(value: string | undefined): string {
  if (!value) {
    return "/users";
  }

  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("/users")) {
      return decoded;
    }
  } catch {
    // ignore malformed encoding
  }

  return "/users";
}
