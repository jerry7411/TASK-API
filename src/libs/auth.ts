export const checkAuth = (headers: Record<string, string>) => {
  const token = process.env.API_TOKEN;
  const authHeader = headers["authorization"] || headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const provided = authHeader.split(" ")[1];
  return provided === token;
};
