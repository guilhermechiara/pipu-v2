import { getApiServer } from "./api/api-server";
import { NextResponse } from "next/server";

export async function routeHandlerWrapper<T>(endpoint: string) {
  const client = await getApiServer();
  const response = await client.get<T>(endpoint);

  if (!response.ok) {
    return NextResponse.json(
      {
        statusCode: response.error.statusCode,
        code: response.error.code,
        description: response.error.description,
      },
      { status: response.error.statusCode },
    );
  }

  return NextResponse.json(response.data);
}
