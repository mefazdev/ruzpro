import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Slide } from "@mui/material";
import Share from "./Share";

export default function Myprop({
  id,
  propType,
  transType,
  town,
  district,
  price,
  image,
  status,
  refresh,
}) {
  const [share, setShare] = useState(false);
  const [actions, setActions] = useState(false);

  const [del, setDel] = useState(false);
  const router = useRouter();
  const navigate = () => {
    if (
      propType === "residential apartments" ||
      propType == "residential other" ||
      propType == "residential house-villa"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial shop" ||
      propType === "commercial office" ||
      propType === "commercial building" ||
      propType === "commercial other"
    ) {
      router.push(`/view/commercial/${id}`);
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

  const handelDel = () => {
    setActions(false);
    setDel(true);
  };
  const deleteProp = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      refresh();
       
    } catch (error) {
      console.log(error.message);
    }
  };

  const hideProp = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "hidden",
          }),
        }
      );
      refresh();
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };
  const makeVisble = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "active",
          }),
        }
      );
      refresh();
      // router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mprop" style={{ position: "relative" }}>
      <div className="ftd__box grid lg:grid-cols-2">
        <div
          className="ftd__left"
          id="ftd__one"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="ftd__left__row flex ">
            <div className="ftd__left__row__right">For {transType}</div>
            <div className="ftd__left__row__right capitalize">{status}</div>
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

          <div className="ftd__right__row flex justify-between">
            <div className="flex ">
              <CurrencyRupeeIcon id="ftd__amn__icon" />
              <p>{price.disRate}</p>
            </div>
            <div className="cursor-pointer flex bg-gray-100 p-1  ">
              {share === id ? (
                <>
                  <p onClick={() => setShare(null)}>Close</p>
                  <CancelIcon
                    onClick={() => setShare(null)}
                    id="ftd__r__icons"
                    className="mr-1  cursor-pointer "
                    style={{ color: "red" }}
                  />{" "}
                </>
              ) : (
                <>
                  <p onClick={() => setShare(id)}>Share</p>
                  {/* <ShareOutlinedIcon
                  id="ftd__r__icons"
                  className="mr-1 cursor-pointer"
                  onClick={() => setShare(id)}
                /> */}
                </>
              )}
            </div>
          </div>

          <div className="ftd__right__bottom grid gap-1 grid-cols-2">
            <Link href={`/edit/basicInfo/${id}`}>
              <button className="ac__prop__edit__btn bg-gray-100">Edit</button>
            </Link>

            <button
              onClick={() => setActions(!actions)}
              className="ac__prop__edit__btn bg-gray-100"
            >
              Actions
              {actions ? (
                <CloseIcon id="prop__more__icon" />
              ) : (
                <MoreVertIcon id="prop__more__icon" />
              )}
            </button>
          </div>

          {actions ? (
            <div className="my__prop__act" style={{ position: "absolute" }}>
              <Paper sx={{ width: 320, maxWidth: "100%" }}>
                <MenuList>
                  {status == "active" ? (
                    <MenuItem onClick={hideProp}>
                      <ListItemIcon>
                        <VisibilityOffOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Hide</ListItemText>
                      <Typography variant="body2" color="text.secondary">
                        ⌘H
                      </Typography>
                    </MenuItem>
                  ) : status == "hidden" ? (
                    <MenuItem onClick={makeVisble}>
                      <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Make visible</ListItemText>
                      <Typography variant="body2" color="text.secondary">
                        ⌘V
                      </Typography>
                    </MenuItem>
                  ) : (
                    <Link href={`/edit/basicInfo/${id}`}>
                      <MenuItem>
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Complete details</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          ⌘A
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}

                  <MenuItem onClick={handelDel}>
                    <ListItemIcon>
                      <DeleteOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      ⌘D
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Paper>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {del ? (
        <Alert className="absolute z-10 w-full" severity="error">
          Remove this property?{" "}
          <button
            onClick={deleteProp}
            className="ml-2 pl-2 pr-2 text-white bg-red-500"
          >
            Yes
          </button>
          <button
            onClick={() => setDel(false)}
            className="ml-3 pl-2 pr-2 text-white bg-blue-500"
          >
            No
          </button>
        </Alert>
      ) : (
        ""
      )}

      <Slide
        direction="up"
        in={share === id ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <div className="absolute bottom-0  h-fit  right-0   ">
          <Share id={id} page="commercial" />
        </div>
      </Slide>
    </div>
  );
}
