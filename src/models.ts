export interface ISelectOptions {
    table: string,
    columns?: IColumn[] | IColumn,
    condition?: IGroupConditions | IGroupConditions[],
    limit?: number,
    groupBy?: string[],
    orderBy?: string[],
    join?: IJoin | IJoin[],
    orderByDirection?: OrderByDirection
}

export interface IColumn {
    name: string,
    asigName?: string
}

export interface IJoin {
    table:string,
    condition: IGroupConditions | IGroupConditions[],
    type: TypeJoin
}

export interface ICondition {
    columnName: string,
    operator: Operator
    value: string | number,
}

export interface IGroupConditions {
    groupConditions: ICondition[]
}

export interface IParams {
    name: string,
    value: string | number
}

export interface IResult {
    query: string,
    params?: IParams[]
}

export enum Operator {
    Equals = "=",
    Distinct = "<>",
    In = "in",
    Like = "like",
    greaterThanOrEqual = ">=",
    lessThanOrEqual = "<="
}

export enum OrderByDirection {
    ASC = "asc",
    DESC = "desc"
}

export enum TypeJoin {
    Inner = 'inner',
    Right = 'right',
    Left = 'left',
    Full = 'full outer'
}