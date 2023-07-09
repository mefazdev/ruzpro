import { Button } from "@mui/material";
import React, { useEffect } from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import NoCrashOutlinedIcon from "@mui/icons-material/NoCrashOutlined";
import { useState } from "react";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import HvacOutlinedIcon from "@mui/icons-material/HvacOutlined";
import { useRouter } from "next/router";

export default function CommercialAmenities({ data, id }) {
  const [electricity, setElectricity] = useState(false);
  const [lift, setLift] = useState(false);
  const [security, setSecurity] = useState(false);
  const [ac, setAc] = useState(false);
  const [waterStorage, setWaterStorage] = useState(false);
  const [houseKeeping, setHouseKeeping] = useState(false);
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
              security,
              waterStorage,
              reservedParking,
              ac,
              houseKeeping,
            },
          }),
        }
      );

      if (
        data?.propType === "commercial shop" ||
        data?.propType === "commercial other" ||
        data?.propType === "commercial office"
      ) {
        router.push(`/upload/locationType/${id}`);
        setSaving(false);
      } else {
        router.push(`/upload/distance/${id}`);
        setSaving(false);
      }
    } catch (error) {
      setSaving(false);
      Alert("An error occurred!. Try again");
      console.log(error.message);
    }
  };

  useEffect(() => {
    setElectricity(data?.amenities?.electricity);
    setLift(data?.amenities?.lift);
    setSecurity(data?.amenities?.security);
    setAc(data?.amenities?.ac);
    setWaterStorage(data?.amenities?.waterStorage);
    setHouseKeeping(data?.amenities?.houseKeeping);
    setReservedParking(data?.amenities?.reservedParking);
  }, [data]);
  return (
    <div>
      <div className=" mt-5 lg:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
        <div
          onClick={() => setElectricity(!electricity)}
          className={electricity ? "amin__box__active" : "amin__box"}
        >
          {electricity ? <DoneOutlinedIcon /> : <ElectricBoltIcon />}

          <p>Electricity backup</p>
        </div>
        <div
          className={lift ? "amin__box__active" : "amin__box"}
          onClick={() => setLift(!lift)}
        >
          {lift ? <DoneOutlinedIcon /> : <AdUnitsIcon />}

          <p>Lift</p>
        </div>
        <div
          className={security ? "amin__box__active" : "amin__box"}
          onClick={() => setSecurity(!security)}
        >
          {security ? <DoneOutlinedIcon /> : <SecurityOutlinedIcon />}

          <p>Security</p>
        </div>

        <div
          className={waterStorage ? "amin__box__active" : "amin__box"}
          onClick={() => setWaterStorage(!waterStorage)}
        >
          {waterStorage ? <DoneOutlinedIcon /> : <OpacityOutlinedIcon />}

          <p>Water storage</p>
        </div>

        <div
          className={reservedParking ? "amin__box__active" : "amin__box"}
          onClick={() => setReservedParking(!reservedParking)}
        >
          {reservedParking ? <DoneOutlinedIcon /> : <NoCrashOutlinedIcon />}

          <p>Reserved parking</p>
        </div>
        <div
          className={houseKeeping ? "amin__box__active" : "amin__box"}
          onClick={() => setHouseKeeping(!houseKeeping)}
        >
          {houseKeeping ? (
            <DoneOutlinedIcon />
          ) : (
            <CleaningServicesOutlinedIcon />
          )}

          <p>House keeping</p>
        </div>
        <div
          className={ac ? "amin__box__active" : "amin__box"}
          onClick={() => setAc(!ac)}
        >
          {ac ? <DoneOutlinedIcon /> : <HvacOutlinedIcon />}

          <p>Air contitioned</p>
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
