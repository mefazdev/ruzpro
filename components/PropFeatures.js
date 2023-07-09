import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import NoCrashOutlinedIcon from "@mui/icons-material/NoCrashOutlined";

export default function PropFeatures({ data }) {
  return ( 
    <div className="mt-5 md:mt-10">
      <h4 className="text-lg lg:text-xl text-gray-800">Amenities</h4>
      <div className="grid   lg:grid-cols-4 md:grid-cols-3 gap-2  md:gap-3 lg:gap-5 mt-2 ">
        {data?.amenities?.electricity === true ? (
          <div className="amin__box bg-gray-50">
            <ElectricBoltIcon />
            <p>Electricity backup</p>
          </div>
        ) : (
          ""
        )}

{data?.amenities?.lift === true ? <div className="amin__box bg-gray-50">
          <AdUnitsIcon />
          <p>Lift</p>
        </div> : ''}
        
       {data?.amenities?.healthClub === true ? <div className="amin__box bg-gray-50">
          <MedicalInformationOutlinedIcon />
          <p>Health club</p>
        </div> : ''}
        

        {data?.amenities?.clubHouse === true ? <div className="amin__box bg-gray-50">
          <MeetingRoomOutlinedIcon />
          <p>Club house</p>
        </div>:''}
        
       {data?.amenities?.pool === true ? <div className="amin__box bg-gray-50">
          <PoolOutlinedIcon />
          <p>Swimming pool</p>
        </div> :  ''}
        
        {data?.amenities?.joggingTrack === true ? <div className="amin__box bg-gray-50">
          <ListOutlinedIcon />
          <p>Jogging track</p>
        </div> : ''}
        
        {data?.amenities?.shoppingArea === true ? <div className="amin__box bg-gray-50">
          <ShoppingCartOutlinedIcon />
          <p>Shopping area</p>
        </div> :  ''}
        
        {data?.amenities?.security === true ? <div className="amin__box bg-gray-50">
          <SecurityOutlinedIcon />
          <p>Security</p>
        </div> : ''}
        
        {data?.amenities?.laundary === true ? <div className="amin__box bg-gray-50">
          <LocalLaundryServiceOutlinedIcon />
          <p>Laundary service</p>
        </div> : ''}
        

{data?.amenities?.waterStorage === true ? <div className="amin__box bg-gray-50">
          <OpacityOutlinedIcon />
          <p>Water storage</p>
        </div> : ''}

        {data?.amenities?.playArea === true ? <div className="amin__box bg-gray-50">
          <SportsTennisOutlinedIcon />
          <p> Children&apos;s play area</p>
        </div>:''}
        
        {data?.amenities?.serventBathroom === true ? <div className="amin__box bg-gray-50">
          <ShowerOutlinedIcon />
          <p>Servent&apos;s bathroom</p>
        </div> : ''}
        
        {data?.amenities?.auditorium === true ? <div className="amin__box bg-gray-50">
          <HolidayVillageOutlinedIcon />
          <p>Auditorium</p>
        </div> :''}
        
        {data?.amenities?.gas === true ? <div className="amin__box bg-gray-50">
          <OilBarrelIcon />
          <p>Centralized gas</p>
        </div> :''}
        {data?.amenities?.visiterParking === true ? <div className="amin__box bg-gray-50">
          <LocalParkingIcon />
          <p>Visiter&apos;s parking</p>
        </div> : ''}
        
        {data?.amenities?.gymnasium === true ? <div className="amin__box bg-gray-50">
          <FitnessCenterOutlinedIcon />
          <p>Gymnasium</p>
        </div> : ''}
        
        {data?.amenities?.wasteDisposal === true ? <div className="amin__box bg-gray-50">
          <WebhookOutlinedIcon />
          <p>Waste disposal</p>
        </div> : ''}
        
        {data?.amenities?.reservedParking === true ? <div className="amin__box bg-gray-50">
          <NoCrashOutlinedIcon />
          <p>Reserved parking</p>
        </div> : ''}
        
      </div>
    </div>  
  );
}
