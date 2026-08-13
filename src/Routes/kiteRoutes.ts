import express from 'express'
import kiteController from '../Controllers/kiteController'
const kiteRoutes = express.Router()
kiteRoutes.route('/generateSession').get(kiteController.generateSession)
kiteRoutes.route('/getProfile').get(kiteController.getProfile)
kiteRoutes.route('/getHoldings').get(kiteController.getHoldings)
kiteRoutes.route('/testRoute').get((_req: any, res: any, next: any)=> {
res.status(200).json({
    status: 'JHola'
})
})
export default kiteRoutes