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

// src/infra/repositories/employee/employee.repository.ts
var employee_repository_exports = {};
__export(employee_repository_exports, {
  default: () => employee_repository_default
});
module.exports = __toCommonJS(employee_repository_exports);
var import_client = require("@prisma/client");
var CRC322 = __toESM(require("crc-32"));

// src/domain/entities/employee/employee.ts
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

// src/infra/repositories/employee/employee.repository.ts
var prisma = new import_client.PrismaClient();
var EmployeeRepository = class {
  async createEmployee(name) {
    const codigo = CRC322.str(name);
    const hash = (codigo >>> 0).toString(16).padStart(8, "0");
    try {
      const employeeData = await prisma.employee.create({
        data: {
          name,
          hash
        }
      });
      const employee = new Employee({
        name: employeeData.name,
        hash: employeeData.hash,
        id: employeeData.id,
        created_at: employeeData.created_at,
        active: employeeData.active,
        updated_at: employeeData.updated_at
      });
      return employee;
    } catch (error) {
      throw new AppError("Name is not a valid employee", 500);
    } finally {
      await prisma.$disconnect();
    }
  }
  async getEmployeeById(id) {
    try {
      const employeeData = await prisma.employee.findUnique({
        where: {
          id
        },
        include: {
          workedHours: {
            include: {
              type: true
            }
          }
        }
      });
      if (!employeeData)
        return null;
      const employee = new Employee({
        name: employeeData.name,
        hash: employeeData.hash,
        id: employeeData.id,
        created_at: employeeData.created_at,
        active: employeeData.active,
        updated_at: employeeData.updated_at
      });
      return employee;
    } catch (error) {
      throw new AppError("Failed to get employee by id", 500);
    } finally {
      await prisma.$disconnect();
    }
  }
  async getEmployeeByHash(hash) {
    try {
      const employeeData = await prisma.employee.findFirst({
        where: {
          hash
        },
        include: {
          workedHours: {
            include: {
              type: true
            }
          }
        }
      });
      if (!employeeData)
        return null;
      const employee = new Employee(employeeData);
      return employee;
    } catch (error) {
      throw new AppError("Failed to  get hash employee", 500);
    } finally {
      await prisma.$disconnect();
    }
  }
  // async getAllEmployees(): Promise<Employee[]> {
  //     const employeesData = await prisma.employee.findMany();
  //     return employeesData.map(employeeData => {
  //         const employee = new Employee({
  //             name: employeeData.name
  //         });
  //         return employee;
  //     });
  // }
  // async updateEmployee(id: string, data: any): Promise<Employee | null> {
  //     try {
  //         await prisma.employee.update({
  //             where: {
  //                 id,
  //             },
  //             data,
  //         });
  //         const updatedEmployeeData = await prisma.employee.findUnique({
  //             where: {
  //                 id,
  //             },
  //         });
  //         if (!updatedEmployeeData) return null;
  //         const updatedEmployee = new Employee({
  //             name: updatedEmployeeData.name,
  //             updated_at: updatedEmployeeData.updated_at,
  //             active: updatedEmployeeData.active
  //         });
  //         return updatedEmployee;
  //     } catch (error) {
  //         throw new AppError('Failed to update employee', 500);
  //     }
  // }
  // async deleteEmployee(id: string): Promise<void> {
  //     try {
  //         await prisma.employee.delete({
  //             where: {
  //                 id,
  //             },
  //         });
  //     } catch (error) {
  //         throw new AppError('Failed to delete employee', 500);
  //     }
  // }
};
var employee_repository_default = EmployeeRepository;
