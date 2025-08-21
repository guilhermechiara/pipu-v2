export interface ICommand<I, O = void> {
  execute(input: I): Promise<O> | O | void;
}
