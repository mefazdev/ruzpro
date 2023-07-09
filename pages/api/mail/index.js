import dbConnect from "../../../utils/dbConnect";
 import Mail from '../../../models/Mails'
 
dbConnect();
 
export default async (req,res)=>{
    // dbConnect();      
    const {method} = req;
    switch (method) {
        case 'GET':
            try {
                const mails = await Mail.find();

                
                res.status(200).json({sucess:true,data:mails});
            } catch (error) {
                res.status(400).json({sucess:false,error:error.message})
            }
            break;
    
            case 'POST':
                try {
                  
                    const mail = await Mail.create(req.body)
                    res.status(201).json({success:true,data:mail});

                } catch (error) {
                    res.status(400).json({success:false,error:error.message})
       
                }
                break;

        
       
       default :
       res.status(200).json({status:false})
    }
}