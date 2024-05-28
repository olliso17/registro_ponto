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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app,
  port: () => port
});
module.exports = __toCommonJS(app_exports);
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var import_express2 = __toESM(require("express"));

// src/infra/routers/router.ts
var import_express = __toESM(require("express"));

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

// src/application/usecases/workedHours/createWorkedHours.usecase.ts
var CreateWorkedHoursUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id, hours_worked, type_id) {
    if (!employee_id.trim() || !type_id.trim()) {
      throw new AppError("Todos os campos devem ser preenchidos.", 500);
    }
    return this.workedHourssRepository.createWorkedHours(employee_id, hours_worked, type_id);
  }
};

// src/application/usecases/workedHours/getAllWorkedHoursByCreated.ts
var GetAllWorkedHoursByCreatedUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id) {
    return this.workedHourssRepository.getAllWorkedHoursByCreated(employee_id);
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

// src/infra/repositories/workedHours/workedHours.repository.ts
var import_client2 = require("@prisma/client");

// src/domain/entities/workedHours/workedHours.ts
var import_uuid2 = require("uuid");
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
    this._id = props.id || (0, import_uuid2.v4)();
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

// src/infra/repositories/workedHours/workedHours.repository.ts
var prisma2 = new import_client2.PrismaClient();
var WorkedHoursRepository = class {
  async createWorkedHours(employee_id, hours_worked, type_id) {
    try {
      const date = (/* @__PURE__ */ new Date()).toDateString();
      const workedHoursData = await prisma2.workedHours.create({
        data: {
          employee_id,
          hours_worked,
          type_id,
          date
        }
      });
      const workedHours = new WorkedHours({
        id: workedHoursData.id,
        date: workedHoursData.date,
        created_at: workedHoursData.created_at,
        employee_id: workedHoursData.employee_id,
        hours_worked: workedHoursData.hours_worked,
        type_id: workedHoursData.type_id
      });
      return workedHours;
    } catch (error) {
      throw new AppError("Failed to create employee workedhours", 500);
    } finally {
      await prisma2.$disconnect();
    }
  }
  async getAllWorkedHoursByEmployeeId(employee_id) {
    try {
      const workedHoursData = await prisma2.workedHours.findMany(
        {
          where: {
            employee_id
          },
          include: {
            employee: true,
            type: {
              select: {
                name: true
              }
            }
          }
        }
      );
      const workedHours = [];
      workedHoursData.map((worked) => {
        const hours = new WorkedHours(worked);
        workedHours.push(hours);
      });
      return workedHours;
    } catch (error) {
      throw new AppError("Failed to get all employee workedhours", 500);
    } finally {
      await prisma2.$disconnect();
    }
  }
  async getAllWorkedHoursByCreated(employee_id) {
    try {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const workedHoursData = await prisma2.workedHours.findMany(
        {
          where: {
            employee_id
          },
          include: {
            employee: true,
            type: {
              select: {
                name: true
              }
            }
          }
        }
      );
      const workedHours = [];
      workedHoursData.map((worked) => {
        if (worked.date === today) {
          const hours = new WorkedHours(worked);
          workedHours.push(hours);
        }
      });
      return workedHours;
    } catch (error) {
      throw new AppError("Failed to get all employee worked hours", 500);
    } finally {
      await prisma2.$disconnect();
    }
  }
  async getWorkedHoursByEntryType(employee_id) {
    try {
      const workedHoursData = await prisma2.workedHours.findMany(
        {
          where: {
            employee_id
          },
          include: {
            employee: true,
            type: {
              select: {
                name: true
              }
            }
          }
        }
      );
      const workedHours = [];
      workedHoursData.map((worked) => {
        if (worked.type.name === "entrada") {
          const hours = new WorkedHours(worked);
          workedHours.push(hours);
        }
      });
      return workedHours;
    } catch (error) {
      throw new AppError("Failed to get all employee worked hours", 500);
    } finally {
      await prisma2.$disconnect();
    }
  }
  async getWorkedHoursByExitType(employee_id) {
    try {
      const workedHoursData = await prisma2.workedHours.findMany(
        {
          where: {
            employee_id
          },
          include: {
            employee: true,
            type: {
              select: {
                name: true
              }
            }
          }
        }
      );
      const workedHours = [];
      workedHoursData.map((worked) => {
        if (worked.type.name === "saida") {
          const hours = new WorkedHours(worked);
          workedHours.push(hours);
        }
      });
      return workedHours;
    } catch (error) {
      throw new AppError("Failed to get all employee worked hours", 500);
    } finally {
      await prisma2.$disconnect();
    }
  }
};
var workedHours_repository_default = WorkedHoursRepository;

// src/application/usecases/workedHours/getWorkedHourEntryType.usecase.ts
var GetWorkedHoursByEntryTypeUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id) {
    return this.workedHourssRepository.getWorkedHoursByEntryType(employee_id);
  }
};

// src/application/usecases/workedHours/getWorkedHourExitType.usecase.ts
var GetWorkedHoursByExitTypeUsecase = class {
  constructor(workedHourssRepository) {
    this.workedHourssRepository = workedHourssRepository;
  }
  async execute(employee_id) {
    return this.workedHourssRepository.getWorkedHoursByExitType(employee_id);
  }
};

// src/infra/controllers/workedHours.controller.ts
var WorkedHoursController = class {
  createWorkedHoursUsecase;
  getAllWorkedByEmployeeIdUsecase;
  getAllWorkedHoursByCreatedUsecase;
  getWorkedHoursByEntryTypeUsecase;
  getWorkedHoursByExitTypeUsecase;
  constructor() {
    const workedHoursRepository = new workedHours_repository_default();
    this.createWorkedHoursUsecase = new CreateWorkedHoursUsecase(workedHoursRepository);
    this.getAllWorkedByEmployeeIdUsecase = new GetAllWorkedByEmployeeIdUsecase(workedHoursRepository);
    this.getAllWorkedHoursByCreatedUsecase = new GetAllWorkedHoursByCreatedUsecase(workedHoursRepository);
    this.getWorkedHoursByEntryTypeUsecase = new GetWorkedHoursByEntryTypeUsecase(workedHoursRepository);
    this.getWorkedHoursByExitTypeUsecase = new GetWorkedHoursByExitTypeUsecase(workedHoursRepository);
  }
  async createWorkedHours(req, res) {
    const { employee_id, hours_worked, type_id } = req.body;
    try {
      const workedHours = await this.createWorkedHoursUsecase.execute(employee_id, hours_worked, type_id);
      return res.status(201).json(workedHours);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create WorkedHours" });
    }
  }
  async getWorkedHoursByEmployeeId(req, res) {
    const { employee_id } = req.params;
    try {
      const workedHours = await this.getAllWorkedByEmployeeIdUsecase.execute(employee_id);
      if (!workedHours) {
        return res.status(404).json({ error: "Employee Worked Hours not found" });
      }
      return res.status(200).json(workedHours);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch Employee Worked Hours" });
    }
  }
  async getWorkedHoursByCreated(req, res) {
    const { employee_id } = req.params;
    try {
      const workedHours = await this.getAllWorkedHoursByCreatedUsecase.execute(employee_id);
      if (!workedHours) {
        return res.status(404).json({ error: "Employee Worked Hours not found" });
      }
      return res.status(200).json(workedHours);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch Employee Worked Hours" });
    }
  }
  async getWorkedHoursByEntryType(req, res) {
    const { employee_id } = req.params;
    try {
      const workedHours = await this.getWorkedHoursByEntryTypeUsecase.execute(employee_id);
      if (!workedHours) {
        return res.status(404).json({ error: "Employee Worked Hours not found" });
      }
      return res.status(200).json(workedHours);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch Employee Worked Hours" });
    }
  }
  async getWorkedHoursByExitType(req, res) {
    const { employee_id } = req.params;
    try {
      const workedHours = await this.getWorkedHoursByExitTypeUsecase.execute(employee_id);
      if (!workedHours) {
        return res.status(404).json({ error: "Employee Worked Hours not found" });
      }
      return res.status(200).json(workedHours);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch Employee Worked Hours" });
    }
  }
};
var workedHours_controller_default = WorkedHoursController;

// src/application/usecases/type/getAllType.usecase.ts
var GetAllTypeUsecase = class {
  constructor(typeRepository) {
    this.typeRepository = typeRepository;
  }
  async execute() {
    return this.typeRepository.getAllType();
  }
};

// src/infra/repositories/type/type.repository.ts
var import_client3 = require("@prisma/client");

// src/domain/entities/type/type.ts
var import_uuid3 = require("uuid");
var TypeEntity = class {
  _id;
  _name;
  constructor(props) {
    this._id = props.id || (0, import_uuid3.v4)();
    this._name = props.name || "";
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
};

// src/infra/repositories/type/type.repository.ts
var prisma3 = new import_client3.PrismaClient();
var TypeRepository = class {
  async getAllType() {
    try {
      const typeData = await prisma3.type.findMany();
      const typeAll = [];
      typeData.map((typeData2) => {
        const type = new TypeEntity(typeData2);
        typeAll.push(type);
      });
      return typeAll;
    } catch (error) {
      throw new AppError("Failed to  get hash employee", 500);
    } finally {
      await prisma3.$disconnect();
    }
  }
};

// src/infra/controllers/type.controller.ts
var TypeController = class {
  getAllTypeUsecase;
  constructor() {
    const typeRepository = new TypeRepository();
    this.getAllTypeUsecase = new GetAllTypeUsecase(typeRepository);
  }
  async getAllType(req, res) {
    try {
      const type = await this.getAllTypeUsecase.execute();
      return res.status(200).json(type);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch type" });
    }
  }
};
var type_controller_default = TypeController;

// src/infra/routers/router.ts
var router = import_express.default.Router();
var employeeController = new employee_controller_default();
var workedHoursController = new workedHours_controller_default();
var typeController = new type_controller_default();
router.post("/employee/create", (req, res) => employeeController.createEmployee(req, res));
router.post("/employee/login", (req, res) => employeeController.getEmployeeByHash(req, res));
router.post("/workedHours/create", (req, res) => workedHoursController.createWorkedHours(req, res));
router.get("/workedHours/:employee_id", (req, res) => workedHoursController.getWorkedHoursByEmployeeId(req, res));
router.get("/employee/:id", (req, res) => employeeController.getEmployeeById(req, res));
router.get("/type/", (req, res) => typeController.getAllType(req, res));
router.get("/workedHours/created/:employee_id", (req, res) => workedHoursController.getWorkedHoursByCreated(req, res));
router.get("/workedHours/entry/:employee_id", (req, res) => workedHoursController.getWorkedHoursByEntryType(req, res));
router.get("/workedHours/exit/:employee_id", (req, res) => workedHoursController.getWorkedHoursByExitType(req, res));
var router_default = router;

// src/app.ts
import_dotenv.default.config();
var app = (0, import_express2.default)();
var port = process.env.PORT || 3e3;
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
var corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((0, import_cors.default)(corsOptions));
app.use("/api", router_default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app,
  port
});
