import dbConnect from "../../../utils/dbConnect";
// import Property from '../../../models/Property'
import User from "../../../models/User";
import Property from "../../../models/Property";
 
dbConnect();
 
export default async (req,res)=>{
    // dbConnect();      
    const {method} = req;
    switch (method) {
        case 'GET':
            try {
                const properties = await Property.find({status:'active'});

                
                res.status(200).json({sucess:true,data:properties});
            } catch (error) {
                res.status(400).json({sucess:false,error:error.message})
            }
            break;
    
            case 'POST':
                try {
                  
                    const property = await Property.create(req.body)
                    res.status(201).json({success:true,data:property});

                } catch (error) {
                    res.status(400).json({success:false,error:error.message})
       
                }
                break;

         case 'PUT' : 
          try {
            const property = await Property.findByIdAndUpdate(id,req.body,{
                new:true,
                runValidators:true,
            });

            if(!property){
                return res.status(400).json({success :false})
            }
            res.status(200).json({success:true,data:property})
          } catch (error) {
            console.log(error.message)
            res.status(400).json({status:false,})
          }
       break;

       
       default :
       res.status(200).json({status:false})
    }
}