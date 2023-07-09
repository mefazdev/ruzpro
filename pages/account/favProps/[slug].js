import React from "react";
import AccountSidebar from "../../../components/AccountSidebar";
import Navbar from "../../../components/Navbar";
import { useEffect } from "react";
import { auth } from "../../../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import FavProp from "../../../components/FavProp";
 
export default function Dashboard() {
  const [user, setUser] = useState({});
   const [favData,setFavData] = useState([])

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const getFavProps = async () => {
     
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/favprops/${user?.uid}`,
          {}
        );
        const { data } = await res.json();
 
      fetchFavData(data)
      } catch (error) {
        console.log(error);
      }
  
   
  };
 

  useEffect(() => {
    getFavProps();
  }, [user]);

 const fetchFavData  = async (fdata)=>{
 
    let l = fdata.length
    let i = 0
    let fd=[]
    for(i; l >= i; i++){
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${fdata[i]?.propId}`,
        {}
      );
      const { data } = await res.json();   
           console.log(data)
       
     fd = [...fd,data]
     setFavData(fd)
 
    
  }
    
 }
  return (
    <div className='pb-10'>
      <Navbar />
      <div className="ac grid grid-cols-5 gap-10">
        <div className="ac__left">
          <AccountSidebar />
        </div>
        <div className="ac__right col-span-4 ">
          <div className="ac__content mt-1 ">
            <div className="ac__prop">
              <div className="ac__props__head flex justify-between">
                <h6 onClick={()=>console.log(favData.length)}>Liked Properties</h6>
               </div>

              <div className="grid grid-cols-2 gap-5 mt-4">
                { favData.map((d, i) => {
                  if(d?._id){
                    return (
                      <FavProp
                        key={i}
                        id={d?._id}
                        propType={d?.propType}
                        transType={d?.transType}
                        town={d?.town}
                        district={d?.district}
                        price={d?.price}
                        image={d?.image?.img1}
                      />
                    )
                  }
                 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
