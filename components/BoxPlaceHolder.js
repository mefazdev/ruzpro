import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import notImage from "../assets/images/not.jpg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { offSearch } from "../redux/searchSlice";
export default function BoxPlaceHolder() {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      dispatch(offSearch());
    }, 10000);
  }, []);
  return (
    <>
      {show ? (
        <div className=" grid lg:grid-cols-4 lg:gap-6 mt-5">
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />

            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
          <div className="mt-2">
            <Skeleton variant="rounded" width={"100%"} height={200} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"60%"} />
            <Skeleton variant="text" width={"80%"} />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ maxWidth: "300px" }}>
            <Image src={notImage} />
          </div>
          <p className="text-center">Not available</p>
        </div>
      )}
    </>
  );
}
