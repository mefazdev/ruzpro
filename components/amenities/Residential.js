import { Button } from "@mui/material";
import React, { useEffect } from "react";
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
import { useState } from "react";

import { useRouter } from "next/router";
export default function ResidentialAmenities({ data, id }) {
  const [electricity, setElectricity] = useState(false);
  const [lift, setLift] = useState(false);
  const [healthClub, setHealthClub] = useState(false);
  const [clubHouse, setClubHouse] = useState(false);
  const [pool, setPool] = useState(false);
  const [joggingTrack, setJoggingTrack] = useState(false);
  const [shoppingArea, setShoppingArea] = useState(false);
  const [security, setSecurity] = useState(false);
  const [laundary, setLaundary] = useState(false);
  const [waterStorage, setWaterStorage] = useState(false);
  const [playarea, setPlayarea] = useState(false);
  const [serventBathroom, setServentBathroom] = useState(false);
  const [auditorium, setAuditorium] = useState(false);
  const [gas, setGas] = useState(false);
  const [visiterParking, setVisiterParking] = useState(false);
  const [gymnasium, setGymnasium] = useState(false);
  const [wasteDisposal, setWasteDisposal] = useState(false);
  const [reservedParking, setReservedParking] = useState(false);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const addAmneties = async () => {
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
            amenities: {
              electricity,
              lift,
              healthClub,
              clubHouse,
              pool,
              joggingTrack,
              shoppingArea,
              security,
              laundary,
              waterStorage,
              playarea,
              serventBathroom,
              auditorium,
              gas,
              visiterParking,
              gymnasium,
              wasteDisposal,
              reservedParking,
            },
          }),
        }
      );

      router.push(`/upload/distance/${id}`);
      setSaving(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setElectricity(data?.amenities?.electricity);
    setPool(data?.amenities?.pool);
    setLift(data?.amenities?.lift);
    setHealthClub(data?.amenities?.healthClub);
    setClubHouse(data?.amenities?.clubHouse);
    setJoggingTrack(data?.amenities?.joggingTrack);
    setShoppingArea(data.amenities?.shoppingArea);
    setSecurity(data?.amenities?.security);
    setLaundary(data?.amenities?.laundary);
    setWaterStorage(data?.amenities?.waterStorage);
    setPlayarea(data?.amenities?.playarea);
    setServentBathroom(data?.amenities?.serventBathroom);
    setAuditorium(data?.amenities?.auditorium);
    setGas(data?.amenities?.gas);
    setVisiterParking(data?.amenities?.visiterParking);
    setGymnasium(data?.amenities?.gymnasium);
    setWasteDisposal(data?.amenities?.wasteDisposal);
    setReservedParking(data?.amenities?.reservedParking);
  }, [data.amenities]);
  return (
    <div className="lg:col-span-4">
      <div className=" mt-5 lg:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
        <div
          onClick={() => setElectricity(!electricity)}
          className={electricity ? "amin__box__active" : "amin__box"}
        >
          <ElectricBoltIcon />
          <p>Electricity backup</p>
        </div>
        <div
          className={lift ? "amin__box__active" : "amin__box"}
          onClick={() => setLift(!lift)}
        >
          <AdUnitsIcon />
          <p>Lift</p>
        </div>
        <div
          className={healthClub ? "amin__box__active" : "amin__box"}
          onClick={() => setHealthClub(!healthClub)}
        >
          <MedicalInformationOutlinedIcon />
          <p>Health club</p>
        </div>
        <div
          className={clubHouse ? "amin__box__active" : "amin__box"}
          onClick={() => setClubHouse(!clubHouse)}
        >
          <MeetingRoomOutlinedIcon />
          <p>Club house</p>
        </div>
        <div
          className={pool ? "amin__box__active" : "amin__box"}
          onClick={() => setPool(!pool)}
        >
          <PoolOutlinedIcon />
          <p>Swimming pool</p>
        </div>
        <div
          className={joggingTrack ? "amin__box__active" : "amin__box"}
          onClick={() => setJoggingTrack(!joggingTrack)}
        >
          <ListOutlinedIcon />
          <p>Jogging track</p>
        </div>
        <div
          className={shoppingArea ? "amin__box__active" : "amin__box"}
          onClick={() => setShoppingArea(!shoppingArea)}
        >
          <ShoppingCartOutlinedIcon />
          <p>Shopping area</p>
        </div>
        <div
          className={security ? "amin__box__active" : "amin__box"}
          onClick={() => setSecurity(!security)}
        >
          <SecurityOutlinedIcon />
          <p>Security</p>
        </div>
        <div
          className={laundary ? "amin__box__active" : "amin__box"}
          onClick={() => setLaundary(!laundary)}
        >
          <LocalLaundryServiceOutlinedIcon />
          <p>Laundary service</p>
        </div>
        <div
          className={waterStorage ? "amin__box__active" : "amin__box"}
          onClick={() => setWaterStorage(!waterStorage)}
        >
          <OpacityOutlinedIcon />
          <p>Water storage</p>
        </div>
        <div
          className={playarea ? "amin__box__active" : "amin__box"}
          onClick={() => setPlayarea(!playarea)}
        >
          <SportsTennisOutlinedIcon />
          <p> Children&apos;s play area</p>
        </div>
        <div
          className={serventBathroom ? "amin__box__active" : "amin__box"}
          onClick={() => setServentBathroom(!serventBathroom)}
        >
          <ShowerOutlinedIcon />
          <p>Servent&apos;s bathroom</p>
        </div>
        <div
          className={auditorium ? "amin__box__active" : "amin__box"}
          onClick={() => setAuditorium(!auditorium)}
        >
          <HolidayVillageOutlinedIcon />
          <p>Auditorium</p>
        </div>
        <div
          className={gas ? "amin__box__active" : "amin__box"}
          onClick={() => setGas(!gas)}
        >
          <OilBarrelIcon />
          <p>Centralized gas</p>
        </div>
        <div
          className={visiterParking ? "amin__box__active" : "amin__box"}
          onClick={() => setVisiterParking(!visiterParking)}
        >
          <LocalParkingIcon />
          <p>Visiter&apos;s parking</p>
        </div>
        <div
          className={gymnasium ? "amin__box__active" : "amin__box"}
          onClick={() => setGymnasium(!gymnasium)}
        >
          <FitnessCenterOutlinedIcon />
          <p>Gymnasium</p>
        </div>
        <div
          className={wasteDisposal ? "amin__box__active" : "amin__box"}
          onClick={() => setWasteDisposal(!wasteDisposal)}
        >
          <WebhookOutlinedIcon />
          <p>Waste disposal</p>
        </div>
        <div
          className={reservedParking ? "amin__box__active" : "amin__box"}
          onClick={() => setReservedParking(!reservedParking)}
        >
          <NoCrashOutlinedIcon />
          <p>Reserved parking</p>
        </div>
      </div>

      <div className="mt-3">
        <Button
          onClick={addAmneties}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true : false}
        >
          {saving ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
