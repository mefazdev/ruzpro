import dbConnect from "../../../utils/dbConnect";
import Users from '../../../models/User'
 

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;


switch (method) {
    case 'GET':  
        
    try {
        const user = await Users.find({"uid":id});
 

        if(!user ){
            return res.status(400).json({success:false})
        }

        res.status(200).json({success:true, data:user})
    } catch (error) {
        res.status(400).json({success:false})
        console.log("error...".error.message)
    }
        break;

        default :
        res.status(200).json({status:false})

        break;
}

}