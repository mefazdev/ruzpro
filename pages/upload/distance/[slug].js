import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import SubwayOutlinedIcon from "@mui/icons-material/SubwayOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { useRouter } from "next/router";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";
export default function Distance() {
  const [schoolDist, setSchoolDist] = useState(Number);
  const [hospitalDist, setHospitalDist] = useState(Number);
  const [airportDist, setAirportDist] = useState(Number);
  const [busDist, setBusDist] = useState(Number);
  const [supermarketDist, setSupermarketDist] = useState(Number);
  const [railwayDist, setRailwayDist] = useState(Number);
  const [shoppingDist, setShoppingDist] = useState(Number);
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const id = router.query.slug;

  const addDistance = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // 'Content-type': 'text/plain',
          },
          body: JSON.stringify({
            distance: {
              schoolDist,
              hospitalDist,
              busDist,
              airportDist,
              railwayDist,
              supermarketDist,
              shoppingDist,
            },
          }),
        }
      );
      if (data?.propType === "industrial building") {
        router.push(`/upload/locationType/${id}`);
        setSaving(false);
      } else {
        router.push(`/upload/images/${id}`);
        setSaving(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
      setSchoolDist(data?.distance.schoolDist);
      setHospitalDist(data?.distance.hospitalDist);
      setBusDist(data?.distance.busDist);
      setRailwayDist(data?.distance.railwayDist);
      setAirportDist(data?.distance.airportDist);
      setSupermarketDist(data?.distance.supermarketDist);
      setShoppingDist(data?.distance.shoppingDist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  return (
    <div className="pb-20">
      <Navbar />
      <div className="upload pt-5 grid gap-4 lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4 ">
          <div className="up__head p-2 bg-gray-100">
            <h4
              style={{ fontSize: "20px" }}
              onClick={() => console.log(data.distance)}
            >
              Distance
            </h4>
          </div>
          <div className="mt-3 lg:mt-10 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <SchoolIcon id="distance__icons" />
                <Slider
                  value={schoolDist}
                  onChange={(e) => setSchoolDist(e.target.value)}
                />
                {schoolDist ? <p>{schoolDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>School</b>
            </h6>
          </div>
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <LocalHospitalOutlinedIcon id="distance__icons" />
                <Slider
                  value={hospitalDist}
                  onChange={(e) => setHospitalDist(e.target.value)}
                />
                {hospitalDist ? <p>{hospitalDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Hospital</b>{" "}
            </h6>
          </div>
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <DirectionsBusFilledOutlinedIcon id="distance__icons" />
                <Slider
                  value={busDist}
                  onChange={(e) => setBusDist(e.target.value)}
                />
                {busDist ? <p>{busDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Bus stop</b>{" "}
            </h6>
          </div>{" "}
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <FlightOutlinedIcon id="distance__icons" />
                <Slider
                  value={airportDist}
                  onChange={(e) => setAirportDist(e.target.value)}
                />
                {airportDist ? <p>{airportDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Airport</b>{" "}
            </h6>
          </div>
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <SubwayOutlinedIcon id="distance__icons" />
                <Slider
                  value={railwayDist}
                  onChange={(e) => setRailwayDist(e.target.value)}
                />
                {railwayDist ? <p>{railwayDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Railway station</b>{" "}
            </h6>
          </div>
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <StorefrontOutlinedIcon id="distance__icons" />
                <Slider
                  value={supermarketDist}
                  onChange={(e) => setSupermarketDist(e.target.value)}
                />
                {supermarketDist ? <p>{supermarketDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Supermarket</b>{" "}
            </h6>
          </div>
          <div className="mt-3 lg:mt-5 dist__row">
            <Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <ShoppingCartOutlinedIcon id="distance__icons" />
                <Slider
                  value={shoppingDist}
                  onChange={(e) => setShoppingDist(e.target.value)}
                />
                {shoppingDist ? <p>{shoppingDist}KM</p> : <p>NIL</p>}
              </Stack>
            </Box>
            <h6 className="ml-8">
              Distance to <b>Shopping</b>{" "}
            </h6>
          </div>
          <div className="mt-5 lg:mt-10">
            <Button
              onClick={addDistance}
              style={{ float: "right", border: "1px solid blue" }}
              disabled={saving ? true : false}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
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
