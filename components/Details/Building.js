import { async } from "@firebase/util";
import { Router } from "@mui/icons-material";
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
import { measurement } from "../../assets/data/plot-area";
export default function Building() {
  const [year, setYear] = useState([]);
  const [cyr, setCyr] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [builtUnit, setBuiltUnit] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [nullPlotArea, setNullPlotArea] = useState(false);
  const [nullPlotUnit, setNullPlotUnit] = useState(false);
  const [nullBUiltArea, setNullBuiltArea] = useState(false);
  const [nullBuiltUnit, setNUllBUiltUnit] = useState(false);
  const [nullCyr,setNullCyr] =useState(false)
const [saving,setSaving] = useState(false)
  const router = useRouter();
  const id = router.query.slug;


  const validate = ()=>{
    if(builtArea){
if(builtUnit){
if(plotArea){
if(plotUnit){
if(cyr){
  addDetails()
}else{
  setNullCyr(true)
}

}else{
  setNullPlotUnit(true)
}
}else{
  setNullPlotArea(true)
}
}else{
  setNUllBUiltUnit(true)
}
    }else{
      setNullBuiltArea(true)
    }
  }

  const initYears = () => {
    let y = [];

    for (let i = 1950; i < 2024; i++) {
      y = [...y, i];
    }
    setYear(y);
  };

  useEffect(() => {
    initYears();
  }, []);

  const handleYear = (event) => {
    setCyr(event.target.value);
  };

  const addDetails = async () => {
    setSaving(true)
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
            details: true,
          }),
        }
      );

      await router.push(`/upload/nearby/${id}`);
      setSaving(false)
    } catch (error) {
      setSaving(false)
      alert("An error occurred!. Try again")
      console.log("Error...", error.message);
    }
  };
  return (
    <div>
      {/* <button onClick={()=>console.log(no)}>CLICK ME</button> */}
      <div className="grid lg:grid-cols-2  gap-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Built Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={builtArea}
          onChange={(e) => setBuiltArea(e.target.value)}
          error={!builtArea && nullBUiltArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Built Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={builtUnit}
            label="Built Unit"
            required
            onChange={(e) => setBuiltUnit(e.target.value)}
           
            error={!builtUnit && nullBuiltUnit ? true : false}
          >
            <MenuItem value={"Sq-ft"}>Sq-ft</MenuItem>
            <MenuItem value={"Sq-m"}>Sq-m</MenuItem>
            <MenuItem value={"Sq-Yrd"}>Sq-Yrd</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid lg:grid-cols-2  gap-6 lg:gap-10 mt-6 lg:mt-10">
        <TextField
          id="outlined-basic"
          label="Plot Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={plotArea}
          onChange={(e) => setPlotArea(e.target.value)}
          error={!plotArea && nullPlotArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            label="Plot area unit"
            required
            onChange={(e) => setPlotUnit(e.target.value)}
            error={!plotUnit && nullPlotUnit ? true : false }
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

      <div className="grid lg:grid-cols-2  gap-6 lg:gap-10 mt-6 mt-10">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Constructed Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cyr}
            label="Constructed year"
            required
            onChange={handleYear}
            error={!cyr && nullCyr ? true : false}
          >
            <MenuItem value="under construction">Under Construction</MenuItem>
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
      <div className="mt-6 lg:mt-10">
        {/* <Link href="/"> */}
        <Button
          onClick={validate}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true :false}
        >
   {saving ?  'Saving...' : 'Save & Continue'}
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
