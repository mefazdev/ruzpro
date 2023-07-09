import React from "react";
import AccountSidebar from "../../../components/AccountSidebar";
import Navbar from "../../../components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Myprop from "../../../components/Myprop";
import Link from "next/link";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Modal from "@mui/material/Modal";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Button, Drawer, TextField } from "@mui/material";

import { useEffect } from "react";
import { auth, storage } from "../../../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import WidgetsIcon from "@mui/icons-material/Widgets";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openLogin } from "../../../redux/loginSlice";
import BoxPlaceHolder from "../../../components/BoxPlaceHolder";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [photoModal, setPhotoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profPic, setProfPic] = useState("");
  const [userData, setUserData] = useState({});
  const [sbar, setSbar] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const userId = router.query.slug;

  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/myproperty/${userId}`,
      {}
    );
    const { data } = await res.json();
    setData(data);
  };

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        dispatch(openLogin());
      }
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getData();
    getUserData();
  }, [user]);

  const getUserData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/user/${userId}`,
        {}
      );
      const { data } = await res.json();
      setUserData(data[0]);

      setName(data[0]?.name);
      setPhone(data[0]?.phone);
      setEmail(data[0]?.email);
      setProfPic(data[0]?.profPic);
    } catch (error) {
      console.log(error);
    }
  };

  const editUserDetails = async () => {
    setSaving(true);
    console.log(userData?._id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/users/${userData?._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
          }),
        }
      );
      // console.log(res);

      setSaving(false);
      setEditModal(false);
      getUserData();
      // updateUserData()
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfPic = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setProfPic(readerEvent.target.result);
    };
  };

  const uploadProfPic = async (e) => {
    setUploading(true);

    const photoRef = ref(storage, `upload/profPic/${user?.uid}`);
    await uploadString(photoRef, profPic, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(photoRef);
      editProfPic(downloadURL);
    });
  };

  const editProfPic = async (downloadURL) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/users/${userData?._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profPic: downloadURL,
          }),
        }
      );
      setProfPic(downloadURL);
      console.log("Data-url ", downloadURL);
      // getUserData();
      setUploading(false);
      setPhotoModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="pb-10">
      <Navbar />
      <div className="ac grid lg:grid-cols-5 lg:gap-10 pl-3 pr-3 lg:pl-0 lg:pr-0">
        <div className="ac__left hidden lg:grid">
          <AccountSidebar />
        </div>
        {/* <button onClick={getUserData}>hellooo</button> */}
        <div className="ac__right lg:col-span-4 ">
          <div className="ac__right__head flex justify-between">
            <div className="ac__right__head__left">
              <WidgetsIcon
                className="lg:hidden text-gray-500 text-3xl"
                onClick={() => setSbar(true)}
              />
            </div>
            <Link href="/upload/BasicInfo">
              <button className="">Add Property</button>
            </Link>
          </div>

          <div className="ac__content mt-5 ">
            <div className="ac__frow  ">
              <div className="ac__frow__left">
                <div
                  className="edit__div cursor-pointer"
                  onClick={() => setEditModal(true)}
                >
                  <EditIcon id="ac__edit__icon" />
                </div>

                <div className="ac__frow__left__row">
                  <div className="ac__avatar__div">
                    <div style={{ width: "fit-content", margin: "auto" }}>
                      <Avatar
                        className="cursor-pointer"
                        onClick={() => setPhotoModal(true)}
                        id="ac__avatar"
                        alt="Travis Howard"
                        src={profPic}
                      />
                      <h6
                        className="text-gray-600 "
                        style={{ textAlign: "center" }}
                        onClick={getUserData}
                      >
                        {userData?.name}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="ac__frow__footer   grid grid-cols-2 gap-10 bg-gray-100">
                  <div
                    className="flex"
                    style={{ alignItems: "center", margin: "auto" }}
                  >
                    <EmailOutlinedIcon id="ac__frow__footer__icon" />
                    <p className="ml-2">{userData?.email}</p>
                  </div>
                  <div
                    className="flex"
                    style={{ alignItems: "center", margin: "auto" }}
                  >
                    <p className="ml-2">{data?.length} Properties</p>
                  </div>
                </div>
              </div>
              {/* <div className='ac__frow__right grid gap-10 grid-cols-2'>
                  <div className='ac__frow__right__box bg-gray-100'>
                         <p>{data.length}</p>
                         <h6>Properties</h6>
                  </div>
                  <div className='ac__frow__right__box bg-gray-100'>
                  <p>0</p>
                         <h6>Contact Views</h6>
                    </div>
                    <div className='ac__frow__right__box bg-gray-100'>
                    <p>2</p>
                         <h6>Saved Searches</h6>
                    </div>
                    <div className='ac__frow__right__box bg-gray-100'>
                    <p>16</p>
                         <h6>Responses</h6>
                    </div>  
                  </div> */}
            </div>

            <div className="ac__props">
              <div className="ac__props__head flex justify-between">
                <h6>My Properties</h6>
                <Link href={`/account/myProps/${userId}`}>
                  <button style={{ backgroundColor: "rgb(7, 164, 77)" }}>
                    View More
                  </button>
                </Link>
              </div>
              {data.length ? (
                <div className="grid lg:grid-cols-2 gap-5 mt-5">
                  {data?.map((d, i) => {
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
                        active={d.active}
                        status={d.status}
                        refresh={getData}
                      />
                    );
                  })}
                </div>
              ) : (
                <BoxPlaceHolder />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="login__modal"
        open={photoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="outline-none bg-slate-100 w-full edit__account">
          <Avatar
            id="ac__avatar"
            alt="Travis Howard"
            src={profPic}
            style={{ width: "70px", height: "70px" }}
          />

          <TextField
            className="mt-4"
            id="outlined-basic"
            variant="outlined"
            required
            style={{ width: "100%" }}
            type="file"
            onChange={handleProfPic}
          />

          <div className="flex float-right">
            <Button
              onClick={() => setPhotoModal(false)}
              className="mt-2"
              style={{ border: "1px solid red", maxHeight: "32px" }}
            >
              CLOSE
            </Button>
            <Button
              className="mt-2 ml-2"
              style={{ border: "1px solid blue", maxHeight: "32px" }}
              onClick={uploadProfPic}
              // onClick={()=>console.log(userData)}
            >
              {uploading ? "UPLOADING..." : "UPLOAD"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        id="login__modal"
        open={editModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="outline-none bg-slate-100 w-full edit__account">
          <TextField
            className="mt-4"
            id="outlined-basic"
            variant="outlined"
            required
            value={name}
            style={{ width: "100%" }}
            label="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            className="mt-4"
            id="outlined-basic"
            variant="outlined"
            value={email}
            required
            style={{ width: "100%" }}
            label="Email"
            type="gmail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex float-right mt-3">
            <Button
              onClick={() => setEditModal(false)}
              className="mt-2"
              style={{ border: "1px solid red", maxHeight: "32px" }}
            >
              CLOS
            </Button>
            <Button
              onClick={editUserDetails}
              className="mt-2 ml-2"
              style={{ border: "1px solid blue", maxHeight: "32px" }}
            >
              {saving ? "SAVING..." : "SAVE"}
            </Button>
          </div>
        </div>
      </Modal>

      <React.Fragment>
        <Drawer open={sbar}>
          <div className="p-3">
            <AccountSidebar />
            <button
              className="bg-red-500 text-white w-full mt-2 p-2"
              onClick={() => setSbar(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
