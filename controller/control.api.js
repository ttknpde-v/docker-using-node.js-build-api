import MyLogging from '../log/my.logging.js'; // export default
import ServiceHttp from '../services/service.http.js';
import { plus, devide, multiply, minus } from '../services/service.modules.js'; // export { } 
import ConnectDatabase from '../config/connect.database.js';



class ControlApi {

    #log = null
    #serviceHttp = null
    #cndb = null

    constructor() {
        this.#log = new MyLogging().log
        this.#serviceHttp = new ServiceHttp()
        this.#cndb = new ConnectDatabase()
    }

    display() {

        const application = this.#serviceHttp.application

        application.get('/plus/(:a)/(:b)', (req, res) => {
            /* 
                first before cal should convert string to type number 
            */
            let result = plus(Number(req.params['a']), Number(req.params['b']))
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/divide/(:a)/(:b)', (req, res) => {
            let result = devide(Number(req.params['a']), Number(req.params['b']))
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/multiply/(:a)/(:b)', (req, res) => {
            let result = multiply(Number(req.params['a']), Number(req.params['b']))
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/minus/(:a)/(:b)', (req, res) => {
            let result = minus(Number(req.params['a']), Number(req.params['b']))
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/users', async (req, res) => {
            let [result] = await this.#cndb.myConnect.query('select * from users')
            res.status(200).json(
                { response: result }
            )
        })


        application.get('/user/(:id)', async (req, res) => {
            let id = req.params['id']
            let [result] = await this.#cndb.myConnect.query('select * from users where id = ?', id)
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/user/delete/(:id)', async (req, res) => {
            let id = req.params['id']
            let [result] = await this.#cndb.myConnect.query('delete from users where id = ?', id)
            res.status(200).json(
                { response: result }
            )
        })

        application.get('/user/create/(:fullname)/(:age)', async (req, res) => {
            let fullname = req.params['fullname']
            let age = req.params['age']
            let [result] = await this.#cndb.myConnect.query('insert into users(fullname,age) values (?,?)', [fullname, age])
            res.status(200).json(
                { response: result }
            )
            /* {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 6,
                "info": "",
                "serverStatus": 2,
                "warningStatus": 0,
                "changedRows": 0
            } */
        })

        application.get('/user/update/(:id)/(:fullname)/(:age)', async (req, res) => {
            let id = req.params['id']
            let fullname = req.params['fullname']
            let age = req.params['age']
            let [result] = await this.#cndb.myConnect.query('update users set fullname = ? , age = ? where id = ?', [fullname, age, id])
            res.status(200).json(
                { response: result }
            )
            /* {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 6,
                "info": "",
                "serverStatus": 2,
                "warningStatus": 0,
                "changedRows": 0
            } */
        })

        application.listen(8000, async (err) => {
            await this.#cndb.initConnectMySQL
            // initial database when port it starts
            // meaning #cndb.myConnect it already to use
            if (err) {
                throw err
            }
            this.#log.info('Start server at port 8000')
        })
    }
}


new ControlApi().display()
