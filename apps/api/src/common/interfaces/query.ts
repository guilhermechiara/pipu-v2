export interface IQuery<I = void, O = void> {
  execute(input: I | void): Promise<O> | O | void;
}
