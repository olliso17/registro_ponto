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

// src/application/usecases/workedHours/getAllWorkedHoursByEmployeeId.usecase.ts
var getAllWorkedHoursByEmployeeId_usecase_exports = {};
__export(getAllWorkedHoursByEmployeeId_usecase_exports, {
  GetAllWorkedByEmployeeIdUsecase: () => GetAllWorkedByEmployeeIdUsecase
});
module.exports = __toCommonJS(getAllWorkedHoursByEmployeeId_usecase_exports);

// src/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
};

// src/application/usecases/workedHours/getAllWorkedHoursByEmployeeId.usecase.ts
var GetAllWorkedByEmployeeIdUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id) {
    if (!employee_id.trim()) {
      throw new AppError("Todos os campos devem ser preenchidos.", 500);
    }
    return this.workedHourssRepository.getAllWorkedHoursByEmployeeId(employee_id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllWorkedByEmployeeIdUsecase
});
