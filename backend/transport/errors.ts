import { TRPCError } from "@trpc/server";

export function castToTRPCError(error: Error): TRPCError {
  switch (error.name) {
    case NOT_FOUND:
      return new TRPCError({
        code: "NOT_FOUND",
        message: error.message,
      });
    case UNAUTHORIZED:
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      });
    case BAD_REQUEST:
      return new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    case INTERNAL:
    default:
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
  }
}

export const BAD_REQUEST = "bad_request";
export const NOT_FOUND = "not_found";
export const UNAUTHORIZED = "permission_denied";
export const INTERNAL = "internal_error";
