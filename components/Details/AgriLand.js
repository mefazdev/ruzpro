import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
   Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { measurement } from "../../assets/data/plot-area";
import { ScatterPlotSharp } from "@mui/icons-material";
export default function AgriLand({ data }) {
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [saving, setSaving] = useState(false);
  const [usageStatus, setUsageStatus] = useState("");
  const [agriType, setAgriType] = useState("");
  const [otherAgri, setOtherAgri] = useState("");
const [nullPlotArea,setNullPlotArea] = useState(false)
const [nullPlotUnit,setNullPlotUnit] = useState(false)
const [nullStatus,setNullStatus] = useState(false)
const [nullType,setNullType] = useState(false)
const [nullOther,setNullOther] = useState(false)
  const router = useRouter();
  const id = router.query.slug;
  useEffect(() => {
    setPlotArea(data?.plotArea);
    setPlotUnit(data?.plotUnit);
    setUsageStatus(data?.usageStatus);
    setAgriType(data?.agriType);
    setOtherAgri(data?.otherAgri);
  }, [data]);


  const validate =()=>{
if(plotArea){
if(plotUnit){
if(usageStatus){
if(agriType){
 if(agriType != "other"){
  addDetails()
 }else{
  if(otherAgri){
    addDetails()
  }else{
    setNullOther(true)
  }
 }
}else{
  setNullType(true)
}
}else{
  nullStatus(true)
}
}else{
  setNullPlotUnit(true)
}
}else{
  setNullPlotArea(true)
}
  }
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
            plotArea: plotArea,
            plotUnit: plotUnit,
            usageStatus: usageStatus,
            agriType: agriType,
            otherAgri: otherAgri,
            details: true,
          }),
        }
      );

      await router.push(`/upload/images/${id}`);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      alert("An error occurred!. Try again");
      console.log("Error>>>", error.message);
    }
  };

  const handleAgriType = (e)=>{
    let type = e.target.value
     setAgriType(type)

     if(type != 'other'){
      setOtherAgri(null)
     }
  
  }
  return (
    <div>
      {/* <button onClick={()=>console.log(data )}>CLICK ME</button> */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Plot Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          type="number"
          value={plotArea}
          error={!plotArea && nullPlotArea ? true : false}
          onChange={(e) => setPlotArea(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            error={!plotUnit && nullPlotUnit ? true : false}
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

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10  mt-6 lg:mt-10">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Usage Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={usageStatus}
            error={!usageStatus && nullStatus ? true : false}
            label="Usage status"
            required
            onChange={(e) => setUsageStatus(e.target.value)}
          >
            <MenuItem value={"yes"}>Curruntly Cultivated</MenuItem>
            <MenuItem value={"no"}>No Cultivated</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Agricultural Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={agriType}
            error={!agriType && nullType ? true : false}
            label="Agricultural Type"
            required
            onChange={handleAgriType}
          >
            <MenuItem value={"paddy"}>Paddy</MenuItem>

            <MenuItem value={"plantation"}>Plantation</MenuItem>

            <MenuItem value={"coconut grove"}>Coconut Grove</MenuItem>

            <MenuItem value={"cash crops"}>Cash Crops</MenuItem>

            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>

        {/* <TextField
          id="outlined-basic"
          label="Other "
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={otherAgri}
          onChange={(e) => setOtherAgri(e.target.value)}
        /> */}
      </div>
      {agriType === "other" ? (
        <div className="grid lg:grid-cols-2  lg:gap-10 mt-6  lg:mt-10">
          <TextField
            id="outlined-basic"
            label="Other"
            variant="outlined"
            value={otherAgri}
            type="text"
            onChange={(e) => setOtherAgri(e.target.value)}
           error={!otherAgri && nullOther ? true : false}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        ""
      )}

      <div className="mt-6 lg:mt-10">
        <Button
          onClick={validate}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true : false}
        >
          {saving ? 'Saving...'  : 'Save & Continue'}
        </Button>
      </div>
    </div>
  );
}
