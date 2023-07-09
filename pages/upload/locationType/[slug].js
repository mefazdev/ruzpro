import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CommercialShopLocationType from "../../../components/locationType/CommercialShop";
import IndBuildingLocationType from "../../../components/locationType/IndBuildingLoc";
import IndustrialLocationType from "../../../components/locationType/IndustrialLocType";
import Navbar from "../../../components/Navbar";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";

export default function LocationType() {
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
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4 style={{ fontSize: "20px" }}>Location type</h4>
          </div>

          {data?.propType === "commercial shop" ||
          data?.propType === "commercial other" ||
          data?.propType === "commercial office" ? (
            <CommercialShopLocationType id={id} data={data} />
          ) : (
            ""
          )}

          {data?.propType === "industrial building" ? (
            <IndBuildingLocationType id={id} data={data} />
          ) : (
            ""
          )}
          {data?.propType === "industrial land" ? (
            <IndustrialLocationType id={id} data={data} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
