
const apiKey: any = process.env?.KITE_API_KEY
const secretKey: any = process.env?.KITE_API_SECRET
const requestToken: any = process.env?.KITE_REQUEST_TOKEN

import KiteSession from '../Models/kiteSessionModel'
import kiteConnect from '../utils/kite'
const generateSession = async(req: any, res: any, next: any)=> {
    try{
  const request_token = req.query.request_token
  const response = await kiteConnect.generateSession(request_token, secretKey)
    kiteConnect.setAccessToken(response.access_token)
    await KiteSession.create({
  accessToken: response.access_token,
});
    res.status(200).json({
        status: 'Ok',
        message: 'Success',
        result: {
          accessToken: response.access_token
        }

    })
    } catch (err: any){
        console.log(err)
         res.status(200).json({
        status: err.message
    })
    }
  
}
const  getProfile = async(req: any, res: any, next: any)=> {
  try {
    console.log('1')
    const profile = await kiteConnect.getProfile();
    console.log(profile, 'profile is')
   if(profile ) {
    res.status(200).json({
        result: [profile]
    })
   } else {
    res.status(200).json({
        result: [],
        status: 'Not_Ok',
        message: 'Invalid Session'
    })
   }
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
const  getHoldings = async(req: any, res: any, next: any)=>{
  try {
    const profile = await kiteConnect.getHoldings();
   if(profile?.length > 0) {
    res.status(200).json({
        result: profile
    })
   }
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
const kiteController = {
    generateSession,
    getProfile,
    getHoldings
}
export default kiteController