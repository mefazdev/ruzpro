import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSidebar from "../../../components/AccountSidebar";
import Navbar from "../../../components/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment/moment";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Drawer } from "@mui/material";

export default function WatchList() {
  const [sbar, setSbar] = useState(false);

  const [data, setData] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const router = useRouter();
  const uid = router.query.slug;

  const getWatchList = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/viewed`, {});
      const { data } = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatchList();
  }, [uid]);

  const navigate = (propType, id) => {
    console.log(id);
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

  const removeFromViewed = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/viewed/${id}`,
        {
          method: "DELETE",
        }
      );

      getWatchList();
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };

  useEffect(() => {
    sortBydate();
  }, [data]);

  const sortBydate = () => {
    let a = data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    console.log(data);
    setWatchList(a);
  };

  return (
    <div className="pb-10">
      <Navbar />
      <div className="ac grid lg:grid-cols-5 p-3 lg:p-0 gap-10">
        <div className="ac__left hidden lg:grid">
          <AccountSidebar />
        </div>
        <div className="ac__right lg:col-span-4 gap-5">
          <div className="ac__right__head__left pb-3 flex justify-between lg:grid">
            <h6 className="font-bold" onClick={getWatchList}>
              Watch List
            </h6>
            <WidgetsIcon
              className="lg:hidden text-gray-500 text-3xl"
              onClick={() => setSbar(true)}
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-7 lg:gap-10">
            {watchList?.map((d, i) => {
              return (
                <div
                  className="wtd pt-3 "
                  key={i}
                  style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                >
                  <div
                    type="button"
                    className="ftd__right__head   cursor-pointer"
                  >
                    <div
                      className="flex justify-between pl-2 pr-2"
                      style={{ fontSize: "14px" }}
                    >
                      <p className="  text-gray-500  ">
                        {moment(d.date).format("MMM/DD/YYYY  ")}
                      </p>
                      <p className="  text-gray-500  ">
                        {moment(d.date).format(" hh:mm")}
                      </p>
                    </div>

                    <div
                      type="button"
                      onClick={() => navigate(d.propType, d.propId)}
                    >
                      <h4 className="font-bold capitalize text-center mt-1">
                        {d.propType}
                      </h4>
                      <div className="flex justify-center">
                        <LocationOnIcon id="ftd__loc__icon" />
                        <h5 className="text-center">
                          {d.town}, {d.district}
                        </h5>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromViewed(d._id)}
                      className="mt-4 bg-red-100  "
                      style={{
                        fontSize: "13px",
                        padding: "2px",
                        width: "100%",
                      }}
                    >
                      <h5>Remove</h5>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>{" "}
      <React.Fragment>
        <Drawer
          // anchor={anchor}
          open={sbar}
          // onClose={toggleDrawer(anchor, false)}
        >
          <div className="p-3">
            {/* <CancelRoundedIcon className="absolute top-0 right-0 mt-1 mr-1 text-red-600"/> */}

            <AccountSidebar />
            <button
              className="bg-red-500 text-white w-full mt-2 p-2"
              onClick={() => setSbar(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
