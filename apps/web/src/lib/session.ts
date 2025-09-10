import { cookies } from "next/headers";

export async function getSession() {
  return (await cookies()).get("auth")?.value;
}
