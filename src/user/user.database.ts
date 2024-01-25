import { User, UnitUser, Users} from "./user.interface";
import bycrypt from "bcryptjs"
import {v4 as random} from "uuid"
import fs from "fs";

export let users: Users = loadUsers()

/**
 * Reads the content of the "users.json" file and returns the parsed data as Users object.
 *
 * @return {Users} Parsed data from the "users.json" file
 */
function loadUsers() : Users {
    try {
        const data = fs.readFileSync("./users.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error ${error}`);
        return {};
    }
}

/**
 * Saves the users data to a JSON file.
 */
export function saveUsers() {
    try {
        fs.writeFileSync(
            "./users.json", // file path
            JSON.stringify(users), // data to write
            "utf-8" // encoding
        )
        console.log(`User saved successfully`)
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

export const findAll = async (): Promise<UnitUser[]> => Object.values(users);

export const findOne = async (id: string): Promise<UnitUser> => users[id];

export const findByEmail = async (user_email: string): Promise<null | UnitUser> => {

    const allUsers = await findAll();

    const getUser = allUsers.find(result => user_email == result.email);

    if (!getUser){
        return null;
    }

    return getUser;
}

export const comparePassword = async (email: string, supplied_password: string): Promise<null | UnitUser> => {

    const user = await findByEmail(email);

    const decryptPassword = await bycrypt.compare(supplied_password, user!.password);

    if (!decryptPassword) {
        return null;
    }

    return user

}
