import dbConnect from "../../../utils/dbConnect";
import Wishlist from "../../../models/Wishlist";
 
dbConnect();
 
export default async (req,res)=>{
    // dbConnect();      
    const {method} = req;
    switch (method) {
        case 'GET':
            try {
                const properties = await Wishlist.find({});

                
                res.status(200).json({sucess:true,data:properties});
            } catch (error) {
                res.status(400).json({sucess:false,error:error.message})
            }
            break;
    
            case 'POST':
                try {
                  
                    const property = await Wishlist.create(req.body)
                    res.status(201).json({success:true,data:property});

                } catch (error) {
                    res.status(400).json({success:false,error:error.message})
       
                }
                break;
                // case 'DELETE':
                //     try {
                //         const deleteProp = await FavProps.deleteOne({_id:id})
    
                //         if(!deleteProp){
                //             res.status(400).json({staus:false})
                //         }
    
                //         res.status(200).json({status:true,data:{}})
                //     } catch (error) {
                //         res.status(400).json({status:false})
                //     }
                //     break;
    
     
          
       
       default :
       res.status(200).json({status:false})
    }
}