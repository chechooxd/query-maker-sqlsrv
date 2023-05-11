export interface ISelectOptions {
  table: string;
  columns?: IColumn[] | IColumn;
  condition?: IGroupConditions | IGroupConditions[];
  limit?: number;
  groupBy?: string[];
  orderBy?: string[];
  join?: IJoin | IJoin[];
  orderByDirection?: OrderByDirection;
}

export interface IColumn {
  name: string;
  asigName?: string;
}

export interface IColumnCreate {
  name: string;
  type: TypeColumn;
  length?: number;
  notNull?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  unique?: boolean;
  defaultValue?: string;
  check?: string;
  foreignKey?: IForeignKey;
}

export interface IForeignKey {
  table: string;
  column: string;
}

export interface IJoin {
  table: string;
  condition: IGroupConditions | IGroupConditions[];
  type: TypeJoin;
}

export interface ICondition {
  columnName: string;
  operator: Operator;
  value: string | number | boolean;
  values: string[] | number[] | boolean[];
}

export interface IGroupConditions {
  groupConditions: ICondition[];
}

export interface IParams {
  name: string;
  value: string | number;
}

export interface IResult {
  query: string;
  params?: IParams[];
}

export enum Operator {
  Equals = "=",
  Distinct = "<>",
  In = "in",
  Like = "like",
  greaterThanOrEqual = ">=",
  lessThanOrEqual = "<=",
  between = "between",
}

export enum OrderByDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum TypeJoin {
  Inner = "inner",
  Right = "right",
  Left = "left",
  Full = "full outer",
}

export enum TypeColumn {
  String = "varchar",
  Number = "int",
  Date = "date",
  DateTime = "datetime",
  Boolean = "bit",
  Decimal = "decimal",
  Float = "float",
  Double = "double",
  Text = "text",
  LongText = "longtext",
  MediumText = "mediumtext",
  TinyText = "tinytext",
  Blob = "blob",
  LongBlob = "longblob",
  MediumBlob = "mediumblob",
  TinyBlob = "tinyblob",
  Binary = "binary",
  VarBinary = "varbinary",
  Char = "char",
  VarChar = "varchar",
  Time = "time",
  Year = "year",
  Timestamp = "timestamp",
  Enum = "enum",
  Set = "set",
  Geometry = "geometry",
  Point = "point",
  LineString = "linestring",
  Polygon = "polygon",
  MultiPoint = "multipoint",
  MultiLineString = "multilinestring",
  MultiPolygon = "multipolygon",
  GeometryCollection = "geometrycollection",
  Json = "json",
  TinyInt = "tinyint",
  SmallInt = "smallint",
  MediumInt = "mediumint",
  Int = "int",
  BigInt = "bigint",
}

export interface ITypeValue {
  value: string | number | boolean;
}

export interface IInsertOptions {
  table: string;
  columns: IColumn[] | IColumn;
  values: ITypeValue[] | ITypeValue;
}

export interface IUpdateOptions {
  table: string;
  columns: IColumn[] | IColumn;
  values: ITypeValue[] | ITypeValue;
  condition?: IGroupConditions | IGroupConditions[];
}

export interface IDeleteOptions {
  table: string;
  condition?: IGroupConditions | IGroupConditions[];
}

export interface ICreateTableOptions {
  table: string;
  columns: IColumnCreate[];
}

export enum TypeQuery {
  Select = "select",
  Insert = "insert",
  Update = "update",
  Delete = "delete",
  CreateTable = "create table",
}
