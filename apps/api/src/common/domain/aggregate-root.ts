import { nanoid } from "nanoid";
import { BaseProps, ConstructorBaseProps, Entity } from "./entity";
import { Event } from "../events/event";

export type AggregateProps = BaseProps & {
  id: string;
};

export type CreateAggregateProps<T> = Omit<T, keyof AggregateProps>;
export type ConstructorAggregateProps<T> = Partial<AggregateProps> &
  CreateAggregateProps<T>;

export abstract class AggregateRoot<
  T extends AggregateProps,
> extends Entity<T> {
  private readonly _domainEvents: Array<Event<unknown>> = [];

  protected constructor(props: ConstructorAggregateProps<T>, id?: string) {
    const aggregateProps = {
      ...props,
      id: props.id ?? id ?? nanoid(),
    } as ConstructorBaseProps<T>;

    super(aggregateProps);
  }

  get id(): string {
    return this._props.id;
  }

  get domainEvents(): ReadonlyArray<Event<unknown>> {
    return [...this._domainEvents];
  }

  get raisedEvents(): Event<unknown>[] {
    return this.domainEvents as Event<unknown>[];
  }

  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  hasUncommittedEvents(): boolean {
    return this._domainEvents.length > 0;
  }

  equals(other: this): boolean {
    if (!other || !(other instanceof AggregateRoot)) {
      return false;
    }
    return this.id === other.id;
  }

  protected raiseDomainEvent(event: Event<unknown>): void {
    this._domainEvents.push(event);
  }
}
