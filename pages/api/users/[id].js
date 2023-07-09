import dbConnect from "../../../utils/dbConnect";
 
import Users from '../../../models/User'
// import property from "";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch(method){
    case 'GET':
        try {
            // const property = await Property.find({"propType":id});
            const user = await Users.findById(id);

            if(!user){
                return res.status(400).json({success:false})
            }

            res.status(200).json({success:true, data:user})
        } catch (error) {
            res.status(400).json({success:false,error})
            console.log(error.message)
        }
        break;

        
        case 'PUT':
            try {
                const user  = await Users.findByIdAndUpdate(id, {$set:req.body},
                    
                    {
                    new:true,
                    runValidators:true
                }
                );
                if(!user){
                    res.status(400).json({status:false,error:error})
                }

            res.status(200).json({status:true,data:user})

            } catch (error) {
                res.status(400).json({status:false})
                console.log(error)
            }
            break

            

                default :
                res.status(200).json({status:false})
  }
};
