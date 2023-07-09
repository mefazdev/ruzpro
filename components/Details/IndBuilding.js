import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
 
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { measurement } from "../../assets/data/plot-area";
export default function IndBuilding({ data }) {
  const [num, setNum] = useState([]);
  const [year, setYear] = useState([]);
  const [cyr, setCyr] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [builtUnit, setBuiltUnit] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [usageStatus, setUsageStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [nullPlotArea, setNullPlotArea] = useState(false);
  const [nullPlotUnit, setNullPlotUnit] = useState(false);
  const [nullBUiltArea, setNullBuiltArea] = useState(false);
  const [nullBuiltUnit, setNUllBUiltUnit] = useState(false);
  const [nullCyr, setNullCyr] = useState(false);
  const [nullFloors, setNullFloors] = useState(false);
  const [nullUsageStatus, setNullUsageStatus] = useState(false);
  const router = useRouter();
  const id = router.query.slug;
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
    for (let i = 1950; i < 2023; i++) {
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

  const validate = () => {
    if (builtArea) {
      if (builtUnit) {
        if (plotArea) {
          if (plotUnit) {
            if (totalFloors) {
              if (cyr) {
                if (usageStatus) {
                  addDetails();
                } else {
                  setNullUsageStatus(true);
                }
              } else {
                setNullCyr(true);
              }
            } else {
              setNullFloors(true);
            }
          } else {
            setNullPlotUnit(true);
          }
        } else {
          setNullPlotArea(true);
        }
      } else {
        setNUllBUiltUnit(true);
      }
    } else {
      setNullBuiltArea(true);
    }
  };
  const addDetails = async () => {
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
            builtArea: builtArea,
            builtUnit: builtUnit,
            plotArea: plotArea,
            plotUnit: plotUnit,
            constructedYear: cyr,
            totalFloors: totalFloors,
            constructedYear: cyr,
            usageStatus: usageStatus,
            details: true,
          }),
        }
      );
      if (data?.propType === "commercial other") {
        router.push(`/upload/amenities/${id}`);
        setSaving(false)
      }
      if (
        data?.propType != "commercial other" ||
        data?.propType != "industrial building"
      ) {
        await router.push(`/upload/nearby/${id}`);
        setSaving(false)
      }
      if (data?.propType == "industrial building") {
        await router.push(`/upload/amenities/${id}`);
        setSaving(false)
      }
    } catch (error) {
      setSaving(false)
      Alert('An error occurred!. Try again')
      console.log("Error...", error.message);
    }
    setSaving(false);
  };

  useEffect(() => {
    setCyr(data?.constructedYear);
    setBuiltArea(data?.builtArea);
    setBuiltUnit(data?.builtUnit);
    setPlotArea(data?.plotArea);
    setPlotUnit(data?.plotUnit);
    setTotalFloors(data?.totalFloors);
    setUsageStatus(data?.usageStatus);
  }, [data]);

  return (
    <div>
      {/* <button onClick={()=>console.log(data?.builtArea)}>CLICK ME</button>   */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Built Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={builtArea}
          error={!builtArea && nullBUiltArea ? true : false}
          onChange={(e) => setBuiltArea(e.target.value)}
        />
        <FormControl fullWidth>
          <TextField
            fullWidth
            id="country-code-select"
            select
            type="number"
            label="Bulit area unit"
            value={builtUnit}
            error={!builtUnit && nullBuiltUnit  ? true : false}
            displayEmpty
            onChange={(e) => setBuiltUnit(e.target.value)}
            SelectProps={{
              renderValue: (value) => value,
            }}
          >
            <MenuItem value={"Sq-ft"}>Sq-ft</MenuItem>
            <MenuItem value={"Sq-m"}>Sq-m</MenuItem>
            <MenuItem value={"Sq-Yrd"}>Sq-Yrd</MenuItem>
          </TextField>
        </FormControl>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Plot Area"
          variant="outlined"
          required
          type="number"
          style={{ width: "100%" }}
          value={plotArea}
          error={!plotArea && nullPlotArea  ? true : false}
          onChange={(e) => setPlotArea(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            error={!plotUnit && nullPlotUnit  ? true : false}
            label="Plot area unit"
            required
            onChange={(e) => setPlotUnit(e.target.value)}
          >
            {measurement.map((d) => {
              return (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-10">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Total no of floors
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={totalFloors}
            error={!totalFloors && nullFloors  ? true : false}
            label="Total Floor"
            required
            onChange={(e) => setTotalFloors(e.target.value)}
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
            Constructed Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cyr}
            error={!cyr &&  nullCyr ? true : false}
            label="Constructed year"
            required
            onChange={handleYear}
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

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-6 lg:mt-10">
        <FormControl fullWidth>
          <TextField
            fullWidth
            // id="country-code-select"
            select
            label="Usage status"
            value={usageStatus}
            error={!usageStatus && nullUsageStatus  ? true : false}
            displayEmpty
            onChange={(e) => setUsageStatus(e.target.value)}
            SelectProps={{
              renderValue: (value) => value,
            }}
          >
            <MenuItem value="In use">Currently in use</MenuItem>
            <MenuItem value="Not in use">Not in use</MenuItem>
          </TextField>
        </FormControl>
      </div>
      <div className="mt-6 lg:mt-10">
        <Button
          onClick={validate}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true : false}
        >
          {saving ? "Saving" : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
