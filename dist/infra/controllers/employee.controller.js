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

// src/infra/controllers/employee.controller.ts
var employee_controller_exports = {};
__export(employee_controller_exports, {
  default: () => employee_controller_default
});
module.exports = __toCommonJS(employee_controller_exports);

// src/infra/repositories/employee/employee.repository.ts
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

// src/application/usecases/employee/createEmployee.usecase.ts
var CreateEmployeeUsecase = class {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }
  async execute(name) {
    if (!name.trim()) {
      throw new AppError("Todos os campos devem ser preenchidos.", 500);
    }
    return this.employeeRepository.createEmployee(name);
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

// src/application/usecases/employee/getEmployeeById.usecase.ts
var GetEmployeeByIdUsecase = class {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }
  async execute(id) {
    return this.employeeRepository.getEmployeeById(id);
  }
};

// src/infra/controllers/employee.controller.ts
var EmployeeController = class {
  createEmployeeUsecase;
  getEmployeeByHashUsecase;
  getEmployeeByIdUsecase;
  constructor() {
    const employeeRepository = new employee_repository_default();
    this.createEmployeeUsecase = new CreateEmployeeUsecase(employeeRepository);
    this.getEmployeeByHashUsecase = new GetEmployeeByHashUsecase(employeeRepository);
    this.getEmployeeByIdUsecase = new GetEmployeeByIdUsecase(employeeRepository);
  }
  async createEmployee(req, res) {
    const { name } = req.body;
    try {
      const employee = await this.createEmployeeUsecase.execute(name);
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create employee" });
    }
  }
  async getEmployeeByHash(req, res) {
    const { hash } = req.body;
    try {
      const employee = await this.getEmployeeByHashUsecase.execute(hash);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch employee" });
    }
  }
  async getEmployeeById(req, res) {
    const { id } = req.params;
    try {
      const employee = await this.getEmployeeByIdUsecase.execute(id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch employee" });
    }
  }
  // async getAllEmployees(req: Request, res: Response): Promise<Response> {
  //     try {
  //         const employees = await this.employeeRepository.getAllEmployees();
  //         return res.status(200).json(employees);
  //     } catch (error) {
  //         return res.status(500).json({ error: 'Failed to fetch employees' });
  //     }
  // }
  // async updateEmployee(req: Request, res: Response): Promise<Response> {
  //     const { id } = req.params;
  //     const updateData = req.body;
  //     try {
  //         const updatedEmployee = await this.employeeRepository.updateEmployee(id, updateData);
  //         if (!updatedEmployee) {
  //             return res.status(404).json({ error: 'Employee not found' });
  //         }
  //         return res.status(200).json(updatedEmployee);
  //     } catch (error) {
  //         return res.status(500).json({ error: 'Failed to update employee' });
  //     }
  // }
  // async deleteEmployee(req: Request, res: Response): Promise<Response> {
  //     const { id } = req.params;
  //     try {
  //         await this.employeeRepository.deleteEmployee(id);
  //         return res.status(204).send();
  //     } catch (error) {
  //         return res.status(500).json({ error: 'Failed to delete employee' });
  //     }
  // }
};
var employee_controller_default = EmployeeController;
