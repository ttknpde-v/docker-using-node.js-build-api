import mysql from 'mysql2/promise'
import dotenv from "dotenv"
import path from 'path'
import MyLogging from "../log/my.logging.js"
const log = new MyLogging().log
/* 
    you don't forget 
    you set WORKDIR /usr/src/app
    means any file that you add to container
    they're on it !!
    So .env you should access to /usr/src/app/.env Right ?
    it is not run on your current path pc
    log.info(path.resolve('../app/.env'))
*/
dotenv.config({ path: path.resolve('../app/.env') })


class ConnectDatabase {
    myConnect = null
    #initConnectMySQL = async () => {
        this.myConnect = await mysql.createConnection({
            host: process.env.PMA_HOST_DATABASE,
            user: process.env.SQLD_USERNAME,
            password: process.env.SQLD_PASSWORD,
            database: process.env.SQLD_DATABASE,
            port: process.env.PMA_PORT_DATABASE
        })
    }
    // method for using await to make sure that myConnect it is initail 
    get initConnectMySQL() {
        return this.#initConnectMySQL()
    }
}


/* let cndb = new ConnectDatabase()
await cndb.initConnectMySQL
let result = await cndb.myConnect.query('select * from books')
console.log(result); */

export default ConnectDatabase
