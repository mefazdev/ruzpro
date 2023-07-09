import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CategoryScroll from "../../components/CategoryScroll";
import { useRouter } from "next/router";
import { getMetadata } from "firebase/storage";
import ResiBox from "../../components/catViewBoxes/Residential";
import LandBox from "../../components/catViewBoxes/Land";
import IndustrialBox from "../../components/catViewBoxes/IndustrialBox";
import CommercialBox from "../../components/catViewBoxes/CommercialBox";
import BoxPlaceHolder from "../../components/BoxPlaceHolder";

export default function CatView() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const propType = router.query.slug;

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/category/${propType}`,
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
  }, [propType]);

  return (
    <div className="pb-14">
      <Navbar />
      <div className="content">
        {" "}
        <CategoryScroll propType={propType} />
        {data?.length ? (
          <div className="mt-4 grid md:grid-cols-2 md:gap-7 lg:grid-cols-4  lg:gap-6">
            {data?.map((d, i) => {
              if (
                propType === "residential apartments" ||
                propType === "residential other" ||
                propType === "residential house-villa"
              ) {
                return (
                  <ResiBox
                    key={i}
                    id={d._id}
                    propType={d.propType}
                    transType={d.transType}
                    town={d.town}
                    district={d.district}
                    price={d.price}
                    images={d.images}
                    builtArea={d.builtArea}
                    builtUnit={d.builtUnit}
                    displayPrice={d.displayPrice}
                    bedrooms={d.bedrooms}
                    demo={d.demo}
                  />
                );
              }

              if (
                propType === "residential land" ||
                propType === "agricultural land" ||
                propType === "industrial land" ||
                propType === "commercial land"
              ) {
                return (
                  <LandBox
                    key={i}
                    id={d._id}
                    propType={d.propType}
                    transType={d.transType}
                    town={d.town}
                    district={d.district}
                    price={d.price}
                    images={d.images}
                    plotArea={d.plotArea}
                    plotUnit={d.plotUnit}
                    displayPrice={d.displayPrice}demo={d.demo}
                  />
                );
              }

              if (
                propType === "commercial office" ||
                propType === "commercial shop" ||
                propType === "commercial building" ||
                propType === "commercial other"
              ) {
                return (
                  <CommercialBox
                    key={i}
                    id={d._id}
                    propType={d.propType}
                    transType={d.transType}
                    town={d.town}
                    district={d.district}
                    price={d.price}
                    images={d.images}
                    builtArea={d.builtArea}
                    builtUnit={d.builtUnit}
                    displayPrice={d.displayPrice}demo={d.demo}
                  />
                );
              }

              if (propType === "industrial building") {
                return (
                  <IndustrialBox
                    key={i}
                    id={d._id}
                    propType={d.propType}
                    transType={d.transType}
                    town={d.town}
                    district={d.district}
                    price={d.price}
                    images={d.images}
                    builtArea={d.builtArea}
                    builtUnit={d.builtUnit}
                    displayPrice={d.displayPrice}demo={d.demo}
                  />
                );
              }
            })}
          </div>
        ) : (
          <BoxPlaceHolder />
        )}
      </div>
    </div>
  );
}
