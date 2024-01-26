import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./user/users.routes";
import connection from "./db";
dotenv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use('/', userRouter)


const start = async (): Promise<void> => {
    try {
       await connection.sync(); // Synchronizes the database with the defined models
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        });
    } catch (error) {
        console.error(error); // Logs any errors that occur
        process.exit(1); // Exits the process with an error status code
    }
};

void start();

export default app;