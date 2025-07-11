import { UNAUTHORIZED } from "../transport/errors";

export function assertUserIsOwner(userID: string, ownerID: string) {
  if (userID !== ownerID) {
    throw new Error(UNAUTHORIZED);
  }
}
