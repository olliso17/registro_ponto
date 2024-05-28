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

// src/infra/controllers/workedHours.controller.ts
var workedHours_controller_exports = {};
__export(workedHours_controller_exports, {
  default: () => workedHours_controller_default
});
module.exports = __toCommonJS(workedHours_controller_exports);

// src/error/app.error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
};

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
var import_client = require("@prisma/client");

// src/domain/entities/workedHours/workedHours.ts
var import_uuid = require("uuid");

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

// src/infra/repositories/workedHours/workedHours.repository.ts
var prisma = new import_client.PrismaClient();
var WorkedHoursRepository = class {
  async createWorkedHours(employee_id, hours_worked, type_id) {
    try {
      const date = (/* @__PURE__ */ new Date()).toDateString();
      const workedHoursData = await prisma.workedHours.create({
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
      await prisma.$disconnect();
    }
  }
  async getAllWorkedHoursByEmployeeId(employee_id) {
    try {
      const workedHoursData = await prisma.workedHours.findMany(
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
      await prisma.$disconnect();
    }
  }
  async getAllWorkedHoursByCreated(employee_id) {
    try {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const workedHoursData = await prisma.workedHours.findMany(
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
      await prisma.$disconnect();
    }
  }
  async getWorkedHoursByEntryType(employee_id) {
    try {
      const workedHoursData = await prisma.workedHours.findMany(
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
      await prisma.$disconnect();
    }
  }
  async getWorkedHoursByExitType(employee_id) {
    try {
      const workedHoursData = await prisma.workedHours.findMany(
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
      await prisma.$disconnect();
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
