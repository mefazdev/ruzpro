import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function CommercialOfficeLocationType({ id }) {
  const [withinOfficeComplex, setWithinOfficeComplex] = useState(Boolean);
  const [withinShoppingMall, setWithinShoppingMall] = useState(Boolean);
  const [otherLocationType, setOtherLocationType] = useState("");

  const router = useRouter();
  const addLocationType = async () => {
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
              withinIndiLocation: withinIndiLocation,
              withinOfficeComplex: withinOfficeComplex,
              withinShoppingMall: withinShoppingMall,
              otherLocationType: otherLocationType,
            },
          }),
        }
      );

      router.push(`/upload/images/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className=" mt-7 grid grid-cols-2 gap-10">
        <div>
          <h6>Within office complex</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setWithinOfficeComplex(!withinOfficeComplex)}
                  value={withinOfficeComplex}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>

        <div>
          <h6>Within Shopping mall</h6>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setWithinShoppingMall(!withinShoppingMall)}
                  value={withinShoppingMall}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>
      <div className=" mt-7 grid grid-cols-2 gap-10">
        <div>
          <h6>Within indipendent location</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={withinIndiLocation}
                  onChange={() => setWithinIndiLocation(!withinIndiLocation)}
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
            value={otherLocationType}
            onChange={(e) => setOtherLocationType(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-10">
        <Button
          onClick={addLocationType}
          style={{ float: "right", border: "1px solid blue" }}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
