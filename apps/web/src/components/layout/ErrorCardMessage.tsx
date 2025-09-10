import { Alert, AlertDescription, AlertTitle } from "@pipu/ui/components";
import { CircleAlert } from "lucide-react";
import { ApiError } from "../../lib/apiError";
import { ERROR_CODES } from "@pipu/api";

export interface ErrorCardMessageProps {
  error: ApiError;
}

export function ErrorCardMessage({ error }: ErrorCardMessageProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Oops, alguma coisa falhou! :(</AlertTitle>
      <AlertDescription>
        {error.code === ERROR_CODES.HTTP.INTERNAL_SERVER_ERROR
          ? "Algo deu errado, tente novamente mais tarde!"
          : error.message}
      </AlertDescription>
    </Alert>
  );
}
