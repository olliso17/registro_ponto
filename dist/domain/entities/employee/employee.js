"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/domain/entities/employee/employee.ts
var employee_exports = {};
__export(employee_exports, {
  Employee: () => Employee
});
module.exports = __toCommonJS(employee_exports);
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

// src/domain/entities/employee/employee.ts
var CRC32 = __toESM(require("crc-32"));
var Employee = class {
  _id;
  _name;
  _created_at;
  _updated_at;
  _active;
  _hash;
  constructor(props) {
    this._id = props.id || (0, import_uuid.v4)();
    this._name = props.name;
    this._created_at = props.created_at || /* @__PURE__ */ new Date();
    this._updated_at = props.updated_at || /* @__PURE__ */ new Date();
    this._active = props.active || true;
    this._hash = this.generateHash(this._name);
    this.validateEmployee();
  }
  get hash() {
    return this._hash;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }
  get active() {
    return this._active;
  }
  generateHash(name) {
    const hash = CRC32.str(name);
    this._hash = (hash >>> 0).toString(16).padStart(8, "0");
    return this._hash;
  }
  validateEmployee() {
    if (stringNotNullAndBlankSpace.test(this._name) === false) {
      throw new AppError("Name is not a valid employee", 500);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Employee
});
