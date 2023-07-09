import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";
export default function RoadAccess() {
  const [twoWheelerAcces, setTwoWheelerAccess] = useState("");
  const [fourWheelerAccess, setFourWheelerAccess] = useState("");
  const [nullFourWheeler, setNullFourWheeler] = useState(false);
  const [nullTwoWheeler, setNullTwoWheeler] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const id = router.query.slug;

  const [saving, setSaving] = useState(false);
  const validateForm = () => {
    setSaving(true);

    if (twoWheelerAcces) {
      if (fourWheelerAccess) {
        addAccess();
      } else {
        setNullFourWheeler(true);
      }
    } else {
      setNullTwoWheeler(true);
    }
  };
  const addAccess = async () => {
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
            roadAccess: {
              twoWheeler: twoWheelerAcces,
              fourWheeler: fourWheelerAccess,
            },
          }),
        }
      );
      if (data?.propType === "industrial land") {
        router.push(`/upload/locationType/${id}`);
        setSaving(false);
      } else {
        router.push(`/upload/distance/${id}`);
        setSaving(false);
      }
    } catch (error) {
      setSaving(false);
      alert("An error occurred!. Try again");
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
      setTwoWheelerAccess(data?.twoWheelerAcces);
      setFourWheelerAccess(data?.fourWheelerAccess);
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
      <div className="upload pt-5 grid  gap-4 lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4 className="text-lg  ">Access to raod (In Meters)</h4>
          </div>

          <div className=" mt-7 grid md:grid-cols-2 gap-5 md:gap-10">
            <div>
              <TextField
                type="number"
                id="outlined-basic"
                label="Two wheeler access"
                variant="outlined"
                required
                value={twoWheelerAcces}
                onChange={(e) => setTwoWheelerAccess(e.target.value)}
                style={{ width: "100%" }}
                error={nullTwoWheeler && !twoWheelerAcces ? true : false}
              />
            </div>
            <div>
              <TextField
                type="number"
                id="outlined-basic"
                label="Four wheeler access"
                variant="outlined"
                required
                value={fourWheelerAccess}
                onChange={(e) => setFourWheelerAccess(e.target.value)}
                style={{ width: "100%" }}
                error={nullFourWheeler && !fourWheelerAccess ? true : false}
              />
            </div>
          </div>
          <div className="mt-4 md:mt-10">
            <Button
              onClick={validateForm}
              disabled={saving ? true : false}
              style={{ float: "right", border: "1px solid blue" }}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
