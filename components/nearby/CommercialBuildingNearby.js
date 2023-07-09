import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function CommercialBuildingNearby() {
  const [nearContainerAccess, setNearContainerAccess] = useState(Boolean);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const id = router.query.slug;
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
            nearContainerAccess: nearContainerAccess,
          }),
        }
      );
      await router.push(`/upload/images/${id}`);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      alert("An error occurred!. Try again");
      console.log("Error...", error.message);
    }
  };
  return (
    <div>
      <div className=" mt-5 lg:mt-7 grid lg:grid-cols-2 gap-4 lg:gap-10">
        <div>
          <h6>Near container access</h6>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={nearContainerAccess}
                  onChange={() => setNearContainerAccess(!nearContainerAccess)}
                />
              }
              label="Yes"
            />
          </FormGroup>
        </div>
      </div>

      <div className="mt-1 lg:mt-10">
        <Button
          onClick={addNearBy}
          style={{ float: "right", border: "1px solid blue" }}
        >
          {saving ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  );
}
