import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function IndustrialLocationType({ id, data }) {
  const [withinIndBelt, setWithinIndBelt] = useState(Boolean);
  const [withinSpecialZone, setWithinSpecialZone] = useState(Boolean);
  const [withinCommArea, setWithinCommArea] = useState(Boolean);
  const [otherLocation, setOtherLocation] = useState("");
  const [saving, setSaving] = useState(Boolean);

  const router = useRouter();
  const addLocType = async () => {
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locationType: {
              withinCommArea,
              withinCommArea,
              withinIndBelt: withinIndBelt,

              withinSpecialZone: withinSpecialZone,
              otherLocation: otherLocation,
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

  useEffect(() => {
    setWithinCommArea(data?.locationType?.withinCommArea);
    setWithinIndBelt(data?.locationType?.withinIndBelt);
    setWithinSpecialZone(data?.locationType?.withinSpecialZone);
    setOtherLocation(data?.locationType?.otherLocation);
  }, [data]);

  return (
    <div>
      <div className=" mt-7 grid lg:grid-cols-2 gap-4 lg:gap-10">
        <div>
          <h6>Within industrial belt</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={withinIndBelt}
                  onChange={() => setWithinIndBelt(!withinIndBelt)}
                  checked={withinIndBelt ? true : false}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>

        <div>
          <h6>Within special zone</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={withinSpecialZone}
                  onChange={() => setWithinSpecialZone(!withinSpecialZone)}
                  checked={withinSpecialZone ? true : false}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>
      <div className="mt-4 lg:mt-7 grid lg:grid-cols-2 gap-4 lg:gap-10">
        <div>
          <h6>Within commercial area</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={withinCommArea}
                  onChange={() => setWithinCommArea(!withinCommArea)}
                  checked={withinCommArea ? true : false}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Other location"
            variant="outlined"
            required
            style={{ width: "100%" }}
            value={otherLocation}
            onChange={(e) => setOtherLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 lg:mt-10">
        <Button
          onClick={addLocType}
          disabled={saving ? true : false}
          style={{ float: "right", border: "1px solid blue" }}
        >
          {saving ? "Saving" : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
