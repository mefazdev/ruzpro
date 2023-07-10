import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

export default function CommercialLandNearby({data}) {
  const [nearShoppingArea, setNearShoppingArea] = useState(Boolean);
  const [nearResidentialArea, setNearResidentialArea] = useState(Boolean);
  const [nearCommercialArea, setNearCommercialArea] = useState(Boolean);
  const [nearTourismZone, setNearTourismZone] = useState(Boolean);
  const [other, setOther] = useState("");
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const id = router.query.slug;

  useEffect(() => {
    setNearShoppingArea(data?.nearby?.nearShoppingArea)
    setNearCommercialArea(data?.nearby?.nearCommercialArea)
setNearResidentialArea(data?.nearby?.nearResidentialArea)
setNearTourismZone(data?.nearby?.nearTourismZone)
  }, [data]);

  
  const addNearBy = async () => {
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
            nearby: {
              nearCommercialArea: nearCommercialArea,
              nearResidentialArea: nearResidentialArea,
              nearShoppingArea: nearShoppingArea,

              nearTourismZone: nearTourismZone,
              other: other,
            },
          }),
        }
      );

      await router.push(`/upload/images/${id}`);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      alert("An error occurred!. Try again");
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="mt-5 lg:mt-7 grid grid-cols-2  gap-3 lg:gap-10">
        <div>
          <h6>Near shopping area</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={nearShoppingArea}
                  onChange={() => setNearShoppingArea(!nearShoppingArea)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>

        <div>
          <h6>Near residential area</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={nearResidentialArea}
                  onChange={() => setNearResidentialArea(!nearResidentialArea)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>
      <div className="mt-5 lg:mt-7 grid grid-cols-2  gap-3 lg:gap-10">
        <div>
          <h6>Near commercial area</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={nearCommercialArea}
                  onChange={() => setNearCommercialArea(!nearCommercialArea)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
        <div>
          <h6>Near tourism zone</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={nearTourismZone}
                  onChange={() => setNearTourismZone(!nearTourismZone)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>
      <div className="mt-5 lg:mt-7 grid lg:grid-cols-2  gap-3 lg:gap-10">
        <div>
          <TextField
            id="outlined-basic"
            label="Other location"
            variant="outlined"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-10">
        <Button
          onClick={addNearBy}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true : false}
        >
          {saving ? "Saveing..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
