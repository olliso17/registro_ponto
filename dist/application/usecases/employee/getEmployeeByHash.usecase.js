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

// src/application/usecases/employee/getEmployeeByHash.usecase.ts
var getEmployeeByHash_usecase_exports = {};
__export(getEmployeeByHash_usecase_exports, {
  GetEmployeeByHashUsecase: () => GetEmployeeByHashUsecase
});
module.exports = __toCommonJS(getEmployeeByHash_usecase_exports);

// src/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
};

// src/application/usecases/employee/getEmployeeByHash.usecase.ts
var GetEmployeeByHashUsecase = class {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }
  async execute(hash) {
    if (!hash.trim()) {
      throw new AppError("required hash.", 500);
    }
    return this.employeeRepository.getEmployeeByHash(hash);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetEmployeeByHashUsecase
});
