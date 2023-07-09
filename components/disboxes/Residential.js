import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { FiShare2 } from "react-icons/fi";
import { Link, Skeleton, Slide } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Share from "../Share";
import AddWishList from "../AddWishList";

export default function ResiBox({
  id,
  propType,
  transType,
  town,
  district,
  price,
  images,
  bedrooms,
  builtArea,
  builtUnit,
  locality,
  displayPrice,
  demo,
}) {
  const [share, setShare] = useState("");
  const [imgs, setImgs] = useState([]);

  const checkImages = () => {
    if (images[0] && images[1] && images[2]) {
      setImgs([images[0], images[1], images[2]]);
    } else if (images[0] && images[1]) {
      setImgs([images[0], images[1]]);
    } else if (images[0] && images[2]) {
      setImgs([images[0], images[2]]);
    } else if (images[1] && images[2]) {
      setImgs([images[1], images[2]]);
    } else if (images[0]) {
      setImgs([images[0]]);
    } else if (images[1]) {
      setImgs([images[1]]);
    } else if (images[2]) {
      setImgs([images[2]]);
    }
  };

  useEffect(() => {
    checkImages();
  }, [images]);
  return (
    <div className="resbox relative">
      <Carousel
        autoPlay={false}
        animation="slide"
        swipe={true}
        indicatorContainerProps={{
          style: {
            marginTop: "-30px",
            textAligh: "left",
            zIndex: 1,
            opacity: 1,
            position: "absolute",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#fff",
          },
        }}
      >
        {imgs?.map((d, i) => {
          return (
            <Link
              key={i}
              href={`/view/residential/${encodeURIComponent(id)}`}
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              {images?.[0] ? (
                <div
                  className="res__bg cursor-pointer flex"
                  style={{
                    backgroundImage: `url(${d})`,
                    display:'flex',
                    alignItems: "center",
                  }}
                >
                  {demo ? (
                    <div
                      className="bg-yellow-300 pl-1 pr-1"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      <p>For demo purpose only</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <Skeleton variant="rounded" width={"100%"} height={300} />
              )}
            </Link>
          );
        })}
      </Carousel>
      <div className="resbox__bottom mt-2 p-1">
        <div className="flex justify-between">
          <Link
            href={`/view/residential/${encodeURIComponent(id)}`}
            style={{ color: "inherit", textDecoration: "none" }}
            target="_blank"
          >
            <h2 className="capitalize  cursor-pointer">{propType}</h2>
          </Link>
          <div className="flex">
            {share === id ? (
              <CancelIcon
                onClick={() => setShare(null)}
                id="ftd__r__icons"
                className="cursor-pointer  h-6 w-5 mr-3 "
                style={{ color: "red" }}
              />
            ) : (
              <FiShare2
                className="w-5 h-6 cursor-pointer  mr-3"
                id="ftd__r__icons"
                onClick={() => setShare(id)}
              />
            )}

            <AddWishList
              id={id}
              propType={propType}
              viewPage={false}
              town={town}
              district={district}
              locality={locality}
            />
          </div>
        </div>
        <h3>
          {town}, {district}
        </h3>
        <h4>{bedrooms} Bedrooms</h4>
        <h4>
          {builtArea} {builtUnit}
        </h4>
        <div className="flex justify-between">
          <h5>₹ {displayPrice ? price.disRate : "Not provided"}</h5>
          <div className="bg-gray-300 p-.5 pl-1 pr-1">
            <p>For {transType}</p>
          </div>
        </div>
      </div>

      <Slide
        direction="up"
        in={share === id ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <div className="absolute bottom-0  h-fit  right-0 mt-5">
          <Share id={id} page="residential" />
        </div>
      </Slide>
    </div>
  );
}
