export abstract class Mapper<TModel, TDatabaseRecord, TResponse> {
  abstract toDatabase(item: TModel): TDatabaseRecord;

  abstract toResponse(item: TModel): TResponse;

  abstract toModel(item: TDatabaseRecord): TModel;
}
