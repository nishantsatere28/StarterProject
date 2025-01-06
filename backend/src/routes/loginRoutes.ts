import express from "express"
import { handleLogin } from "../controllers/loginController"

export const loginRouter = express.Router()

loginRouter.post('/login',handleLogin)