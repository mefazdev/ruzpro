// export default function handler(req, res) {
//     if (req.method === "POST") {
//     //   const { name, age, email } = JSON.parse(req.body);
// //    let n = req.name
//       // Use the data as needed
//       // ...
//     console.log(req.body.name)
//     //   res.status(200).send("Data received");
//     } else {
//       res.status(405).send("Method Not Allowed");
//     }
//   }

import dbConnect from "../../../utils/dbConnect";
import Property from "../../../models/Property";

dbConnect();

export default async (req,res) =>{
    // const {
    //     query: {id},
    //     method,
    // } = req
    const {method} = req;
    const tags = req.body
        if (req.method === "POST") {
            console.log(tags)
            switch (method) {
                case 'POST':
        
                 try {
                    const properties = await Property.aggregate([
                        {$match: {
                            transType:tags.transType,
                            propType:tags.propType,
                            district:tags.district,
                            town:tags.town,
                            price:tags.price
                        }},
                        
                    ])
                
                    if(!properties){
                        return res.status(400).json({success:false})
        
                    }
        
                    res.status(200).json({success:true ,data:properties})
                // console.log(properties)
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
   
}