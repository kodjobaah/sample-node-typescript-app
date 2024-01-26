import { Request, Response } from "express"
import { UnitUser } from "./user.interface"
import { StatusCodes } from "http-status-codes"

import { User, Address } from '../models/User.model'
import UserRepository from "./user.repository"


class UserController {


    static register = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body

            if (!username || !email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
            }

            const newUser = User.create({ username: username, email: email, userpassword: password });

            return res.status(StatusCodes.CREATED).json({ newUser })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static assignUserToAddress = async (req: Request, res: Response) => {

        try {
            const { user_id, address_id } = req.body
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }
    static findAll = async (req: Request, res: Response) => {

        try {
            const alllUsers = await User.findAll({ attributes: ['id', 'username', 'email'] })

            if (!alllUsers) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No Users at this time.` })
            }

            return res.status(StatusCodes.OK).json({ total_user: alllUsers.length, alllUsers })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }


    static update = async (req: Request, res: Response) => {

        try {
            const {email, postcode}  = req.body
        

            const address = await Address.findOne({ where: { postcode: postcode } })
            const user = await User.findOne({ where: { email: email }, attributes: ['id', 'username', 'email'] })
            address.familymembers.push(user);
            user.address = address;
            await user.save();
            await address.save();
            return res.status(StatusCodes.OK).json({ msg: 'user updated' })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }

    }
    static findAllAddress = async (req: Request, res: Response) => {

        try {
            const alllUsers = await Address.findAll()

            if (!alllUsers) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No Users at this time.` })
            }

            return res.status(StatusCodes.OK).json({ total_user: alllUsers.length, alllUsers })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

    static address = async (req: Request, res: Response) => {

        try {
            const { address, postcode } = req.body
            if (!address || !postcode) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
            }

            const newAddress = Address.create({ address: address, postcode: postcode });
            return res.status(StatusCodes.CREATED).json({ newAddress })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

}

export default UserController;