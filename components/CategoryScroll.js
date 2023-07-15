import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsPhoneLandscape } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { TfiShoppingCart } from "react-icons/tfi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { VscTools } from "react-icons/vsc";
import { AiOutlineBuild } from "react-icons/ai";
import { GiIsland } from "react-icons/gi";
import Link from "next/link";

export default function CategoryScroll({ propType }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      partialVisibilityGutter: 5,
    },
  };

  return (
    <div className="cat__scrl">
      <Carousel
        responsive={responsive}
        draggable={true}
        swipeable={true}
        removeArrowOnDeviceType="mobile"
        // centerMode={true}
        focusOnSelect={false}
        // slidesToSlide={2}
        // infinite={true}
        keyBoardControl={true}
        partialVisbile={true}
      >
        <Link href={"/catview/residential apartments"}>
          <div className="cat__scrl__div cursor-pointer">
            <HiOutlineHomeModern className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Residential <br /> apartments
            </p>
            {propType === "residential apartments" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/residential house-villa`}>
          <div className="cat__scrl__div cursor-pointer">
            <AiOutlineHome className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Residential <br /> house/villa
            </p>
            {propType === "residential house-villa" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/residential land`}>
          <div className="cat__scrl__div cursor-pointer">
            <BsPhoneLandscape className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Residential <br /> land
            </p>
            {propType === "residential land" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/residential other`}>
          <div className="cat__scrl__div cursor-pointer">
            <VscHome className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Residential <br /> other
            </p>
            {propType === "residential other" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/commercial shop`}>
          <div className="cat__scrl__div cursor-pointer">
            <TfiShoppingCart className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Commercial <br /> shop
            </p>
            {propType === "commercial shop" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/commercial office`}>
          <div className="cat__scrl__div cursor-pointer">
            <HiOutlineShoppingBag className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Commercial <br /> office
            </p>
            {propType === "commercial office" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/commercial land`}>
          <div className="cat__scrl__div cursor-pointer">
            <BsPhoneLandscape className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Commercial <br /> land
            </p>
            {propType === "commercial land" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/commercial building`}>
          <div className="cat__scrl__div cursor-pointer">
            <BsBuildings className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Commercial <br /> building
            </p>
            {propType === "commercial building" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/commercial other`}>
          <div className="cat__scrl__div cursor-pointer">
            <HiOutlineBuildingOffice className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Commercial <br /> other
            </p>
            {propType === "commercial other" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/industrial building`}>
          <div className="cat__scrl__div cursor-pointer">
            <VscTools className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Industrial <br /> building
            </p>
            {propType === "industrial building" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/industrial land`}>
          <div className="cat__scrl__div cursor-pointer">
            <AiOutlineBuild className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Industrial <br /> land
            </p>
            {propType === "industrial land" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link href={`/catview/agricultural land`}>
          <div className="cat__scrl__div cursor-pointer">
            <GiIsland className="m-auto h-5 w-5 text-gray-600" />
            <p>
              Agricultural <br /> land
            </p>
            {propType === "agricultural land" ? (
              <div className="h-1 bg-gray-500 mt-1 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        </Link>
      </Carousel>
    </div>
  );
}
