import dbConnect from "../../../utils/dbConnect";
import Property  from "../../../models/Property";
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
      
            const property = await Property.findById(id);

            if(!property){
                return res.status(400).json({success:false})
            }

            res.status(200).json({success:true, data:property})
        } catch (error) {
            res.status(400).json({success:false,error})
            console.log(error.message)
        }
        break;

        
        case 'PUT':
            try {
                const property  = await Property.findByIdAndUpdate(id, {$set:req.body},
                    
                    {
                    new:true,
                    runValidators:true
                }
                );
                if(!property){
                    res.status(400).json({status:false})
                }

            res.status(200).json({status:true,data:property})

            } catch (error) {
                res.status(400).json({status:false})
            }
            break

            case 'DELETE':
                try {
                    const deleteProp = await Property.deleteOne({_id:id})

                    if(!deleteProp){
                        res.status(400).json({staus:false})
                    }

                    res.status(200).json({status:true,data:{}})
                } catch (error) {
                    res.status(400).json({status:false})
                }
                break;

                case 'GETMYPROPS':
                    try {
                        const myProp = await Property.find({"userId":id})

                        if(!myProp){
                            return res.status(400).json({success:false})
                        }

                        res.status(200).json({success:true, data:myProp})
                    } catch (error) {
                        res.status(400).json({success:false})
                        // console.log("error>>>",error.message)
                    }

                default :
                res.status(200).json({status:false})
  }
};
