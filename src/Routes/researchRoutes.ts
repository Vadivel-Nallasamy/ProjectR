

import express from 'express'
import researchController from '../Controllers/researchController'
const researchRouter = express.Router()

researchRouter.route('/create').post(researchController.createCall)
researchRouter.route('/search').get(researchController.searchScrip)

export default researchRouter