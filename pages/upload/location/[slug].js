import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import Navbar from "../../../components/Navbar";
import { cities } from "../../../assets/data/city";
import { districts } from "../../../assets/data/districts";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";

export default function Location() {
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [locality, setLocality] = useState("");
  const [street, setStreet] = useState("");
  const [distIndex, setDistIndex] = useState(null);
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [nullDist, setNullDist] = useState(false);
  const [nullTown, setNullTown] = useState(false);
  const [nullLocality, setNullLocality] = useState(false);
  const router = useRouter();
  const id = router.query.slug;

  const handleDist = async (e) => {
    setDistIndex(e);
  };

  const validateForm = () => {
    if (district) {
      if (town) {
        if (locality) {
          addLocation();
        } else {
          setNullLocality(true);
        }
      } else {
        setNullTown(true);
      }
    } else {
      setNullDist(true);
    }
  };
  const addLocation = async () => {
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
            state: "Kerala",
            district: district,
            town: town,
            locality: locality,
            street: street,
          }),
        }
      );

      router.push(`/upload/profile/${id}`);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      alert("An erro occurred!. Try again");
      console.log(error.message);
    }
  };

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
      setDistrict(data.district);
      setTown(data.town);
      setLocality(data.locality);
      setStreet(data.street);

      console.log(data.district);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProperty();
  }, [id]);
  return (
    <div className="pb-14">
      <Navbar />
      <div className="upload pt-5 pb-20 grid gap-4 lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100 ">
            <h4>Location</h4>
          </div>

          <div>
            <div className=" mt-5 md:mt-7 grid md:grid-cols-2 gap-10">
              <div>
                <FormControl fullWidth className="h-10">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    value="India"
                  >
                    <MenuItem value={"India"}>India</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="State"
                    value="Kerala"
                  >
                    <MenuItem value={"Kerala"}>Kerala</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className=" mt-7 grid md:grid-cols-2 gap-10">
              <div>
                <FormControl fullWidth className="h-10">
                  <TextField
                    fullWidth
                    id="country-code-select"
                    select
                    label="District"
                    value={district}
                    required
                    error={nullDist && district == null ? true : false}
                    onChange={(e) => setDistrict(e.target.value)}
                    SelectProps={{
                      renderValue: (value) => value,
                    }}
                  >
                    {districts.map((option, i) => (
                      <MenuItem
                        key={i}
                        value={option}
                        onClick={(e) => handleDist(i)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="country-code-select"
                    select
                    label="Town"
                    value={town}
                    error={nullTown && town == null ? true : false}
                    required
                    onChange={(e) => setTown(e.target.value)}
                    SelectProps={{
                      renderValue: (value) => value,
                    }}
                  >
                    {distIndex == null ? (
                      <MenuItem disabled>Please select a district</MenuItem>
                    ) : (
                      cities[distIndex]?.towns.map((option, i) => (
                        <MenuItem
                          key={i}
                          value={option}
                          onClick={(e) => setTown(e.target.value)}
                        >
                          {option}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </FormControl>
              </div>
            </div>

            <div className=" mt-7 grid md:grid-cols-2 gap-10">
              {/* <div>
              
                <FormControl fullWidth className="h-10">
                  <InputLabel id="demo-simple-select-label">
                    Locality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>India</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              <div>
                <TextField
                  id="outlined-basic"
                  label="Locality"
                  variant="outlined"
                  required
                  value={locality}
                  error={nullLocality && locality == null ? true : false}
                  onChange={(e) => setLocality(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                {/* <TextField
                    id="outlined-basic"
                    label="Landmark"
                    variant="outlined"
                    required
                    value={landMark}
                    onChange={(e) => setLandMark(e.target.value)}
                    style={{ width: "100%" }}
                  /> */}
              </div>
            </div>
          </div>

          <div className="lg:mt-4">
            <Button
              onClick={validateForm}
              disabled={saving ? true : false}
              style={{ float: "right", border: "1px solid blue" }}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property/${context.params.slug}`,{})
//   const t = await res.json()

//   return { props: {dt:t} };

// }
