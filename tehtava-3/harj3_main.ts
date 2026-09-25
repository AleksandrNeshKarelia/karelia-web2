export interface Entity {
  readonly id: string;
}

export interface User extends Entity {
  name: string;
  age: number;
}

export abstract class BaseRepository<T extends Entity> {
  private items: Map<string, T> = new Map();
  protected log(action: string, entityId: string): void {}

  add(item: T): void {
    this.items.set(item.id, item);
    this.log("ADD", item.id);
  }

  public getById(id: string): T | undefined {
    return this.items.get(id);
  }

  public getAll(): readonly T[] {
    return Array.from(this.items.values());
  }

  public abstract validate(item: T): boolean;
}

export class UserRepository extends BaseRepository<User> {
  public validate(user: User): boolean {
    return user.age >= 18 && user.name.length > 0;
  }

  // Implement validate and override add with validation
  public add(user: User): void {
    if (!this.validate(user)) {
      throw new Error(
        "Invalid user detected. User must be at least 18 years old and have a non-empty name.",
      );
    }
    super.add(user);
  }
}
