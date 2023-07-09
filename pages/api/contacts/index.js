import dbConnect from "../../../utils/dbConnect";
import Contacts from '../../../models/Contacts'
dbConnect();

export default async (req,res)=>{
    const {method} = req;

    switch(method){
        case 'GET':
            try {
                const contacts  = await Contacts.find({});
                res.status(200).json({ success:true, data:contacts})
            }catch (error){
                res.status(400).json({ success: false})
            }
            break;

            case 'POST':
                try {
               
                    const contacts = await Contacts.create(req.body);
                    res.status(201).json({ success:true, data:contacts})
                }catch (error){
                    console.log(error)
                    res.status(400).json({success:false,error:error.message});
                }
                break

                default:
                    res.status(400).json({success:false});
    }
}