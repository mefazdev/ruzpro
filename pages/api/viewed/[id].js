import dbConnect from "../../../utils/dbConnect";
import Viewed from "../../../models/Viewed";

dbConnect();

 
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':  
        
    try {
 
        const viewed = await Viewed.find({"userId":id}) 
          if(!viewed){
            return res.status(400).json({success:false})
        }


        res.status(200).json({success:true, data:viewed})
    } catch (error) {
        res.status(400).json({success:false})
        console.log("error...".error.message)
    }
        break;

        case 'DELETE':
          try {
              const deleteProp = await Viewed.deleteOne({_id:id})

              if(!deleteProp){
                  res.status(400).json({staus:false})
              }

              res.status(200).json({status:true,data:{}})
          } catch (error) {
              res.status(400).json({status:false})
          }
          break;

        default :
        res.status(200).json({status:false})

        break;
}

// switch (method) {
    
//         case 'DELETE':
//             try {
//                 const deleteProp = await Viewed.deleteOne({_id:id})

//                 if(!deleteProp){
//                     res.status(400).json({staus:false})
//                 }

//                 res.status(200).json({status:true,data:{}})
//             } catch (error) {
//                 res.status(400).json({status:false})
//             }
//             break;
// }

}