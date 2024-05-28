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

// src/application/usecases/workedHours/getWorkedHourExitType.usecase.ts
var getWorkedHourExitType_usecase_exports = {};
__export(getWorkedHourExitType_usecase_exports, {
  GetWorkedHoursByExitTypeUsecase: () => GetWorkedHoursByExitTypeUsecase
});
module.exports = __toCommonJS(getWorkedHourExitType_usecase_exports);
var GetWorkedHoursByExitTypeUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id) {
    return this.workedHourssRepository.getWorkedHoursByExitType(employee_id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetWorkedHoursByExitTypeUsecase
});
