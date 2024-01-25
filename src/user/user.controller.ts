import { Request, Response } from "express"
import { UnitUser } from "./user.interface"
import { StatusCodes } from "http-status-codes"

import UserRepository from "./user.repository"

class UserController {


    static findAll = async (req: Request, res: Response) => {

        try {
            const alllUsers: UnitUser[] = await UserRepository.findAll()
            console.log("ahasdfasdf:"+alllUsers)
            if (!alllUsers) {
                console.log("asd")
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No Users at this time.` })
            }

            return res.status(StatusCodes.OK).json({ total_user: alllUsers.length, alllUsers })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static findOne = async (req: Request, res: Response) => {

        try {
            const user: UnitUser = await UserRepository.findOne(req.params.di)

            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: `User nof found` })
            }

            return res.status(StatusCodes.OK).json({ user })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static register = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body

            if (!username || !email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
            }

            const newUser = await UserRepository.create(req.body)

            return res.status(StatusCodes.CREATED).json({ newUser })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
            }

            const user = await UserRepository.findByEmail(email)

            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: `No user exists with the email provided....` })
            }
            const comparePassword = await UserRepository.comparePassword(email, password)

            if (!comparePassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Incorrect password` })
            }

            return res.status(StatusCodes.OK).json({ user })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body

            const getUser = await UserRepository.findOne(req.params.id)

            if (!username || !email || !password) {
                return res.status(401).json({ error: `Please provide all the required parameters` })
            }

            if (!getUser) {
                return res.status(404).json({ error: `No User with id exists` })
            }

            const updateUser = await UserRepository.update((req.params.id), req.body)

            return res.status(201).json({ updateUser })
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id = (req.params.id)
    
            const user = await UserRepository.findOne(id)
    
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({error: `User does not exists`})
            }
    
            await UserRepository.remove(id)
    
            return res.status(StatusCodes.OK).json({msg: "user deleted"})
    
        }catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        }
    }
}

export default UserController;