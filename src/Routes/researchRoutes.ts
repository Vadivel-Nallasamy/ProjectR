

import express from 'express'
import researchController from '../Controllers/researchController'
const researchRouter = express.Router()

researchRouter.route('/create').post(researchController.createCall)
export default researchRouter