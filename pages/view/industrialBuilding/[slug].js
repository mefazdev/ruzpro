import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Navbar from "../../../components/Navbar";
import DetailTable from "../../../components/DetailTable";
import PropFeatures from "../../../components/PropFeatures";
import Nearby from "../../../components/Nearby";
import ViewContact from "../../../components/ViewContact";
import { useDispatch } from "react-redux";
import { openContact } from "../../../redux/viewContactSlice";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Skeleton, Slide } from "@mui/material";
import Link from "next/link";
import Share from "../../../components/Share";
import AddWishList from "../../../components/AddWishList";
import moment from "moment";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
export default function ViewResidential() {
  const [data, setData] = useState({});
  const [uid, setUid] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [share, setShare] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const router = useRouter();
  const id = router.query.slug;

  const dispatch = useDispatch();

  const images = [
    {
      original: data?.images?.[0],
      thumbnail: data?.images?.[0],
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      original: data?.images?.[1],
      thumbnail: data?.images?.[1],
    },
    {
      original: data?.images?.[2],
      thumbnail: data?.images?.[2],
    },
  ];

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProperty();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      addToViewed();
    }, 10000);
  }, [data]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUid(currentUser?.uid);
    });
  }, []);
  const addToViewed = async () => {
    if (data?._id && uid) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/viewed`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uid,
          propType: data.propType,
          propId: data._id,
          town: data.town,
          district: data.district,
          date: new Date(),
        }),
      });
    } else {
    }
  };

  return (
    <div className="relative">
      <Head>
        {data?.propType && data?.town ? (
          <title>
            {data?.propType?.toUpperCase()} IN {data?.town},KERALA
          </title>
        ) : (
          ""
        )}

        <meta name="description" content={data?.description} />
      </Head>
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <div
          className="p-5"
          style={{
            minHeight: "100vh",
            width: "100%",
            margin: "atuo",
            background: "#fff",
            position: "absolute",
            zIndex: "100",
          }}
        >
          <div
            className="w-5 h-5   rounded-full flex
          items-center justify-center
         "
            style={{ border: "1px solid gray" }}
            onClick={handleChange}
          >
            <MdOutlineArrowBackIos className="h-3 w-3" />
          </div>

          {data?.images?.map((src, d) => {
            return <img src={src} key={d} className="mt-2" />;
          })}
        </div>
      </Slide>
      <div className="hidden lg:grid">
        <Navbar />
      </div>

      <div className="view pt-5  pb-96">
        <div className="lg:hidden">
          {data?.images ? (
            <div
              className="view__img__div p-3 relative"
              style={{
                backgroundImage: `url(${data?.images?.[0]})`,
              }}
            >
              <div className="flex justify-between w-full relative">
                <Link href="/">
                  <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
                    <AiOutlineHome className="mr-1" />
                  </div>
                </Link>
                <div className="flex">
                  <div className="bg-white cursor-pointer rounded-full mr-2 w-7 h-7 flex items-center justify-center">
                    <IoShareOutline onClick={() => setShare(!share)} />
                  </div>
                  <div className="bg-white cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
                    <AddWishList
                      propType={data?.propType}
                      town={data?.town}
                      district={data?.district}
                      locality={data?.locality}
                      id={id}
                      viewPage={true}
                    />
                  </div>
                </div>
                <Slide direction="up" in={share} mountOnEnter unmountOnExit>
                  <div className="absolute  top-8 right-0  h-fit   ">
                    <Share id={id} page="land" />
                  </div>
                </Slide>
              </div>
              <div
                className="img__count absolute bottom-0 right-0
            "
                onClick={handleChange}
              >
                <p>1 / {data?.images?.length}</p>
              </div>
            </div>
          ) : (
            <Skeleton variant="rounded" width={"100%"} height={200} />
          )}

          <div className="view__bottom">
            <h1 className="capitalize" style={{ textTransform: "capitalize" }}>
              {data?.propType} for {data?.transType}
            </h1>

            <div className="flex mt-1 ">
              <h2>
                {data?.town}, {data?.district}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="view__bottom__boxes">
                <p>{moment(data?.date).format("MMM DD - YYYY")}</p>
              </div>
              <div className="view__bottom__boxes">
                <p>Id: R{data?._id?.slice(0, 5)}</p>
              </div>

              <div className="view__bottom__boxes flex">
                <p>Total floors: {data?.totalFloors} </p>
              </div>
              <div className="view__bottom__boxes flex">
                <p>Usage status: {data?.usageStatus} </p>
              </div>
              <div className="view__bottom__boxes">
                <p>
                  {data?.builtArea} {data?.builtUnit}
                </p>
              </div>
              <div className="view__bottom__boxes">
                <p className="font-bold">
                  ₹ {data?.displayPrice ? data?.price?.disRate : ""}
                </p>
              </div>
            </div>
            <button
              className="mt-4 w-full text-white p-2"
              onClick={() => dispatch(openContact())}
            >
              View Contact
            </button>
          </div>
        </div>

        <div className="view__main mt-5 hidden lg:grid">
          <h1 style={{ textTransform: "capitalize" }}>
            {data?.propType} for {data?.transType}
          </h1>

          <div className="flex justify-between mt-1 ">
            <div className="flex underline">
              <h2>
                {data?.town}, {data?.district}
              </h2>
            </div>
            <div className="flex view__main__right">
              <div
                className="flex cursor-pointer "
                onClick={() => setShare(!share)}
              >
                <IoShareOutline className="h-5 w-5" />
              </div>
              <div className="  ml-3">
                <AddWishList
                  propType={data?.propType}
                  town={data?.town}
                  district={data?.district}
                  locality={data?.locality}
                  id={id}
                  viewPage={true}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-6">
            <ImageGallery
              className="image-gallery"
              items={images}
              showNav={false}
              thumbnailPosition="right"
              disableThumbnailScroll={true}
              slideDuration={50}
              thumbnailWidt={400}
              thumbnailHeight={200}
            />

            <div className="relative">
              <div className="view__main__row flex justify-between">
                <p className="text-gray-600">
                  Posted on {moment(data?.date).format("MMM DD - YYYY")}
                </p>
                <p className="text-gray-600">ID: R{data?._id?.slice(0, 5)}</p>
              </div>
              <div className="view__main__row mt-3">
                <div className="flex">
                  <p className="text-gray-600">For {data?.transType}</p>
                </div>
              </div>
              <div className="view__main__row mt-3">
                <div className="flex">
                  <p className="text-gray-600">
                    {data?.builtArea} {data?.builtUnit}
                  </p>
                </div>
              </div>
              <div className="view__main__row relative mt-3">
                <div className="flex">
                  <p
                    className="text-gray-600"
                    style={{ textTransform: "capitalize" }}
                  >
                    {data?.ownership} {data?.ownership ? "Owner" : ""}
                  </p>
                </div>
              </div>

              <div className="view__main__row mt-3 ">
                <p className="text-gray-600">
                  Total Floors: {data?.totalFloors}
                </p>
              </div>
              <div className="view__main__row mt-3 ">
                <p className="text-gray-600">
                  Usage status: {data?.usageStatus}
                </p>
              </div>
              <div className="view__main__row mt-3 mb-14">
                <h5 className="text-gray-600">₹ {data?.price?.disRate}</h5>
              </div>

              <div className="view__btn">
                <button onClick={() => dispatch(openContact())}>
                  View Contanct Details
                </button>
              </div>

              <Slide direction="up" in={share} mountOnEnter unmountOnExit>
                <div className="absolute  top-0 right-0  h-fit   ">
                  <Share id={id} page="industrialBuilding" />
                </div>
              </Slide>
            </div>
          </div>
        </div>
        <div className="view__under">
          {" "}
          <div className=" lg:mt-10  grid lg:grid-cols-4 lg:gap-7">
            <div className="lg:col-span-3">
              <h4 className="text-xl text-gray-800">Description</h4>
              <p className="mt-1" style={{ whiteSpace: "pre-line" }}>
                {!readMore
                  ? data?.description?.replace(/breakLine/g, "\n").slice(0, 100)
                  : data?.description?.replace(/breakLine/g, "\n")}
              </p>
              {!readMore ? (
                data?.description?.length > 100 ? (
                  <p
                    className="underline cursor-pointer text-gray-600 text-sm mt-2"
                    onClick={() => setReadMore(true)}
                  >
                    Read more
                  </p>
                ) : (
                  ""
                )
              ) : (
                <p
                  className="underline text-gray-600 text-sm mt-2 cursor-pointer"
                  onClick={() => setReadMore(false)}
                >
                  Read less
                </p>
              )}

              <DetailTable data={data} />

              {data?.amenities ? <PropFeatures data={data} /> : ""}

              {data?.locationType != null ? (
                <div className="mt-10 ">
                  <h5 className="text-xl text-gray-800">Location type</h5>

                  <div
                    className="mt-2 bg-gray-50 border p-2   text-gray-900 "
                    style={{ fontFamily: "sans-serif ", fontSize: "15px" }}
                  >
                    {data?.locationType?.withinIndiLocation ? (
                      <p>
                        Within indipendent location :{" "}
                        <span className="font-bold">Yes</span>
                      </p>
                    ) : (
                      ""
                    )}

                    {data?.locationType?.withinOfficeComplex ? (
                      <p>
                        Within office complex :{" "}
                        <span className="font-bold">Yes</span>{" "}
                      </p>
                    ) : (
                      ""
                    )}
                    {data?.locationType?.withinShoppingMall ? (
                      <p>
                        Within shopping mall :{" "}
                        <span className="font-bold">Yes</span>{" "}
                      </p>
                    ) : (
                      ""
                    )}
                    {data?.locationType?.withinIndBelt ? (
                      <p>
                        Within industrial belt :{" "}
                        <span className="font-bold">Yes</span>{" "}
                      </p>
                    ) : (
                      ""
                    )}

                    <p>{data?.locationType?.otherLocationType}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {data?.distance ? <Nearby essential={data?.distance} /> : ""}
          </div>
        </div>
      </div>
      <ViewContact
        email={data?.email}
        phone={data?.phone}
        whatsappNo={data?.whatsappNo}
        address={data?.address}
      />
    </div>
  );
}
