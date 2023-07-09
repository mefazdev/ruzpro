import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AgriLand from "../../../components/Details/AgriLand";
import Apartments from "../../../components/Details/Apartments";
import Building from "../../../components/Details/Building";
import CommLand from "../../../components/Details/CommLand";
import House from "../../../components/Details/House";
import IndBuilding from "../../../components/Details/IndBuilding";
import IndLand from "../../../components/Details/IndLand";
import Land from "../../../components/Details/Land";
import Shop from "../../../components/Details/Shop";
import Navbar from "../../../components/Navbar";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";

export default function Details() {
  const [data, setData] = useState({});
  const router = useRouter();
  const id = router.query.slug;

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
      <div className="upload pt-5 pb-20 grid gap-4 lg:gap-10   lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4 style={{ fontSize: "20px" }}>Details</h4>
          </div>

          <div className=" mt-7 lg:mt-10">
            {data?.propType == "residential land" ? <Land data={data} /> : ""}

            {data?.propType == "commercial land" ? (
              <CommLand data={data} />
            ) : (
              ""
            )}

            {data?.propType == "residential apartments" ||
            data?.propType == "residential other" ? (
              <Apartments data={data} />
            ) : (
              ""
            )}

            {data?.propType === "residential house-villa" ? (
              <House id={id} data={data} />
            ) : (
              ""
            )}

            {data?.propType === "commercial shop" ||
            data?.propType === "commercial office" ? (
              <Shop data={data} />
            ) : (
              ""
            )}

            {data?.propType === "commercial building" ? <Building /> : ""}

            {data?.propType === "agricultural land" ? (
              <AgriLand id={id} data={data} />
            ) : (
              ""
            )}

            {data?.propType === "industrial land" ? (
              <IndLand data={data} />
            ) : (
              ""
            )}

            {data?.propType === "industrial building" ||
            data?.propType === "commercial other" ? (
              <IndBuilding data={data} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Details.getInitialProps =  async ({query: { id }}) =>{

//   const res = await fetch (`http://localhost:3000/api/property/${id}`);
//   //  const {data} = await res.json();
//    const d = id
//      return {property :d}
//     // return
// }

// export async function getServerSideProps(context) {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${context.params.slug}`,{})
//   const data = await res.json()

//   return { props: {dt:data} };

// }
