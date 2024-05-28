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

// src/domain/entities/workedHours/workedHours.ts
var workedHours_exports = {};
__export(workedHours_exports, {
  WorkedHours: () => WorkedHours
});
module.exports = __toCommonJS(workedHours_exports);
var import_uuid = require("uuid");

// src/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
};

// src/util/regex.ts
var stringNotNullAndBlankSpace = /^(?!\s*$).+/;

// src/domain/entities/workedHours/workedHours.ts
var WorkedHours = class {
  _id;
  _hours_worked;
  _employee_id;
  _created_at;
  _date;
  _type_id;
  /* eslint-disable */
  _type;
  _employee;
  /* eslint-enable */
  constructor(props) {
    this._id = props.id || (0, import_uuid.v4)();
    this._employee_id = props.employee_id;
    this._created_at = props.created_at || /* @__PURE__ */ new Date();
    this._type_id = props.type_id;
    this._date = props.date || (/* @__PURE__ */ new Date()).toDateString();
    this._hours_worked = props.hours_worked || "00h 00m";
    this._type = props.type || null;
    this._employee = props.employee || null;
    this.validateWorkedHours();
  }
  get id() {
    return this._id;
  }
  get type() {
    return this._type;
  }
  get employee() {
    return this._employee;
  }
  get date() {
    return this._date;
  }
  get hours_worked() {
    return this._hours_worked;
  }
  get type_id() {
    return this._type_id;
  }
  get employee_id() {
    return this._employee_id;
  }
  get created_at() {
    return this._created_at;
  }
  validateWorkedHours() {
    if (stringNotNullAndBlankSpace.test(this._employee_id) === false) {
      throw new AppError("Employee id is not a valid", 500);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkedHours
});
