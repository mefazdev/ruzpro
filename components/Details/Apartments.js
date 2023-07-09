import { FlipToFrontRounded } from '@mui/icons-material'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Apartments({data}) {
     const [num,setNum] = useState([])
     const [year,setYear] = useState([])
     const [cyr,setCyr] = useState('')
     const [bathrooms,setBathrooms] = useState('')
     const [totalFloors,setTotalFloors] = useState('')
     const [bedrooms,setBedrooms] = useState('')
     const [builtArea,setBuiltArea] = useState('')
     const [builtUnit,setBuiltUnit]  = useState('')
     const [floorNo,setFloorNo] = useState('')
     const [readyToMove,setReadyToMove] = useState(Boolean)

    const [nullBuiltArea,setNullBuiltArea] = useState(false)
    const [nullBuiltUnit,setNullBuiltUnit] = useState(false)
    const [nullBedrooms,setNullBedrooms] = useState(false)
    
    const [nullBathrooms,setNullBathrooms] = useState(false)
    
    const [nullFloorNo,setNullFloorNo] = useState(false)
    
    const [nullTotalFloor,setNullTotalFloor] = useState(false)
    
    const [nullCyr,setNullCyr] = useState(false)
    
    const [nullReadyMove,setNullReadyMove] = useState(false)
const [saving, setSaving] = useState(false)

    const validateForm = ()=>{
      if(builtArea){
        if(builtUnit){
         if(bedrooms){
          if(bathrooms){
if(floorNo){
if(totalFloors){
if(cyr){
if(readyToMove){
  addDeatails()
}
}else{
  setNullCyr(true)
}
}else{
  setNullTotalFloor(true)
}
}else{
  setNullFloorNo(true)
}
          }else{
            setNullBathrooms(true)
          }
         }else{
          setNullBedrooms(true)
         }
        }else{
          setNullBuiltUnit(true)
        }
      }else{
        setNullBuiltArea(true)
      }
    }

     const router =  useRouter()
     const id = router.query.slug
    // const [no,setNo] = useState([])
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
      for (let i  = 1950; i<2023; i++){
        y = [...y,i]
      }
      setYear(y)
    }

    useEffect(()=>{
      
        count()
      initYears()
        
    },[])

    const handleChange = (event) => {
      setBedrooms(event.target.value);
     
    };
    const handleYear = (event) => {
      setCyr(event.target.value);
     
    };
    const handleBathrooms = (e) =>{
      setBathrooms(e.target.value)
    }


    const addDeatails  = async()=>{
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
            constructedYear:cyr,
            builtArea:builtArea,
            builtUnit:builtUnit,
            floorNo:floorNo,
            totalFloors:totalFloors,
            bedrooms:bedrooms,
            bathrooms:bathrooms,
            readyToMove:readyToMove,
            details:true
          })
        })
await router.push(`/upload/amenities/${id}`)
setSaving(false)
      } catch (error) {
        console.log(error.meassage)
      }
    }
    useEffect(()=>{
      setBuiltArea(data?.builtArea)
      setBuiltUnit(data?.builtUnit)
setBedrooms(data?.bedrooms)
setBathrooms(data?.bathrooms)
setTotalFloors(data?.totalFloors)
setFloorNo(data?.floorNo)
setCyr(data?.constructedYear)
setReadyToMove(data?.readyToMove)
    },[data])
  return (
    <div> 
{/* <button onClick={()=>console.log(data.readyToMove)}>CLICK ME</button> */}
<div className="grid lg:grid-cols-2  gap-4 md:gap-10">
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
        <TextField
                    fullWidth
                      id="country-code-select"
                      select
                      label="Bulit area unit"
                      value={builtUnit}
                      displayEmpty
                      onChange={(e) => setBuiltUnit(e.target.value)}
                       
                      SelectProps={{
                        renderValue: (value) => value,
                      }}
                      error={nullBuiltUnit && !builtUnit ? true : false}
                    >
<MenuItem value={'Sq-ft'}  >
                Sq-ft
                </MenuItem>
                <MenuItem value={'Sq-m'}  >
                Sq-m
                </MenuItem>
                <MenuItem value={'Sq-Yrd'}  >
                Sq-Yrd
                </MenuItem>
                    </TextField>
       
        </FormControl>
      </div>

      <div className=' mt-4 lg:mt-10 grid md:grid-cols-2  gap-4 md:gap-10' >
      <FormControl fullWidth>
      <TextField
                    fullWidth
                      id="country-code-select"
                      select
                      label="Bedrooms"
                      value={bedrooms}
                      displayEmpty
                      onChange={handleChange}
                      SelectProps={{
                        renderValue: (value) => value,
                      }}
                      error={nullBedrooms && !bedrooms? true : false}
                      type='number'
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
                 
                    </TextField>
          {/* <InputLabel id="demo-simple-select-label">Bedrooms</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bedrooms}
            label="Age"
            required
            onChange={handleChange}
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
                
                    
          </Select> */}
        </FormControl>
        <FormControl fullWidth>

        <TextField
                    fullWidth
                      id="country-code-select"
                      select
                      label="Bathrooms"
                      value={bathrooms}
                      displayEmpty
                      onChange={handleBathrooms}
                      error={nullBathrooms && !bathrooms ? true : false}   SelectProps={{
                        renderValue: (value) => value,
                      }}
                      type='number'
                    >
{num.map((n,i)=>{
            if(n < 11){
              return(
<MenuItem key={n} value= {n} >
               {n}
                </MenuItem>
              )
            }
           })}
                 
                    </TextField>
        
        </FormControl>
      </div>

      <div className="grid md:grid-cols-2 mt-4 gap-4  md:gap-10 lg:mt-10">
      <FormControl fullWidth>
      <TextField
                    fullWidth
                      id="country-code-select"
                      select
                      label="Floor no"
                      value={floorNo}
                      displayEmpty
                      onChange={(e)=>setFloorNo(e.target.value)}
                      SelectProps={{
                        renderValue: (value) => value,
                      }}
                      error={nullFloorNo && !floorNo ? true : false}
                      type='number'
                    >
{num.map((no)=>{
                return(
<MenuItem  key={no}   value={no}>
                
              {no}
                </MenuItem>
                )
             })}
                 
                    </TextField>
         
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Total floors</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={totalFloors}
            label="Total floors"
            required
 
            onChange={(e)=>setTotalFloors(e.target.value)}
            error={nullTotalFloor && !totalFloors  || floorNo > totalFloors  ? true : false}
            type='number'
          >

            {num.map((no)=>{
                return(
<MenuItem  key={no}   value={no}>
                
              {no}
                </MenuItem>
                )
             })}
             
           
                
                
          </Select>
        </FormControl>
      </div>
      <div className="grid md:grid-cols-2 gap-4  md:gap-10 mt-4 lg:mt-10">
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Constructed Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cyr}
            label="Constructed year"
            required
            onChange={handleYear}
            error={nullCyr && !cyr ? true : false}
            type='number'
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
        

        <div >
          <p className='text-gray-700'>Ready to move?</p>
          <FormControl>   <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={true}
                name="radio-buttons-group"
                className="flex"
               value={readyToMove}
                onChange={(e) => setReadyToMove(e.target.value)}
                style={{fontSize:'10px'}}
                 
              >
          <div className='flex'>
            <div className='flex items-center' >
            <FormControlLabel
                      value={true}
                      control={<Radio color="default" />}
                      label="Yes"
                    
                    
                    />
            </div>
            <div className='flex items-center ml-4'>
            <FormControlLabel
                      value={false}
                      control={<Radio color="default" />}
                      label="No"
                     
                    />
          </div>
          </div>
          </RadioGroup></FormControl>
        
          
           
        </div>


       
      </div>
      <div className="mt-10">
        {/* <Link href="/"> */}
          <Button 
          disabled={saving ? true :false}
          onClick={validateForm} style={{ float: "right", border: "1px solid blue" }}>
           {saving ? "Saving..." : ' Save & Continue'}
          </Button>
        {/* </Link> */}
      </div>
    </div>
  )
}


{/* <InputLabel id="demo-simple-select-label">Built Area Unit</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={builtUnit}
  label="Age"
  required
  onChange={(e)=>setBuiltUnit(e.target.value)}
>
 
      <MenuItem value={'Sq-ft'}  >
      Sq-ft
      </MenuItem>
      <MenuItem value={'Sq-m'}  >
      Sq-m
      </MenuItem>
      <MenuItem value={'Sq-Yrd'}  >
      Sq-Yrd
      </MenuItem>
</Select> */}

 
