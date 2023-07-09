import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CommercialAmenities from "../../../components/amenities/Commercial";
import ResidentialAmenities from "../../../components/amenities/Residential";
import { useRouter } from "next/router";
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

      console.log(data.district);
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
            <h4 style={{ fontSize: "20px" }}>Amenities</h4>
          </div>

          {data?.propType === "residential apartments" ||
          data?.propType === "residential house-villa" ||
          data?.propType === "residential other" ? (
            <ResidentialAmenities id={id} data={data} />
          ) : (
            ""
          )}

          {data?.propType == "commercial shop" ||
          data?.propType == "commercial office" ||
          data?.propType == "commercial other" ||
          data?.propType == "industrial building" ? (
            <CommercialAmenities id={id} data={data} />
          ) : (
            ""
          )} 
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${context.params.slug}`,{})
//   const data = await res.json()

//   return { props: {dt:data} };

// }
