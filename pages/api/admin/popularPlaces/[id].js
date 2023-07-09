import dbConnect from "../../../../utils/dbConnect";
import PopularPlaces from "../../../../models/PopularPlaces";

dbConnect();

 
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;


switch (method) {
    case 'GET':  
        
    try {
        const data = await PopularPlaces.find({"propId":id});
 

        if(!data){
            return res.status(400).json({success:false})
        }

        res.status(200).json({success:true, data:property})
    } catch (error) {
        res.status(400).json({success:false})
        console.log("error...".error.message)
    }
        break;

        default :
        res.status(200).json({status:false})

        break;
        case 'DELETE':
            try {
                const deleteProp = await PopularPlaces.deleteOne({_id:id})

                if(!deleteProp){
                    res.status(400).json({staus:false})
                }

                res.status(200).json({status:true,data:{}})
            } catch (error) {
                res.status(400).json({status:false})
            }
            break;
}

}