"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeJoin = exports.OrderByDirection = exports.Operator = void 0;
var Operator;
(function (Operator) {
    Operator["Equals"] = "=";
    Operator["Distinct"] = "<>";
    Operator["In"] = "in";
    Operator["Like"] = "like";
    Operator["greaterThanOrEqual"] = ">=";
    Operator["lessThanOrEqual"] = "<=";
})(Operator = exports.Operator || (exports.Operator = {}));
var OrderByDirection;
(function (OrderByDirection) {
    OrderByDirection["ASC"] = "asc";
    OrderByDirection["DESC"] = "desc";
})(OrderByDirection = exports.OrderByDirection || (exports.OrderByDirection = {}));
var TypeJoin;
(function (TypeJoin) {
    TypeJoin["Inner"] = "inner";
    TypeJoin["Right"] = "right";
    TypeJoin["Left"] = "left";
    TypeJoin["Full"] = "full outer";
})(TypeJoin = exports.TypeJoin || (exports.TypeJoin = {}));
//# sourceMappingURL=models.js.map