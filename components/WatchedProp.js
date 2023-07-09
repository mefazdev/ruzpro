import React from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
 import moment from 'moment/moment';
 import { useRouter } from 'next/router';
export default function WathcedProp({propType,town,district,id,date}) {
  
  const router = useRouter()
  const navigate = () => {
    if (
      propType === "residential apartments" ||
      propType == "residential other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial shop" ||
      propType === "commercial office" ||
      propType === "commercial building" ||
      propType === "commercial other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial land" ||
      propType === "residential land" ||
      propType === "industrial land" ||
      propType === "agricultural land"
    ) {
      router.push(`/view/land/${id}`);
    }
    if (propType === "industrial building") {
      router.push(`/view/industrialBuilding/${id}`);
    }
  };


  const removeFromViewed = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/viewed/${id}`,
        {
          method: "DELETE",
        }
      );
 
     
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };
  return (
    <div className="wtd pt-3 "

 style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}

    >
           
            <div type='button'
            className="ftd__right__head   cursor-pointer">
              <p className='text-right text-gray-500 mr-2'>
                
                {moment(date).format("MMM/DD/YYYY")}</p>
                <div  type="button"
            onClick={navigate}>
                <h4 className="font-bold capitalize text-center mt-1">{propType}</h4>
            <div className="flex justify-center">
              <LocationOnIcon id="ftd__loc__icon" />
              <h5 className='text-center'>
                {town}, {district}
              </h5>
            </div>
                </div> 
                
          
            <button
            onClick={removeFromViewed}
            className='mt-4 bg-red-100  '
            style={{fontSize:'13px',padding:'2px',width:'100%'}}
            ><h5>Remove</h5></button>
          </div> 
       
 
          

          
      
          
         
        </div>
  )
}
