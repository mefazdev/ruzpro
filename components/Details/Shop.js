import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Shop({data}) {
  const [num, setNum] = useState([]);
  const [year, setYear] = useState([]);
  const [cyr, setCyr] = useState("");

  const [totalFloors, setTotalFloors] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [builtUnit, setBuiltUnit] = useState("");

  const [nullCyr, setNUllCyr] = useState(false);
  const [nullTfloor, setNUllTfloor] = useState(false);
  const [nullFNo, setNullFno] = useState(false);
  const [nullBuiltUnit, setNullBUiltUnit] = useState(false);
  const [nullBuiltArea, setNullBUiltArea] = useState(false);
  const [saving,setSaving] = useState(false)
  const router = useRouter();
  const id = router.query.slug;

  const validate = () => {
    setSaving(true)
    if (builtArea) {
      if (builtUnit) {
        if (floorNo) {
          if (totalFloors) {
            if (cyr) {
              addDetails();
            } else {
              setNUllCyr(true);
            }
          } else {
            setNUllTfloor(true);
          }
        } else {
          setNullFno(true);
        }
      } else {
        setNullBUiltUnit(true);
      }
    } else {
      setNullBUiltArea(true);
    }
  };
  const addDetails = async () => {
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
            builtArea: builtArea,
            builtUnit: builtUnit,
            floorNo: floorNo,
            totalFloors: totalFloors,
            constructedYear: cyr,
            details: true,
          }),
        }
      );

      await router.push(`/upload/amenities/${id}`);
      setSaving(false)
    } catch (error) {
      console.log("error>>>>>", error.message);
    }
  };
  
  const count = () => {
    let no = [];
    let i = 0;
    for (i = 1; i < 61; i++) {
      no = [...no, i];
      if (i == 60) {
        // setNum(no)
      }
    }

    setNum(no);
  };

  const initYears = () => {
    let y = [];
    let i;
    for (let i = 1950; i < 2024; i++) {
      y = [...y, i];
    }
    setYear(y);
  };

  useEffect(() => {
    count();
    initYears();
  }, []);

  const handleYear = (event) => {
    setCyr(event.target.value);
  };

  

  useEffect(() => {
    setBuiltArea(data?.builtArea);
    setBuiltUnit(data?.builtUnit);

    setTotalFloors(data?.totalFloors);
    setFloorNo(data?.floorNo);
    setCyr(data?.constructedYear);
  }, [data]);
  return (
    <div>
      {/* <button onClick={()=>console.log(no)}>CLICK ME</button> */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Built Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={builtArea}
          onChange={(e) => setBuiltArea(e.target.value)}
          error={nullBuiltArea && !builtArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Built Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={builtUnit}
            label="Built Area"
            required
            onChange={(e) => setBuiltUnit(e.target.value)}
            error={nullBuiltUnit && !builtUnit ? true : false}
          >
            <MenuItem value={"Sq-ft"}>Sq-ft</MenuItem>
            <MenuItem value={"Sq-m"}>Sq-m</MenuItem>
            <MenuItem value={"Sq-Yrd"}>Sq-Yrd</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-6 lg:mt-10">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Floor No</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={floorNo}
            label="Floor No"
            required
            onChange={(e) => setFloorNo(e.target.value)}
            error={nullFNo && !floorNo ? true : false}
          >
            {num.map((no) => {
              return (
                <MenuItem key={no} value={no}>
                  {no}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Total no of floors
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={totalFloors}
            label="Total Floors"
            required
            onChange={(e) => setTotalFloors(e.target.value)}
            error={
              (nullTfloor && !totalFloors) || totalFloors < floorNo
                ? true
                : false
            }
          >
            {num.map((no) => {
              return (
                <MenuItem key={no} value={no}>
                  {no}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 mt-6 lg:mt-10">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Constructed Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cyr}
            label="Constructed Year"
            required
            onChange={handleYear}
            error={nullCyr && !cyr ? true : false}
          >
            <MenuItem value="Under Construction">Under Construction</MenuItem>
            {year.map((y) => {
              return (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className=" mt-6 lg:mt-10">
        {/* <Link href="/"> */}
        <Button
          onClick={validate}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving? true : false}
        >
         {saving ? "Saving..." : 'Save & Continue'}
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
