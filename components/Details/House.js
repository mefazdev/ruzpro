import { AddReaction } from '@mui/icons-material'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { measurement } from "../../assets/data/plot-area";
export default function   House({id,data}) {
     const [num,setNum] = useState([])
     const [year,setYear] = useState([])
     const [cyr,setCyr] = useState('')
     const [bathrooms,setBathrooms] = useState('')
     
     const [bedrooms,setBedrooms] = useState('') 
     const [builtArea,setBuiltArea]= useState('')
     const [builtUnit,setBuiltUnit] = useState('')
     const [plotArea,setPlotArea] = useState('')
     const [plotUnit, setPlotUnit] = useState('')
     const [readyToMove,setReadyToMove] = useState(Boolean)
  const [saving,setSaving] = useState(false)
     const [nullBuiltArea,setNullBuiltArea] = useState(false)
     const [nullBuiltUnit,setNullBuiltUnit] = useState(false)
     const [nullBedrooms,setNullBedrooms] = useState(false)
     
     const [nullBathrooms,setNullBathrooms] = useState(false)
     
     
     const [nullCyr,setNullCyr] = useState(false)
     const [nullPlotArea,setNullPlotArea] = useState(false)
  const [nullPlotUnit, setNullPlotUnit] = useState(false)


     const validateForm = ()=>{
      if(builtArea){
        if(builtUnit){
          if(plotArea){
            if(plotUnit){
              if(bedrooms){
                if(bathrooms){
      
      if(cyr){
       
       addDeatails()
      }else{
        setNullCyr(true)
      }
      
      
                }else{
                  setNullBathrooms(true)
                }
               }else{
                setNullBedrooms(true)
               }
            }else{
             setNullPlotUnit(true)
            }
          } else{
            setNullPlotArea(true)
          }
        
        }else{
          setNullBuiltUnit(true)
        }
      }else{
        setNullBuiltArea(true)
      }
    }
 const router = useRouter()
//  const id = router.query.slug
    // const [no,setNo] = useState([])

    useEffect(()=>{
      setBuiltArea(data?.builtArea)
      setBuiltUnit(data?.builtUnit)
setBedrooms(data?.bedrooms)
setBathrooms(data?.bathrooms)
 setPlotArea(data?.plotArea)
 setPlotUnit(data?.plotUnit)
 setReadyToMove(data?.readyToMove)
setCyr(data?.constructedYear)
setReadyToMove(data?.readyToMove)
    },[data])
    const count = ()=>{
        let no =[]
        let i = 0
        for(i=1; i < 61; i++){

          no = [...no,i]
          if( i == 60){
            // setNum(no)  
                   }
        }
       
            
      setNum(no) 
        
    }

    const initYears = ()=>{
      let y = []
      let i 
      for (let i  = 1950; i<2024; i++){
        y = [...y,i]
      }
      setYear(y)
    }

    useEffect(()=>{
      
        count()
      initYears()
        
    },[])
 
    const handleYear = (event) => {
      setCyr(event.target.value);
     
    };
    const handleBathrooms = (e) =>{
      setBathrooms(e.target.value)
    }

    const addDeatails = async()=>{
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
          builtArea:builtArea,
          builtUnit:builtUnit,
          plotArea:plotArea,
          plotUnit:plotUnit, 
          bedrooms:bedrooms,
          bathrooms:bathrooms,
          constructedYear:cyr,
          readyToMove:readyToMove,
          details:true
        })
      })

     await router.push(`/upload/amenities/${id}`)
     setSaving(false)
      } catch (error) {
        console.log('eeroor....',error.message)
      }
    }


  return (
    <div> 
{/* <button onClick={()=>console.log(no)}>CLICK ME</button> */}
<div className="grid  grid-cols-2  gap-10">
        <TextField
          id="outlined-basic"
          label="Built Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={builtArea}
          type='number'
          onChange={(e)=>setBuiltArea(e.target.value)}
          error={nullBuiltArea && !builtArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Built Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={builtUnit}
            label=""
            required
          
            onChange={(e)=>setBuiltUnit(e.target.value)}
            error={nullBuiltUnit && !builtUnit? true : false}
          >
           
                <MenuItem value={'Sq-ft'} >
                Sq-ft
                </MenuItem>
                <MenuItem value={'Sq-m'} >
                Sq-m
                </MenuItem>
                <MenuItem value={'Sq-Yrd'} >
                Sq-Yrd
                </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid grid-cols-2  gap-10 mt-10">
        <TextField
          id="outlined-basic"
          label="Plot Area"
          variant="outlined"
          required
          style={{ width: "100%" }}
          value={plotArea}
          type='number'
          onChange={(e)=>setPlotArea(e.target.value)}
          error={nullPlotArea && !plotArea ? true : false}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Plot Area Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plotUnit}
            label=""
            required
            onChange={(e)=>setPlotUnit(e.target.value)}
            error={nullPlotUnit && !plotUnit ? true : false}
          >
           
           {measurement.map((a)=>{
            return(
<MenuItem value={a} key={a}>
               {a}
                </MenuItem>
            )
           })}
                
                <MenuItem value={'Sq-m'} >
                Sq-m
                </MenuItem>
                <MenuItem value={'Sq-Yrd'}>
                Sq-Yrd
                </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='mt-10 grid grid-cols-2 gap-10' >
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bedrooms</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bedrooms}
            label="Bedrooms"
            required
            onChange={(e)=>setBedrooms(e.target.value)}
            error={nullBedrooms && !bedrooms ? true :false}
          >
           
           {num.map((n)=>{
            if(n < 11){
              return(
<MenuItem key={n} value= {n} >
               {n}
                </MenuItem>
              )
            }
           })}
                
                    
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bathrooms</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bathrooms}
            label="Bathrooms"
            required
            onChange={handleBathrooms}
            error={nullBathrooms&& !bathrooms ? true : false}
          >
           
              
           {num.map((n)=>{
            if(n < 11){
              return(
<MenuItem key={n} value= {n} >
               {n}
                </MenuItem>
              )
            }
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
            label=""
            required
            onChange={handleYear}
            error={nullCyr && !cyr ? true : false}
          >
            <MenuItem  value='under construction'>
                 Under Construction
              
                </MenuItem>
           {year.map((y,i)=>{
            return(
<MenuItem  key={i} value={y} >
             {y}
                </MenuItem>
            )
           })}
                
                 
          </Select>
        </FormControl>
        

        <div className=''>
          <p className='text-gray-700'>Ready to move?</p>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="true"
            value={data? readyToMove : 'true'}
            name="radio-buttons-group"
            className="flex"
            onChange={(e) => setReadyToMove(e.target.value)}
            style={{ fontSize: "10px" }}
          >
     <div className="flex mt-2">
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
           
          
          
           
        </div>


       
      </div>
      <div className="mt-10">
        {/* <Link href="/"> */}
          <Button onClick={validateForm} style={{ float: "right", border: "1px solid blue" }}>
          {saving ? 'Saving...' :   "Save & Continue"}
          </Button>
        {/* </Link> */}
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${context.params.slug}`,{})   
  const t = await res.json()
 
  return { props: {dt:t} };

} 
