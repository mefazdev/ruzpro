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

export default function CommercialShopLocationType({ id, data }) {
  const [withinIndiLocation, setWithinIndiLocation] = useState(Boolean);
  const [withinOfficeComplex, setWithinOfficeComplex] = useState(Boolean);
  const [withinShoppingMall, setWithinShoppingMall] = useState(Boolean);
  const [withinContainerAccess, setWithinContainerAccess] = useState(Boolean);
  const [otherLocationType, setOtherLocationType] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const addLocationType = async () => {
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
              withinIndiLocation: withinIndiLocation,
              withinOfficeComplex: withinOfficeComplex,
              withinShoppingMall: withinShoppingMall,
              withinContainerAccess: withinContainerAccess,
              otherLocationType: otherLocationType,
            },
          }),
        }
      );

      router.push(`/upload/images/${id}`);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      Alert("An error occurred!. Try again");
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="mt-5 lg:mt-7 grid lg:grid-cols-2 gap-6 lg:gap-10">
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

        {data?.propType === "commercial shopp" ? (
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
        ) : (
          ""
        )}

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
        {data?.propType == "commercial other" ? (
          <div>
            <h6>Within container access</h6>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={withinIndiLocation}
                    onChange={() =>
                      setWithinContainerAccess(!withinContainerAccess)
                    }
                  />
                }
                label="Yes"
              />
            </FormGroup>
          </div>
        ) : (
          ""
        )}

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
      <div className="mt-6 lg:mt-10">
        <Button
          onClick={addLocationType}
          style={{ float: "right", border: "1px solid blue" }}
          disabled={saving ? true : false}
        >
          {saving ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
