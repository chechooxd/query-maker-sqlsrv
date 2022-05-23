import * as Models from "./models";

export const models = Models

export function createSelect(options: Models.ISelectOptions): Models.IResult {

    const columns = getColumns(options.columns)
    const first = options.limit ? ` top ${options.limit} ` : ' '

    let result: Models.IResult = {
        query: `select ${first}${columns} from ${options.table}`
    }

    if(options.join) {
        result.query += getJoins(options.join)
    }

    if(options.condition){
        result.query += ` where ${getConditions(options.condition)}` 
    }

    if(options.groupBy){
        result.query += ` group by ${options.groupBy.join(',')}` 
    }

    if(options.orderBy){
        result.query += ` order by ${options.orderBy.join(',')} ${options.orderByDirection ? options.orderByDirection : ''}` 
    }

    return result
}

function getJoins (joins:Models.IJoin | Models.IJoin[]) {
    let result = []
    
    if (Array.isArray(joins)){
        for (const join of joins){
            result.push(`${join.type} join ${join.table} on ${getConditions(join.condition)}`)
        }
    }else{
        result.push(`${joins.type} join ${joins.table} on ${getConditions(joins.condition)}`)
    }

    return result.length > 0 ? result.join(' ') : result[0]
}

function getColumns(data?: Models.IColumn | Models.IColumn[]): string | string[] {
    let dataColums: string[] | string = []
    if (data)
        if (Array.isArray(data)) {
            for (const column of data) {
                dataColums.push(`${column.name} as ${column.asigName ? column.asigName : column.name}`)
            }
        } else {
            dataColums = `${data?.name} as ${data?.asigName ? data?.asigName : data?.name}`
        }

    return dataColums.length > 0 ? dataColums : '*'
}

function getConditions(conditionsGroup: Models.IGroupConditions | Models.IGroupConditions[]): string {
    let result: string[] = []

    if (Array.isArray(conditionsGroup)) {
        for (const conditions of conditionsGroup) {
            let group: string[] = []

            for (const condition of conditions.groupConditions) {
                group.push(`${condition.columnName} ${condition.operator} ${condition.value}`)
            }

            result.push(`( ${group.join(' and ')} )`)
        }

    } else {
        let group: string[] = []

        for (const condition of conditionsGroup.groupConditions) {
            group.push(`${condition.columnName} ${condition.operator} ${condition.value}`)
        }
        result.push(`( ${group.join(' and ')} )`)
    }

    return result.length > 0 ? result.join(' or ') : result[0]
}
