import type { UserRepository } from "@backend/db/repository/user";
import type { MealPreferences } from "@backend/db/schema";
import type { Context } from "@backend/transport/context";
import { assertUserIsOwner } from "@backend/permissions";
export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getById(ctx: Context, id: string) {
    assertUserIsOwner(ctx.user.id, id);

    return this.userRepository.getById(ctx.db, id);
  }

  async setPreferences(
    ctx: Context,
    id: string,
    preferences: Partial<MealPreferences>
  ) {
    // TODO ensure updates don't overwrite other existing preferences
    return this.userRepository.upsertUserPreferences(ctx.db, id, preferences);
  }
  async getPreferences(ctx: Context, id: string) {
    assertUserIsOwner(ctx.user.id, id);

    return this.userRepository.getUserPreferences(ctx.db, id);
  }
}
