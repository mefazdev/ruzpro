import React from "react";
import Navbar from "../../../components/Navbar";
import CommercialLandNearby from "../../../components/nearby/CommercialLand";
import CommercialBuildingNearby from "../../../components/nearby/CommercialBuildingNearby";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";

export default function Amenities() {
  const router = useRouter();
  const id = router.query.slug;
  const [data, setData] = useState({});

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
      setTwoWheelerAccess(data?.twoWheelerAcces);
      setFourWheelerAccess(data?.fourWheelerAccess);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProperty();
  }, [id]);

  return (
    <div className="pb-20">
      <Navbar />
      <div className="upload pt-5 grid gap-4 lg:gap-10 lg:grid-cols-5">
        <ComplitionStatus id={id} data={data} />
        <MobComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4 style={{ fontSize: "20px" }}>Near by </h4>
          </div>

          {data?.propType == "commercial land" ? (
            <CommercialLandNearby />
          ) : (
            <CommercialBuildingNearby />
          )}
        </div>
      </div>
    </div>
  );
}
