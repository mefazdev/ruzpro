import dbConnect from "../../../../utils/dbConnect";
import PopPlaces from "../../../../models/PopularPlaces";

dbConnect()


export default async (req,res)=>{
    // dbConnect();      
    const {method} = req;
    switch (method) {
        case 'GET':
            try {
                const data = await PopPlaces.find({});

                
                res.status(200).json({sucess:true,data:data});
            } catch (error) {
                res.status(400).json({sucess:false,error:error.message})
            }
            break;
    
            case 'POST':
                try {
                  
                    const data = await PopPlaces.create(req.body)
                    res.status(201).json({success:true,data:data});

                } catch (error) {
                    res.status(400).json({success:false,error:error.message})
       
                }
                break;
                 
    
     
          
       
       default :
       res.status(200).json({status:false})
    }
}