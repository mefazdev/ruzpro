import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useRouter } from "next/router";
export default function Myprop({
  id,
  propType,
  transType,
  town,
  district,
  price,
  image,
}) {
  const router = useRouter();
  const navigate = () => {
    if (
      propType === "residential apartments" ||
      propType == "residential other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial shop" ||
      propType === "commercial office" ||
      propType === "commercial building" ||
      propType === "commercial other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial land" ||
      propType === "residential land" ||
      propType === "industrial land" ||
      propType === "agricultural land"
    ) {
      router.push(`/view/land/${id}`);
    }
    if (propType === "industrial building") {
      router.push(`/view/industrialBuilding/${id}`);
    }
  };
  return (
    <div className="mprop" style={{ position: "relative" }}>
      <div className="ftd__box grid grid-cols-2">
        <div
          className="ftd__left"
          id="ftd__one"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="ftd__left__row flex">
            <div className="ftd__left__row__right">For {transType}</div>
          </div>

          <div className="ftd__left__bottom flex">
            <div className="ftd__left__icons">
              <ImageIcon id="ftd__left__icon" />
            </div>
          </div>
        </div>
        <div className="ftd__right">
          <div
            type="button"
            onClick={navigate}
            className="ftd__right__head mb-5 cursor-pointer"
          >
            <h4 className="font-bold capitalize ">{propType}</h4>
            <div className="flex">
              <LocationOnIcon id="ftd__loc__icon" />
              <h5>
                {town}, {district}
              </h5>
            </div>
          </div>

          <div className="ftd__right__row grid grid-cols-2">
            <div className="flex ">
              <CurrencyRupeeIcon id="ftd__amn__icon" />
              <p>{price}</p>
            </div>
            <div className="flex">
              <ShareOutlinedIcon id="ftd__amn__icon" />
              <p>Share</p>
            </div>
          </div>

          <div className="ftd__right__bottom grid gap-1 grid-cols-2">
            <button className="ac__prop__edit__btn bg-red-100">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
