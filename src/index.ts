import * as Models from "./models";

export const models = Models;

export function createSelect(options: Models.ISelectOptions): Models.IResult {
  const columns = getColumns(options.columns, Models.TypeQuery.Select);
  const first = options.limit ? ` top ${options.limit} ` : " ";

  let result: Models.IResult = {
    query: `select ${first}${columns} from ${options.table}`,
  };

  if (options.join) {
    result.query += getJoins(options.join);
  }

  if (options.condition) {
    result.query += ` where ${getConditions(options.condition)}`;
  }

  if (options.groupBy) {
    result.query += ` group by ${options.groupBy.join(",")}`;
  }

  if (options.orderBy) {
    result.query += ` order by ${options.orderBy.join(",")} ${
      options.orderByDirection ? options.orderByDirection : ""
    }`;
  }

  return result;
}

function getJoins(joins: Models.IJoin | Models.IJoin[]) {
  let result = [];

  if (Array.isArray(joins)) {
    for (const join of joins) {
      result.push(
        `${join.type} join ${join.table} on ${getConditions(join.condition)}`
      );
    }
  } else {
    result.push(
      `${joins.type} join ${joins.table} on ${getConditions(joins.condition)}`
    );
  }

  return result.length > 0 ? result.join(" ") : result[0];
}

function getColumns(
  data?: Models.IColumn | Models.IColumn[],
  type?: Models.TypeQuery
): string | string[] {
  let dataColums: string[] | string = [];
  if (data) {
    switch (type) {
      case Models.TypeQuery.Insert:
        if (Array.isArray(data)) {
          dataColums = data.map((column) => column.name).join(",");
        } else {
          dataColums = data.name;
        }
        break;
      case Models.TypeQuery.Select:
        if (Array.isArray(data)) {
          for (const column of data) {
            dataColums.push(
              `${column.name} ${column.asigName ? "as " + column.asigName : ""}`
            );
          }
        } else {
          dataColums = `${data?.name} ${
            data?.asigName ? "as " + data?.asigName : ""
          }`;
        }
        break;
    }
  }

  return dataColums.length > 0 ? dataColums : "*";
}

function getConditions(
  conditionsGroup: Models.IGroupConditions | Models.IGroupConditions[]
): string {
  let result: string[] = [];

  if (Array.isArray(conditionsGroup)) {
    for (const conditions of conditionsGroup) {
      let group: string[] = [];

      for (const condition of conditions.groupConditions) {
        const { columnName, operator, value, values } = condition;
        switch (operator) {
          case Models.Operator.In:
            const valuesReturn = values.map((value) =>
              validateValue({ value })
            );
            group.push(`${columnName} ${operator} (${valuesReturn.join(",")})`);
            break;
          case Models.Operator.Like:
            group.push(`${columnName} ${operator} '%${value}%'`);
            break;
          case Models.Operator.between:
            group.push(
              `${columnName} ${operator} ${validateValue({
                value: values[0],
              })} and ${validateValue({ value: values[1] })}`
            );
            break;
          default:
            group.push(`${columnName} ${operator} ${validateValue({ value })}`);
            break;
        }
        group.push(`${columnName} ${operator} ${validateValue({ value })}`);
      }

      result.push(`( ${group.join(" and ")} )`);
    }
  } else {
    let group: string[] = [];

    for (const condition of conditionsGroup.groupConditions) {
      group.push(
        `${condition.columnName} ${condition.operator} ${condition.value}`
      );
    }
    result.push(`( ${group.join(" and ")} )`);
  }

  return result.length > 0 ? result.join(" or ") : result[0];
}

export function createInsert(options: Models.IInsertOptions): Models.IResult {
  const table = options.table;
  const columns = getColumns(options.columns, Models.TypeQuery.Insert);
  const values: string = getValidateValues(
    Array.isArray(options.values) ? options.values : [options.values]
  );

  let result: Models.IResult = {
    query: `insert into ${table} (${columns}) values (${values})`,
  };

  return result;
}

export function createUpdate(options: Models.IUpdateOptions): Models.IResult {
  const { table, columns, values, condition } = options;

  let result: Models.IResult = {
    query: `update ${table}`,
  };

  if (Array.isArray(columns) && Array.isArray(values)) {
    let set: string[] = [];

    for (let i = 0; i < columns.length; i++) {
      set.push(`${columns[i]} = ${validateValue(values[i])}`);
    }

    result.query += ` set ${set.join(", ")}`;
  } else {
    const value = Array.isArray(values)
      ? validateValue(values[0])
      : validateValue(values);
    result.query += ` set ${columns} = ${value}`;
  }

  if (condition) {
    result.query += ` where ${getConditions(condition)}`;
  }

  return result;
}

export function createDelete(options: Models.IDeleteOptions): Models.IResult {
  const table = options.table;
  const condition = options.condition ? getConditions(options.condition) : "";

  let result: Models.IResult = {
    query: `delete from ${table}`,
  };

  if (options.condition) {
    result.query += ` where ${condition}`;
  }

  return result;
}

export function CreateTable(
  options: Models.ICreateTableOptions
): Models.IResult {
  const { table, columns } = options;

  let result: Models.IResult = {
    query: `create table ${table} (`,
  };

  let columnsQuery: string[] = [];

  for (const column of columns) {
    let columnQuery = `${column.name} ${column.type}`;

    if (column.primaryKey) {
      columnQuery += " primary key";
    }

    if (column.autoIncrement) {
      columnQuery += " identity(1,1)";
    }

    if (column.notNull) {
      columnQuery += " not null";
    }

    if (column.unique) {
      columnQuery += " unique";
    }

    if (column.defaultValue) {
      columnQuery += ` default ${validateValue({
        value: column.defaultValue,
      })}`;
    }

    if (column.foreignKey) {
      columnQuery += ` foreign key references ${column.foreignKey.table} (${column.foreignKey.column})`;
    }

    columnsQuery.push(columnQuery);
  }

  result.query += columnsQuery.join(", ") + ")";

  return result;
}

function validateValue(value: Models.ITypeValue): string {
  if (typeof value === "string") {
    return `'${value}'`;
  } else if (typeof value === "number") {
    return `${value}`;
  } else if (typeof value === "boolean") {
    return `${value ? 1 : 0}`;
  } else {
    return `${value}`;
  }
}

function getValidateValues(values: Models.ITypeValue[]): string {
  let result: string[] = [];

  for (const value of values) {
    result.push(validateValue(value));
  }

  return result.join(",");
}
