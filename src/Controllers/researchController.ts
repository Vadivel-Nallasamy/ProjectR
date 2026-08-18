import ResearchCall from "../Models/researchModel"
import {searchInstruments} from '../services/instrument.service'
 const createCall = async (req: any, res: any, next: any)=> {
    console.log(req.body)
    const result = await ResearchCall.create(
        req.body
    )
    console.log(result)
    res.status(200).json(result)
}
const getCalls = (req: any,res: any,next: any)=> {

}

const searchScrip = async(req: any,res: any,next: any)=> {
const query = String(req.query.q || "").trim();

    if (!query) {
      return res.json([]);
    }

    const instruments = await searchInstruments(query);

    return res.json(instruments);
}
const researchController = {
    createCall, searchScrip
}
export default researchController