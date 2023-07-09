import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Link from "next/link";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
export default function AccountSidebar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <div className="ac__sbar  bg-gray-100 ">
      <div className="ac__sbar__content">
        {" "}
        <div className="ac__sbar__head bg-gray-200">
          <p>Overview</p>
        </div>
        <Link href="/">
          <div className="ac__sbar__row flex ">
            <HomeIcon id="ac__side__icons" />
            <p className="ml-3">Home</p>
          </div>
        </Link>
        <Link href={`/account/dashboard/${user?.uid}`}>
          <div className="ac__sbar__row flex ">
            <DashboardIcon id="ac__side__icons" />
            <p className="ml-3">Dashboard</p>
          </div>
        </Link>
        <Link href={`/account/myProps/${user?.uid}`}>
          <div className="ac__sbar__row flex ">
            <MapsHomeWorkIcon id="ac__side__icons" />
            <p className="ml-3">My Properties</p>
          </div>
        </Link>
        {/* <div className='ac__sbar__row flex '>
        <NoteAltIcon  id='ac__side__icons'/>
         <p className='ml-3'>My Requirements</p>
         </div> */}
        {/* <div className='ac__sbar__row flex '>
        <PermMediaIcon id='ac__side__icons'/>
         <p className='ml-3'>Manage Media</p>
         </div> */}
        {/* <div className='ac__sbar__row flex '>
        <ForumIcon id='ac__side__icons'/>
         <p className='ml-3'>My Messaages</p>
         </div> */}
        {/* <div className='ac__sbar__row flex '>
        <PaidIcon id='ac__side__icons'/>
         <p className='ml-3'>Payment History</p>
         </div> */}
        {/* <div className="ac__sbar__row flex ">
          <SearchIcon id="ac__side__icons" />
           <p className="ml-3">Saved Search</p>
          
        </div> */}
        <Link href={`/account/contacts/${user?.uid}`}>
          <div className="ac__sbar__row flex ">
            <ContactPhoneIcon id="ac__side__icons" />
            <p className="ml-3">Viewed contacts</p>
          </div>
        </Link>
        <Link href={`/account/watchList/${user?.uid}`}>
          <div className="ac__sbar__row flex ">
            <VisibilityOutlinedIcon id="ac__side__icons" />
            <p className="ml-3">Watch List</p>
          </div>
        </Link>
        <Link href={`/account/wishlist/${user?.uid}`}>
          <div className="ac__sbar__row flex ">
            <FavoriteBorderIcon id="ac__side__icons" />
            <p className="ml-3">Wishlist</p>
          </div>
        </Link>
        <Link href="/upload/BasicInfo">
          <div className="ac__sbar__row flex ">
            <PostAddIcon id="ac__side__icons" />
            <p className="ml-3">Post Properties</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
