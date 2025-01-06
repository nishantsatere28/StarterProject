import e, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { employee } from "../models/employee";
import asyncHandler from "../helpers/asyncHandler";

const employeefilePath = path.join('src', 'data', 'employees.json');
let employeeData: employee[] | null = null; 

// Function to load employee data from file
const loadEmployeeData = async () => {
  try {
    const data = await fs.readFile(employeefilePath, 'utf-8');
    const employees = JSON.parse(data);
    if (employees?.data && Array.isArray(employees.data)) {
      employeeData = employees.data;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Error reading or parsing file:', error);
    throw new Error('Failed to load employee data');
  }
};

// Route to get all employees
const getEmployees = asyncHandler (async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!employeeData) {
      await loadEmployeeData();
    }
    res.status(200).json({ data: employeeData });
  } catch (error: Error | any) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
  }
})

// Route to get employee details by ID
const getEmployeeDetails = asyncHandler (async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!employeeData) {
      await loadEmployeeData();
    }

    const id: number = parseInt(req.params.id.trim());
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const employee_details = employeeData?.find(emp => emp.id === id);
    if (!employee_details) {
      return res.status(404).json({ message: `Employee with id ${id} not found` });
    }
    return res.status(200).json({ employee: employee_details });
  } catch (error: Error | any) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
  }
});

export {
  getEmployees,
  getEmployeeDetails
};
