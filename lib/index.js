"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectQuesry = exports.models = void 0;
var Models = __importStar(require("./models"));
exports.models = Models;
function selectQuesry(options) {
    var columns = getDataColumns(options.data);
    var first = options.limit ? " top " + options.limit + " " : ' ';
    var result = {
        query: "select" + first + columns + " from " + options.table
    };
    if (options.join) {
        result.query += getJoins(options.join);
    }
    if (options.condition) {
        result.query += " where " + getConditions(options.condition);
    }
    if (options.groupBy) {
        result.query += " group by " + options.groupBy.join(',');
    }
    if (options.orderBy) {
        result.query += " order by " + options.orderBy.join(',') + " " + (options.orderByDirection ? options.orderByDirection : '');
    }
    return result;
}
exports.selectQuesry = selectQuesry;
function getJoins(joins) {
    var result = [];
    if (Array.isArray(joins)) {
        for (var _i = 0, joins_1 = joins; _i < joins_1.length; _i++) {
            var join = joins_1[_i];
            result.push(join.type + " join " + join.table + " on " + getConditions(join.condition));
        }
    }
    else {
        result.push(joins.type + " join " + joins.table + " on " + getConditions(joins.condition));
    }
    return result.length > 0 ? result.join(' ') : result[0];
}
function getDataColumns(data) {
    var dataColums = [];
    if (data)
        if (Array.isArray(data)) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var column = data_1[_i];
                dataColums.push(column.name + " as " + (column.asigName ? column.asigName : column.name));
            }
        }
        else {
            dataColums = (data === null || data === void 0 ? void 0 : data.name) + " as " + ((data === null || data === void 0 ? void 0 : data.asigName) ? data === null || data === void 0 ? void 0 : data.asigName : data === null || data === void 0 ? void 0 : data.name);
        }
    return dataColums.length > 0 ? dataColums : '*';
}
function getConditions(conditionsGroup) {
    var result = [];
    if (Array.isArray(conditionsGroup)) {
        for (var _i = 0, conditionsGroup_1 = conditionsGroup; _i < conditionsGroup_1.length; _i++) {
            var conditions = conditionsGroup_1[_i];
            var group = [];
            for (var _a = 0, _b = conditions.groupConditions; _a < _b.length; _a++) {
                var condition = _b[_a];
                group.push(condition.columnName + " " + condition.operator + " " + condition.value);
            }
            result.push("( " + group.join(' and ') + " )");
        }
    }
    else {
        var group = [];
        for (var _c = 0, _d = conditionsGroup.groupConditions; _c < _d.length; _c++) {
            var condition = _d[_c];
            group.push(condition.columnName + " " + condition.operator + " " + condition.value);
        }
        result.push("( " + group.join(' and ') + " )");
    }
    return result.length > 0 ? result.join(' or ') : result[0];
}
var operators = Models.Operator;
var campos = [
    {
        name: 'testColumn1'
    },
    {
        name: 'testColumn2',
        asigName: 'name'
    },
    {
        name: 'testColumn3',
        asigName: 'users'
    },
    {
        name: 'testColumn4'
    }
];
var condicion = [
    {
        columnName: 'testColumn1',
        value: '@id',
        operator: operators.Equals
    },
    {
        columnName: 'testColumn1',
        value: '@id',
        operator: operators.Distinct
    }
];
var grupoCondicion = [
    {
        groupConditions: condicion
    },
    {
        groupConditions: condicion
    }
];
var joins = [
    {
        table: "tabla tabla1",
        type: Models.TypeJoin.Inner,
        condition: grupoCondicion
    }
];
var options = {
    table: 'Test',
    limit: 10,
    data: campos,
    condition: grupoCondicion,
    orderBy: ['testColumn1'],
    orderByDirection: Models.OrderByDirection.ASC,
    join: joins
};
console.log(selectQuesry(options));
//# sourceMappingURL=index.js.map