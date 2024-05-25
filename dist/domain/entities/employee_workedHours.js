"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/domain/entities/employee_workedHours.ts
var employee_workedHours_exports = {};
__export(employee_workedHours_exports, {
  EmployeeWorkedHours: () => EmployeeWorkedHours
});
module.exports = __toCommonJS(employee_workedHours_exports);
var EmployeeWorkedHours = class {
  _worked_hours_id;
  _employee_id;
  _created_at;
  constructor(props) {
    this._worked_hours_id = props.worked_hours_id;
    this._employee_id = props.employe_id;
    this._created_at = /* @__PURE__ */ new Date();
  }
  get worked_hours_id() {
    return this._worked_hours_id;
  }
  get employee_id() {
    return this._employee_id;
  }
  get created_at() {
    return this._created_at;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmployeeWorkedHours
});
