import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import SubwayOutlinedIcon from "@mui/icons-material/SubwayOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";

export default function Nearby({ essential }) {
  return (
    <div className="nearby mt-4 lg:mt-0">
      <div className="bg-gray-100 p-2">
        <p className="text-gray-600">Nearby essential</p>
      </div>
      {essential?.schoolDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <SchoolIcon className="text-gray-600" />
            <p className="ml-2">School</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm ">{essential?.schoolDist} Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.hospitalDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <LocalHospitalOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Hospital</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm "> {essential?.hospitalDist} Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.busDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <DirectionsBusFilledOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Bus stop</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm "> {essential?.busDist} Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.supermarketDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <ShoppingCartOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Supermarket</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm "> {essential?.supermarketDist} Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.shoppingDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <StorefrontOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Shopping</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm ">{essential?.shoppingDist} Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.railwayDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <SubwayOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Railway</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm "> 11 Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {essential?.airportDist ? (
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid gray", borderStyle: "dashed" }}
        >
          <div className="flex">
            <FlightOutlinedIcon className="text-gray-600" />
            <p className="ml-2">Airport</p>
          </div>
          <div className="bg-green-200  text-xs p-0.5 rounded-lg">
            <p className="text-sm "> 11 Km</p>{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
