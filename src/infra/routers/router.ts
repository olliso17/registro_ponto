import express from 'express';
import EmployeeController from '../controllers/employee.controller';
import WorkedHoursController from '../controllers/workedHours.controller';
import TypeController from '../controllers/type.controller';

const router = express.Router();
const employeeController = new EmployeeController();
const workedHoursController = new WorkedHoursController();
const typeController = new TypeController();

router.post('/employee/create', (req, res) => employeeController.createEmployee(req, res));
router.post('/employee/login', (req, res) => employeeController.getEmployeeByHash(req, res));
router.post('/workedHours/create', (req, res) => workedHoursController.createWorkedHours(req, res));
router.get('/workedHours/:employee_id', (req, res) => workedHoursController.getWorkedHoursByEmployeeId(req, res));
router.get('/employee/:id', (req, res) => employeeController.getEmployeeById(req, res));
router.get('/type/', (req, res) => typeController.getAllType(req, res));
router.get('/workedHours/created/:employee_id', (req, res) => workedHoursController.getWorkedHoursByCreated(req, res));
router.get('/workedHours/entry/:employee_id', (req, res) => workedHoursController.getWorkedHoursByEntryType(req, res));
router.get('/workedHours/exit/:employee_id', (req, res) => workedHoursController.getWorkedHoursByExitType(req, res));
// router.get('/employees/:id', (req, res) => employeeController.getEmployeeById(req, res));
// router.get('/employees', (req, res) => employeeController.getAllEmployees(req, res));
// router.put('/employees/:id', (req, res) => employeeController.updateEmployee(req, res));
// router.delete('/employees/:id', (req, res) => employeeController.deleteEmployee(req, res));

export default router;