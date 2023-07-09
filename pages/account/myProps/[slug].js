import React from "react";

import Navbar from "../../../components/Navbar";
import AccountSidebar from "../../../components/AccountSidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Myprop from "../../../components/Myprop";import WidgetsIcon from '@mui/icons-material/Widgets';
import { Drawer } from "@mui/material";
import { BiBox } from "react-icons/bi";
import BoxPlaceHolder from "../../../components/BoxPlaceHolder";

export default function Myprops() {
  const [data, setData] = useState([]);
  const [sbar,setSbar] = useState(false)

  const router = useRouter();
  const uid = router.query.slug;
  const getMyProps = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/myproperty/${uid}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getMyProps();
  }, [uid]);
  return (
    <div className='pb-10'>
      <Navbar />
      <div className="ac grid lg:grid-cols-5 lg:gap-10 p-3 lg:p-0">
      <div className="ac__left hidden lg:grid">
          <AccountSidebar />   
        </div>
        <div className="ac__right col-span-4 gap-5">
         

                  
   <div className='ac__right__head__left pb-3 flex justify-between lg:grid'> 
 
 <h6  className='font-bold'
 
 >My Properties
 </h6>
 <WidgetsIcon className="lg:hidden text-gray-500 text-3xl"

onClick={()=>setSbar(true)}
/>
</div>
{data.length ? <div className="grid lg:grid-cols-2 gap-5 lg:gap-10">
            {data.map((d, i) => {
              return (
                <Myprop
                  key={i}
                  id={d._id}
                  propType={d.propType}
                  transType={d.transType}
                  town={d.town}
                  district={d.district}
                  price={d.price}
                  image={d.images[0]}
                  status={d.status}
                />
              );
            })}
          </div> : <BoxPlaceHolder/>}
          
        </div>
      </div>

      
      <React.Fragment >
           
           <Drawer
             // anchor={anchor}
             open={sbar}
             // onClose={toggleDrawer(anchor, false)}
           >
             
               <div className="p-3">
             
 <AccountSidebar/>
 <button className="bg-red-500 text-white w-full mt-2 p-2"
 onClick={()=>setSbar(false)}
 >Close</button>
 </div>
         
         
           </Drawer>
         </React.Fragment>
    </div>
  );
}
