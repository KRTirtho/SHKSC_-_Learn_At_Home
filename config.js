import {config} from "dotenv"

config();

export default  {
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}