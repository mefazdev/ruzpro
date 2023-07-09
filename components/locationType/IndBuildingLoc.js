import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function IndBuildingLocationType({ id, data }) {
  const [withinIndBelt, setWithinIndBelt] = useState(Boolean);
  const [withinSpecialZone, setWithinSpecialZone] = useState(Boolean);
  const [withinCommArea, setWithinCommArea] = useState(Boolean);
  const [withinContainerAccess, setWithinContainerAccess] = useState(Boolean);
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
            // 'Content-type': 'text/plain',
          },
          body: JSON.stringify({
            locationType: {
              withinCommArea,
              withinCommArea,
              withinIndBelt: withinIndBelt,
              withinContainerAccess: withinContainerAccess,
              withinSpecialZone: withinSpecialZone,
              otherLocation: otherLocation,
            },
          }),
        }
      );

      await router.push(`/upload/images/${id}`);
      setSaving(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setWithinCommArea(data?.locationType?.withinCommArea);
    setWithinIndBelt(data?.locationType?.withinIndBelt);
    setWithinSpecialZone(data?.locationType?.withinSpecialZone);
    setWithinContainerAccess(data?.locationType?.withinContainerAccess);
    setOtherLocation(data?.locationType?.otherLocation);
  }, [data]);
  return (
    <div>
      <div className=" mt-5 lg:mt-7 grid lg:grid-cols-2 gap-4 lg:gap-10">
        <div>
          <h6>Within industrial belt</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withinIndBelt ? true : false}
                  onChange={() => setWithinIndBelt(!withinIndBelt)}
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
                  checked={withinSpecialZone ? true : false}
                  value={withinSpecialZone}
                  onChange={() => setWithinSpecialZone(!withinSpecialZone)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>
      <div className="mt-5 lg:mt-7 grid lg:grid-cols-2  gap-4 lg:gap-10">
        <div>
          <h6>Within commercial area</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withinCommArea ? true : false}
                  value={withinCommArea}
                  onChange={() => setWithinCommArea(!withinCommArea)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
        <div>
          <h6>Within container access</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withinContainerAccess ? true : false}
                  value={withinContainerAccess}
                  onChange={() =>
                    setWithinContainerAccess(!withinContainerAccess)
                  }
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

      <div className="mt-6 lg:mt-10">
        <Button
          onClick={addLocType}
          style={{ float: "right", border: "1px solid blue" }}
        >
          {saving ? "Saving..." : " Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
