import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CategoryScroll from "../../../components/CategoryScroll";
import { useRouter } from "next/router";
import ResiBox from "../../../components/catViewBoxes/Residential";
import LandBox from "../../../components/catViewBoxes/Land";
import IndustrialBox from "../../../components/catViewBoxes/IndustrialBox";
import CommercialBox from "../../../components/catViewBoxes/CommercialBox";
import BoxPlaceHolder from "../../../components/BoxPlaceHolder";
import { useDispatch } from "react-redux";
import { offSearch } from "../../../redux/searchSlice";

export default function MinSearch() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [slug, setSlug] = useState({});
  const propType = slug.propType;
  const dispatch = useDispatch();
  const getProperty = async () => {
    if (slug.propType) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/category/${slug.propType}`,
          {}
        );
        const { data } = await res.json();
        setData(data);
        dispatch(offSearch());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const results = data?.filter(
    (item) => item.town === slug.town && item.district === slug.district
  );
  useEffect(() => {
    dispatch(offSearch());
    getProperty();
  }, [slug]);

  useEffect(() => {
    if (router.query.slug) {
      setSlug(JSON.parse(router.query.slug));
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="content">
        {" "}
        <CategoryScroll />
        {results.length ? (
          <div className="mt-4 grid lg:grid-cols-4 lg:gap-6">
            {results?.map((d, i) => {
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
                    displayPrice={d.displayPrice}
                    demo={demo}
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
                    displayPrice={d.displayPrice}
                    demo={demo}
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
                    displayPrice={d.displayPrice}
                    demo={demo}
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
