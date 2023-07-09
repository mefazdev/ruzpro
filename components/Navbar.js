import React from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";
import { useSelector, useDispatch } from "react-redux";
import { openLogin } from "../redux/loginSlice";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import profPlaceHolder from "../assets/images/img-place.jpeg";
import { openSignup } from "../redux/signupSlice";
import { useRouter } from "next/router";
import { Box, LinearProgress, Slide } from "@mui/material";
import ResiSearch from "./Search/MinSearch";
import { closeSearchrow, openSearchrow } from "../redux/searchrowSlice";
import AdvSearch from "./Search/AdvSearch";
import logo from "../assets/images/logo.png";
import { getAuth, signOut } from "firebase/auth";
import BottomNav from "./BottomNav";
export default function Navbar() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUid(currentUser?.uid);
    });
  }, []);

  const [uid, setUid] = useState("");

  const login = useSelector((state) => state.login.value);
  const signup = useSelector((state) => state.signup.value);
  const router = useRouter();
  const dispatch = useDispatch();
  const viewSearch = useSelector((state) => state.searchRow.value);
  const advSearch = useSelector((state) => state.advSearch.value);
  const search = useSelector((state) => state.search.value);
  const [data, setData] = useState({});
  const auth = getAuth();

  const getUserData = async () => {
    if (uid) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/user/${uid}`,
          {}
        );
        const { data } = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [uid]);

  const goToDash = () => {
    if (uid) {
      router.push(`/account/dashboard/${uid}`);
    } else {
      dispatch(openLogin());
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        getUserData();
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <div className="navbar pt-4 pb-4">
      <div className="nav__content grid grid-cols-5 lg:grid-cols-3  ">
        <Link href={"/"}>
          <div className="logo cursor-pointer w-fit">
            <Image src={logo} />
          </div>
        </Link>

        <div
          className="nav__search hidden  lg:flex justify-between pl-4 pr-2 cursor-pointer"
          onClick={
            !viewSearch
              ? () => dispatch(openSearchrow())
              : () => dispatch(closeSearchrow())
          }
        >
          <Box sx={{ width: "80%" }}>
            {search ? <LinearProgress color="inherit" /> : <p>Search</p>}
          </Box>
          <div className="nav__search__icon rounded-full">
            <BiSearch />
          </div>
        </div>
        <div
          className="nav__search__mob col-span-3 lg:hidden flex justify-between pl-4 pr-1 cursor-pointer"
          onClick={
            !viewSearch
              ? () => dispatch(openSearchrow())
              : () => dispatch(closeSearchrow())
          }
        >
          <Box sx={{ width: "50%" }}>
            {search ? <LinearProgress color="inherit" /> : <p>Search</p>}
          </Box>
          <div className="nav__search__mob__icon rounded-full">
            <BiSearch />
          </div>
        </div>

        <div className="flex justify-between   ">
          <div className=""></div>
          <div className="flex">
            <div className="hidden md:grid">
              <Link href={"/upload/BasicInfo"}>
                <button
                  className="up__button"
                  style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                >
                  Add
                </button>
              </Link>
            </div>

            <div className="nav_right  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-200">
                    <span className="sr-only">Open user menu</span>
                    {data[0]?.profPic ? (
                      <img
                        className="h-9 w-9 rounded-full"
                        src={data[0]?.profPic}
                        alt=""
                      />
                    ) : data[0]?.email ? (
                      <div
                        className="h-9 w-9 bg-amber-600 rounded-full flex justify-center"
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{ fontSize: "18px" }}
                          className="text-white  uppercase"
                        >
                          {data[0]?.email.slice(0, 1)}
                        </p>
                      </div>
                    ) : (
                      <div className="h-9 w-9">
                        {" "}
                        <Image
                          className=" rounded-full"
                          src={profPlaceHolder}
                        />
                      </div>
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          style={{ width: "100%", textAlign: "left" }}
                          onClick={goToDash}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => dispatch(openLogin())}
                          style={{ width: "100%", textAlign: "left" }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Login
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => dispatch(openSignup())}
                          style={{ width: "100%", textAlign: "left" }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Register
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            color: "red",
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <Slide direction="up" in={login} mountOnEnter unmountOnExit>
        <div
          className="flex relative"
          style={{
            justifyContent: "center",
            minWidth: "100%",
            alignItems: "center",
          }}
        >
          <div
            className="absolute top-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "10px",
            }}
          >
            <Login />
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={signup} mountOnEnter unmountOnExit>
        <div
          className="flex relative"
          style={{
            justifyContent: "center",
            minWidth: "100%",
            alignItems: "center",
          }}
        >
          <div
            className="absolute top-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "10px",
            }}
          >
            {" "}
            <Register />
          </div>
        </div>
      </Slide>

      <Slide direction="down" in={viewSearch} mountOnEnter unmountOnExit>
        <div
          className="flex relative"
          style={{
            justifyContent: "center",

            alignItems: "center",
            minWidth: "100%",
            alignItems: "center",
          }}
        >
          <div
            className="absolute top-5 w-full lg:w-fit"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "10px",
              // width:'100%'
            }}
          >
            <div className="bg-white   lg:p-10">
              <ResiSearch />
            </div>
          </div>
        </div>
      </Slide>
      <Slide direction="up" in={advSearch} mountOnEnter unmountOnExit>
        <div
          className="flex relative"
          style={{
            justifyContent: "center",
            minWidth: "100%",
            alignItems: "center",
          }}
        >
          <div
            className="absolute top-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <div className="bg-white p-2  lg:p-10">
              <AdvSearch />
            </div>
          </div>
        </div>
      </Slide>

      <div></div>
      <BottomNav />
    </div>
  );
}
