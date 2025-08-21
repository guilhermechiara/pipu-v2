export type BaseProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBaseProps<T> = Omit<T, keyof BaseProps>;
export type ConstructorBaseProps<T> = Partial<BaseProps> & CreateBaseProps<T>;

export abstract class Entity<T extends BaseProps> {
  protected constructor(props: ConstructorBaseProps<T>) {
    if (this.isCreation(props)) {
      this._props = {
        ...(props as T),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      this._props = props as T;
    }
  }

  get id(): string {
    return this._props.id;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  protected _props: T;

  protected get props(): T {
    return this._props;
  }

  protected set props(props: T) {
    this._props = {
      ...props,
      updatedAt: new Date(),
    };
  }

  abstract equals(other: this): boolean;

  public toJSON(): T {
    return { ...this._props };
  }

  protected isCreation(props: ConstructorBaseProps<T>): boolean {
    return !props.createdAt || !props.updatedAt;
  }

  protected touch(): void {
    this._props.updatedAt = new Date();
  }
}
