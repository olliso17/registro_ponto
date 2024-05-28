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

// src/infra/repositories/type/type.repository.ts
var type_repository_exports = {};
__export(type_repository_exports, {
  TypeRepository: () => TypeRepository
});
module.exports = __toCommonJS(type_repository_exports);
var import_client = require("@prisma/client");

// src/domain/entities/type/type.ts
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

// src/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
};

// src/infra/repositories/type/type.repository.ts
var prisma = new import_client.PrismaClient();
var TypeRepository = class {
  async getAllType() {
    try {
      const typeData = await prisma.type.findMany();
      const typeAll = [];
      typeData.map((typeData2) => {
        const type = new TypeEntity(typeData2);
        typeAll.push(type);
      });
      return typeAll;
    } catch (error) {
      throw new AppError("Failed to  get hash employee", 500);
    } finally {
      await prisma.$disconnect();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeRepository
});
