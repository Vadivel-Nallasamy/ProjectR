import ResearchCall from "../Models/researchModel"

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

const searchScrip = (req: any,res: any,next: any)=> {

}
const researchController = {
    createCall, searchScrip
}
export default researchController