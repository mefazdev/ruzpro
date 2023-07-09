import { Button, FormControl, InputLabel, MenuItem, Radio, Select, TextField } from '@mui/material'
import { set } from 'mongoose';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { measurement } from "../../assets/data/plot-area";
export default function IndLand({data}) {
   
     const [year,setYear] = useState([])
     const [cyr,setCyr] = useState('')
     const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("");
  const [nullPlotArea, setNullPlotArea] = useState(false);
  const [nullPlotUnit, setNullPlotUnit] = useState(false);
 const [nullCyr,setNullCyr] = useState(false)
 const [saving,setSaving] = useState(false)
  const validate = ()=>{
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
  }
     
const router = useRouter()
const id = router.query.slug
    const initYears = ()=>{
      let y = []
      let i 
      for (let i  = 1950; i<2023; i++){
        y = [...y,i]
      }
      setYear(y)
    }

    useEffect(()=>{
      
 
      initYears()
        
    },[])

 
    const handleYear = (event) => {
      setCyr(event.target.value);
     
    };

    useEffect (()=>{
   setPlotArea(data?.plotArea)
   setPlotUnit(data?.plotUnit)
   setCyr(data?.constructedYear)
    },[data])
        const addDetails = async()=>{

          setSaving(true)
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
            constructedYear:cyr,
            details:true
          })
         })
  
        await router.push(`/upload/roadaccess/${id}`)
        setSaving(false)
      } catch (error) {
        setSaving(false)
        alert("An erro occurred!. Try again")
       console.log("Error>>>",error.message) 
      }
    }
  return (
    <div >  
<div className="grid grid-cols-2  gap-10">
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
            error={!plotUnit && nullPlotUnit ? true : false}
            label="Age"
            required
            onChange={(e) => setPlotUnit(e.target.value)}
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

       

     
      <div className="grid grid-cols-2  gap-10 mt-10">
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Constructed Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cyr}
            label="Constructed Year"
            required
            onChange={handleYear}
            error={!cyr && nullCyr ? true : false}
          >
            <MenuItem  value='Under Construction'>
                 Under Construction
              
                </MenuItem>
           {year.map((y)=>{
            return(
<MenuItem  key={y} value={y} >
             {y}
                </MenuItem>
            )
           })}
                
                 
          </Select>
        </FormControl>
        

         


       
      </div>
      <div className="mt-10">
  
          <Button
          disabled={saving ? true : false}
           onClick={validate} style={{ float: "right", border: "1px solid blue" }}>
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
       
      </div>
    </div>
  )
}
