import { nanoid } from "nanoid";

export type EventProps<T = never> = {
  id: string;
  type: string;
  payload: T;
  occurredOn: Date;
  version?: number;
};

export class Event<T> {
  private readonly _props: EventProps<T>;

  constructor(props: Partial<EventProps<T>>) {
    this._props = {
      id: props.id || nanoid(),
      type: props.type || this.constructor.name,
      occurredOn: props.occurredOn || new Date(),
      payload: props.payload || ({} as T),
      version: props.version || 1,
    };
  }

  get id(): string {
    return this._props.id;
  }

  get payload(): T {
    return this._props.payload;
  }

  get type(): string {
    return this._props.type;
  }

  get occurredOn(): Date {
    return this._props.occurredOn;
  }

  get version(): number {
    return this._props.version;
  }

  static from<T>(props: EventProps<T>): Event<T> {
    return new Event({
      id: props.id,
      occurredOn: props.occurredOn,
      payload: props.payload,
      type: props.type,
      version: props.version,
    });
  }
}
