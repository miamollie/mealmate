import type { User } from "@backend/db/schema";
import { UNAUTHORIZED } from "../transport/errors";

export function assertUserIsOwner(user: User | null, ownerID: string) {
  if (!user) {
    throw new Error(UNAUTHORIZED);
  }
  if (user.id !== ownerID) {
    throw new Error(UNAUTHORIZED);
  }
}
