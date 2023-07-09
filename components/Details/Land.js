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

export default function Land({data}) {
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [isGatedProperty, setIsGatedProperty] = useState(Boolean);
  const [inResColony, setInResConlony] = useState(Boolean);
  const [nullPlotArea,setNullPlotArea] = useState(false)
  const [nullPlotUnit,setNullPlotUnit] = useState(false)
  const [saving,setSaving] = useState(false)
const router = useRouter()
 const id = router.query.slug
 

 const validateForm = ()=>{
  setSaving(true)
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
    // console.log(plotArea,plotUnit,isgatedProperty,inResColony)

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
          isGatedProperty:isGatedProperty,
          inResidenceColony:inResColony,
          details:true
          

        })
       })

      await router.push(`/upload/roadaccess/${id}`)
      setSaving(false)
    } catch (error) {
     console.log("Error>>>",error.message) 
    }
  }

  useEffect(()=>{
     
      setPlotArea(data?.plotArea)
      setPlotUnit(data?.plotUnit)
      setIsGatedProperty(data?.isGatedProperty)
      setInResConlony(data?.inResidenceColony )
     
      
  },[data])
  return (
    <div>
  
      <div className="grid lg:grid-cols-2  gap-5 lg:gap-10">
        <TextField
          id="outlined-basic"
          label="Plot area"
          variant="outlined"
          required
          value={plotArea}
          onChange={(e) => setPlotArea(e.target.value)}
          style={{ width: "100%" }}
          error={nullPlotArea && !plotArea ? true :false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            label="Age"
            required
            onChange={(e) =>setPlotUnit(e.target.value)}
            error={nullPlotUnit && !plotUnit ? true :false}
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

      <div className="mt-5 lg:mt-10 grid lg:grid-cols-2 gap-4 lg:gap-10">
        <div>
          <p className="bg-gray-100 p-1">Gated property</p>
          <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
         
            name="radio-buttons-group"
            className="flex"
            onChange={(e) => setIsGatedProperty(e.target.value)}
            // value={isGatedProperty}
            style={{ fontSize: "10px" }}
            defaultValue={true}
          >
            <div className="flex lg:mt-2">
              <div className="flex" style={{ alignItems: "center" }}>
                <FormControlLabel
                  value="true"
                  control={<Radio color="success" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="success" />}
                  label="No"
                />
              </div>
              
            </div>
             

             
          </RadioGroup>
          </FormControl>
        </div>

        <div className="ml-2">
          <p className="bg-gray-100 p-1">In resdential colony</p>
          <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
           
            name="radio-buttons-group"
            className="flex"
            // value={inResColony}
            onChange={(e) => setInResConlony(e.target.value)}
            style={{ fontSize: "10px" }}
            defaultValue={true}
          >
            <div className="flex lg:mt-2">
              <div className="flex" style={{ alignItems: "center" }}>
                <FormControlLabel
                  value='true'
                  control={<Radio color="success" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="success" />}
                  label="No"
                />
              </div>
              
            </div>
             
          </RadioGroup>
          </FormControl>
          {/* <div className="flex mt-2">
            <div className="flex" style={{ alignItems: "center" }}>
              <p>Yes</p>
              <Radio color="success" />
            </div>
            <div className="flex ml-4" style={{ alignItems: "center" }}>
              <p>No</p>
              <Radio color="success" defaultChecked />
            </div>
          </div> */}
        </div>
      </div>
      <div className=" mt-5 lg:mt-10">
        {/* <Link href="/upload/NearBy"> */}
          <Button onClick={validateForm} style={{ float: "right", border: "1px solid blue" }}>
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
