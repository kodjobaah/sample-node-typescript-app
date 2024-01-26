
import { User, UnitUser, Users } from "./user.interface";
import bycrypt from "bcryptjs"
import { v4 as random } from "uuid"
import { findOne, findAll, findByEmail, saveUsers, users } from "./user.database";
class UserRepository {

    /**
    * Creates a new user with a unique ID and hashed password
    * @param userData - The user data to be used for creation
    * @returns The created user object, or null if the user already exists
    */
    static create = async (userData: UnitUser): Promise<UnitUser | null> => {
        let id;
        let check_user;
        do {
            id = random();
            check_user = await findOne(id);
        } while (check_user);

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(userData.password, salt)

        const user: UnitUser = {
            id: id,
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        }

        users[id] = user;

        return user;
    }

    static findOne = async (id: string): Promise<UnitUser> => {
        const user = await findOne(id);
        return user;
    }
    
    static findAll = async (): Promise<UnitUser[]> => {
        let users
        try {
            users = await findAll();
        } catch (error) {
            console.log(error)
        }
        return users;
    }

    static findByEmail = async (user_email: string): Promise<null | UnitUser> => {
        const user = await findByEmail(user_email);
        return user;
    }

    static comparePassword = async (email: string, supplied_password: string): Promise<null | UnitUser> => {

        const user = await findByEmail(email);

        const decryptPassword = await bycrypt.compare(supplied_password, user!.password);

        if (!decryptPassword) {
            return null;
        }

        return user

    }

    static update = async (id: string, updateValues: User): Promise<UnitUser | null> => {

        const userExists = await findOne(id)

        if (!userExists) {
            return null;
        }

        if (updateValues.password) {
            const salt = await bycrypt.genSalt(10);
            const newPass = await bycrypt.hash(updateValues.password, salt)

            updateValues.password = newPass
        }

        users[id] = {
            ...userExists,
            ...updateValues,
        }

        saveUsers()

        return users[id]
    }

    /**
     * Remove a user by id
     * @param id - The id of the user to be removed
     * @returns Promise that resolves to null if user does not exist, otherwise void
     */
    static remove = async (id: string): Promise<null | void> => {
        // Find the user by id
        const user = await findOne(id);

        // If user does not exist, return null
        if (!user) {
            return null;
        }

        // Remove the user from the users object
        delete users[id];

        // Save the updated users object
        await saveUsers();
    }
}

export default UserRepository;
