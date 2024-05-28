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

// src/domain/entities/type/type.ts
var type_exports = {};
__export(type_exports, {
  TypeEntity: () => TypeEntity
});
module.exports = __toCommonJS(type_exports);
var import_uuid = require("uuid");
var TypeEntity = class {
  _id;
  _name;
  constructor(props) {
    this._id = props.id || (0, import_uuid.v4)();
    this._name = props.name || "";
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeEntity
});
