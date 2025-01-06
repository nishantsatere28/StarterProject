import express from "express"
import { getEmployees,
    getEmployeeDetails
 } from "../controllers/employeeDataController"
export const employeedataRouter = express.Router()
import { adminAuth } from "../middlewares/auth"
employeedataRouter.get('/allemp' , adminAuth , getEmployees)
employeedataRouter.get('/allemp/:id', adminAuth ,getEmployeeDetails)
