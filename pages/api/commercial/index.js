


import dbConnect from "../../../utils/dbConnect";
import Property from "../../../models/Property";

dbConnect();

export default async (req,res) =>{
    // const {
    //     query: {id},
    //     method,
    // } = req
    const {method} = req;

    switch (method) {
        case 'GET':

         try {
          
const properties = await Property.find({'propType': {$in:['commercial shop','commercial office','commercial land','commercial building','commercial other']}})



if(!properties){
                return res.status(400).json({success:false})

            }

            res.status(200).json({success:true ,data:properties})
        
        } catch (error) {
            res.status(400).json({success:false})
            console.log(error.message)
            
         }

         break;

         default :
         res.status(200).json({status:false})

         break;
    }
}         