import React, { useState } from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DetailsIcon from "@mui/icons-material/Details";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import Link from "next/link";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
 import { useRouter } from "next/router";
import NearMeIcon from '@mui/icons-material/NearMe';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
export default function ComplitionStatus({ id, data }) {
  

  const router = useRouter();
  return (
    <div 
      className='hidden lg:grid'
    >
     
      <div className="cs w-full">
        <div className="p-3">
          <h5 className="pt-1">Complition status</h5>
           
          <div className="cs__noti mt-1">
            <p>Please complete your profile for more response</p>
          </div>
        </div>

        <Link href={`/edit/basicInfo/${id}`}>
          <div
            className={
              router.pathname == `/edit/basicInfo/[slug]`
                ? "ative__side__link justify-between flex p-3"
                : "cs__row  justify-between flex p-3"
            }
          >
            <div className="flex ">
              <ReportGmailerrorredIcon />

              <p className="ml-2">Basic</p>
            </div>
            {data?.propType ? (
              <CheckCircleOutlineIcon id="cs__tick__icon" />
            ) : (
              ""
            )}
          </div>
        </Link>

        <Link href={`/upload/location/${id}`}>
          <div
            className={
              router.pathname == `/upload/location/[slug]`
                ? "ative__side__link justify-between flex p-3"
                : "cs__row  justify-between flex p-3"
            }
          >
            <div className="flex">
              <AddLocationAltIcon />

              <p className="ml-2">Location</p>
            </div>
            {data?.district ? (
              <CheckCircleOutlineIcon id="cs__tick__icon" />
            ) : (
              ""
            )}
          </div>
        </Link>

        <Link href={`/upload/profile/${id}`}>
          <div
            className={
              router.pathname == `/upload/profile/[slug]`
                ? "ative__side__link justify-between flex p-3"
                : "cs__row  justify-between flex p-3"
            }
          >
            <div className="flex">
              <PeopleOutlineIcon />

              <p className="ml-2">Profile</p>
            </div>
            {data?.address ? (
              <CheckCircleOutlineIcon id="cs__tick__icon" />
            ) : (
              ""
            )}
          </div>
        </Link>

        <Link href={`/upload/details/${id}`}>
          <div
            className={
              router.pathname == `/upload/details/[slug]`
                ? "ative__side__link justify-between flex p-3"
                : "cs__row  justify-between flex p-3"
            }
          >
            <div className="flex  ">
              <DetailsIcon />
              <p className="ml-2">Details</p>
            </div>
            {data?.details ? (
              <CheckCircleOutlineIcon id="cs__tick__icon" />
            ) : (
              ""
            )}
          </div>
        </Link>

        {data?.propType == "residential land" || data?.propType == "industrial land" ? (
          <Link href={`/upload/roadaccess/${id}`}>
            <div
              className={
                router.pathname == `/upload/roadaccess/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex  ">
                <AddRoadIcon />
                <p className="ml-2">Road access</p>
              </div>
              {data.roadAccess ? <CheckCircleOutlineIcon id="cs__tick__icon" /> : ''}
              
            </div>
          </Link>
        ) : (
          ""
        )}

        {data?.propType === "residential apartments" ||
        data?.propType === "residential other" ||
        data?.propType === "commercial shop" ||
        data?.propType === "commercial other" ||
        data?.propType === "commercial office" ||
        data?.propType === "industrial building" ||
        data?.propType === "residential house-villa"
        
        ? (
          <Link href={`/upload/amenities/${id}`}>
            <div
              className={
                router.pathname == `/upload/amenities/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex  ">
                <RamenDiningIcon />
                <p className="ml-2">Amenities</p>
              </div>

              {data?.amenities ? (
                <CheckCircleOutlineIcon
                  onClick={() => console.log(data)}
                  id="cs__tick__icon"
                />
              ) : (
                ""
              )}
            </div>
          </Link>
        ) : (
          ""
        )}

        {data?.propType === "residential apartments" ||
        data?.propType === "residential land" ||
        data?.propType === "residential other" ||
        data?.propType === "industrial building"||
        data?.propType === "residential house-villa"
        ? (
          <Link href={`/upload/distance/${id}`}>
            <div
              className={
                router.pathname == `/upload/distance/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex   ">
                <ConnectWithoutContactOutlinedIcon />
                <p className="ml-2">Distance</p>
              </div>
              {data?.distance ?  <CheckCircleOutlineIcon id="cs__tick__icon" />  : ''}
              
            </div>
          </Link>
        ) : (
          ""
        )}

        {data?.propType === "commercial shop" ||
        data?.propType === "commercial other" ||
        data?.propType === "commercial office"||
        data?.propType === "industrial building" ||
        data?.propType === "industrial land"
        ? (
          <Link href={`/upload/locationType/${id}`}>
            <div
              className={
                router.pathname == `/upload/locationType/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex ">
                <NotListedLocationIcon />
                <p className="ml-2">Location type</p>
              </div>
              {data?.locationType ? (
                <CheckCircleOutlineIcon id="cs__tick__icon" />
              ) : (
                ""
              )}
            </div>
          </Link>
        ) : (
          ""
        )}
        {data?.propType === "commercial land" ||
        data?.propType === "commercial land" ||
        data?.propType === "commercial building"
        ? (
          <Link href={`/upload/nearby/${id}`}>
            <div
              className={
                router.pathname == `/upload/nearby/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex ">
                <NearMeIcon />
                <p className="ml-2">Nearby</p>
              </div>
              {data?.locationType ? (
                <CheckCircleOutlineIcon id="cs__tick__icon" />
              ) : (
                ""
              )}
            </div>
          </Link>
        ) : (
          ""
        )}
        <Link href={`/upload/images/${id}`}>
            <div
              className={
                router.pathname == `/upload/nearby/[slug]`
                  ? "ative__side__link justify-between flex p-3"
                  : "cs__row  justify-between flex p-3"
              }
            >
              <div className="flex ">
                <InsertPhotoIcon/>
                <p className="ml-2">Images</p>
              </div>
              {data?.images?.length ? (
                <CheckCircleOutlineIcon id="cs__tick__icon" />
              ) : (
                ""
              )}
            </div>
          </Link>
      </div>
      
      </div>
 
  );
}
