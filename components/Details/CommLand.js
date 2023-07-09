import { RouterTwoTone } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { measurement } from "../../assets/data/plot-area";

export default function CommLand({data}) {
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [saving,setSaving] = useState(false)
  const [nullPlotArea,setNullPlotArea] = useState(false)
  const [nullPlotUnit,setNullPlotUnit] = useState(false)
const router = useRouter()
 const id = router.query.slug
 

 const validate = ()=>{
  // setSaving(true)
  if(plotArea){
    if(plotUnit){
      addLandDetail()
    }else{
      setNullPlotUnit(true)
    }
  }else{
    setNullPlotArea(true)
  }
 }
 const addLandDetail = async()=>{
    setSaving(true)
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,{
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':"application/json"
          // 'Content-type': 'text/plain',
        },

        body:JSON.stringify({
          plotArea:plotArea,
          plotUnit:plotUnit,
          details:true
        })
       })

      await router.push(`/upload/nearby/${id}`)
      setSaving(false)
    } catch (error) {
      setSaving(false)
      alert("An error occurred!. Try again")
     console.log( error.message) 
    }
  }

  useEffect(() => {
     setPlotArea(data?.plotArea)
     setPlotUnit(data?.plotUnit)
  }, [data])
  

  return (
    <div>
      <div className="grid lg:grid-cols-2   gap-6 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Plot area"
          variant="outlined"
          required
          value={plotArea}
          onChange={(e) => setPlotArea(e.target.value)}
          style={{ width: "100%" }}
          error={!plotArea && nullPlotArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            label="Age"
            required
            onChange={(e) => setPlotUnit(e.target.value)}
            error={!plotUnit && nullPlotUnit ? true : false}
          >
            {measurement.map((d, i) => {
              return (
                <MenuItem key={i} value={d} defaultChecked>
                  {d}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {/* <<<<<<<<<<<< RESIDENTIAL >>>>>>>>>> */}
      {/* <h1>RESIDENTIAL</h1> */}

     
      <div className=" mt-6 lg:mt-10">
        {/* <Link href="/upload/NearBy"> */}
          <Button
          disabled={saving?true :false}
          onClick={validate} style={{ float: "right", border: "1px solid blue" }}>
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
