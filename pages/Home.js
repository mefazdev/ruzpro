import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryScroll from "../components/CategoryScroll";
import LandBox from "../components/disboxes/Land";
import ResiBox from "../components/disboxes/Residential";
import CommercialBox from "../components/disboxes/CommercialBox";
import IndusBox from "../components/disboxes/IndustrialBox";
import BoxPlaceHolder from "../components/BoxPlaceHolder";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property`,
        {}
      );
      const { data } = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="pb-14">
      <Navbar />
 
      <div className="content">
        <CategoryScroll />

        {data?.length ? (
          <div className=" grid md:grid-cols-2 md:gap-7 lg:grid-cols-4  lg:gap-6">
            {data?.map((d, i) => {
              if (
                d.propType === "residential apartments" ||
                d.propType === "residential other" ||
                d.propType === "residential house-villa"
              ) {
                return (
                  <ResiBox
                    key={i}
                    id={d._id}
                    propType={d.propType}
                    displayPrice={d.displayPrice}
                    transType={d.transType}
                    town={d.town}
                    district={d.district}
                    price={d.price}
                    images={d.images}
                    builtArea={d.builtArea}
                    builtUnit={d.builtUnit}
                    bedrooms={d.bedrooms}
                    demo={d.demo}
                  />
                );
              }

              if (
                d.propType === "residential land" ||
                d.propType === "agricultural land" ||
                d.propType === "industrial land" ||
                d.propType === "commercial land"
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
                    displayPrice={d.displayPrice}
                    plotUnit={d.plotUnit}
                    demo={d.demo}
                  />
                );
              }

              if (
                d.propType === "commercial office" ||
                d.propType === "commercial shop" ||
                d.propType === "commercial building" ||
                d.propType === "commercial other"
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
                    demo={d.demo}
                  />
                );
              }

              if (d.propType === "industrial building") {
                return (
                  <IndusBox
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
                    demo={d.demo}
                    displayPrice={d.displayPrice}
                  />
                );
              }
            })}
          </div>
        ) : (
          <BoxPlaceHolder />
        )}
      </div>
      <Footer />
    </div>
  );
}

// We use cookies and similar technologies to help personalise content, tailor and measure ads, and provide a better experience. By clicking OK or turning an option on in Cookie Preferences, you agree to this, as outlined in our Cookie Policy. To change preferences or withdraw consent, please update your Cookie Preferences.

// J#y@GA9su8ag3
