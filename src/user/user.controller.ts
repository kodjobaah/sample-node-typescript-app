import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { User } from '../models/User';
import { Address } from '../models/Address';
import sequelize from '../db';


const userRepository = sequelize.getRepository(User);
const addressRepository = sequelize.getRepository(Address);

class UserController {


    static register = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body

            if (!username || !email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
            }

            const newUser = userRepository.create({ username: username, email: email, userpassword: password });

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
            const alllUsers = await userRepository.findAll({include: [addressRepository]})

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
    
            const address = await addressRepository.findOne({ where: { postcode: postcode } })
            const user = await userRepository.findAll({ where: { email: email }})
            await userRepository.update({ addressId: address.id }, { where: { id: user[0].id } });
            return res.status(StatusCodes.OK).json({ msg: 'user updated' })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }

    }
    static findAllAddress = async (req: Request, res: Response) => {

        try {
            const alllUsers = await addressRepository.findAll({include: [userRepository]})

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

            const newAddress = addressRepository.create({ address: address, postcode: postcode });
            return res.status(StatusCodes.CREATED).json({ newAddress })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        }
    }

}

export default UserController;