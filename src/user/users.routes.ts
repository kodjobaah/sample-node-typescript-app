import express, {Request, Response} from "express"

import UserController from "./user.controller"

export const userRouter = express.Router()

userRouter.get("/users", UserController.findAll)

// userRouter.get("/user/:id", UserController.findOne)

userRouter.post("/register", UserController.register)

userRouter.post("/address", UserController.address)

userRouter.get("/addresses", UserController.findAllAddress)

userRouter.put("/address", UserController.update)
// userRouter.post("/login", UserController.login)

// userRouter.put('/user/:id', UserController.update)

// userRouter.delete("/user/:id", UserController.delete)