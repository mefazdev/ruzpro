import React, { useEffect, useState } from "react";
import { price } from "../../../assets/data/price";
import Radio from "@mui/material/Radio";
import { Button, FormControlLabel, RadioGroup } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import { auth } from "../../../firebase";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
import { rentPrice } from "../../../assets/data/rentPrice";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";

export default function BasicInfo() {
  const [propType, setPropType] = useState("");
  const [trType, setTrType] = useState("");
  const [ownership, setOwnerShip] = useState("");
  const [rate, setRate] = useState({});
  const [disPrice, setDisPrice] = useState(Boolean);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({});

  const router = useRouter();
  const id = router.query.slug;

  const propTypes = [
    "Residential Apartments",
    "Residential House-Villa",
    "Residential Land",
    "Residential Other",
    "Commercial Shop",
    "Commercial Office",
    "Commercial Land",
    "Commercial Building",
    "Commercial Other",
    "Industrial Building",
    "Industrial Land",
    "Agricultural Land",
  ];

  const handleSubmit = async () => {
    setSaving(true);
    onAuthStateChanged(auth, (currentUser) => {
      const uid = currentUser.uid;

      editBasicInfo(uid);
    });
  };
  const [nullPrice, setNullPrice] = useState(false);
  const [nullDesc, setNullDesc] = useState(false);

  const validate = () => {
    if (rate) {
      if (description?.length) {
        handleSubmit();
      } else {
        setNullDesc(true);
      }
    } else {
      setNullPrice(true);
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

      setPropType(data.propType);
      setTrType(data.transType);
      setRate(data?.price);
      setDisPrice(data.displayPrice);
      setOwnerShip(data.ownership);
      setDescription(data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const editBasicInfo = async () => {
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
            transType: trType,
            ownership: ownership,
            price: rate,
            displayPrice: disPrice,
            description: description,
          }),
        }
      );

      router.push(`/upload/location/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProperty();
  }, [id]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setDescription(description + "breakLine");
    }
  };

  const handleRate = (e) => {
    const p = JSON.parse(e.target.value);

    setRate(p);
  };
  return (
    <div className="pb-20">
      <Navbar />

      <div className="upload pt-5 grid lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />

        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100 mt-3 lg:mt-0">
            <h4 style={{ fontSize: "20px" }}>Basic Info</h4>
          </div>

          <div className="basic__prop__type">
            <div className="basic__prop__type__head mt-5">
              <p>
                Property Type <span className="text-red-500">*</span>
              </p>
            </div>

            <div className="upload__row pb-6">
              <div className="basic__prop__type__row   grid  gap-5 lg:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {propTypes.map((t, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        propType === t.toLowerCase()
                          ? "basic__prop__box__active bg-gray-100"
                          : "basic__prop__box bg-gray-100"
                      }
                    >
                      <h4>
                        {t === "Residential House-Villa"
                          ? "Residential House/Villa"
                          : t}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="upload__row pb-3 grid lg:grid-cols-2 mt-5  ">
              <div>
                <h6 className="bg-gray-100 p-2 lg:bg-inherit lg:p-0">
                  Transaction Type <span style={{ color: "red" }}>*</span>
                </h6>
                {trType.length ? (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={trType}
                    name="radio-buttons-group"
                    className="flex"
                    onChange={(e) => setTrType(e.target.value)}
                    style={{ fontSize: "10px" }}
                  >
                    <div className="flex mt-2 lg:ml-5">
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="sale"
                          control={<Radio color="default" />}
                          label="Sale"
                        />
                      </div>
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="rent"
                          control={<Radio color="default" />}
                          label="Rent"
                        />
                      </div>

                      {propType.length &&
                      propType !== "residential apartments" &&
                      propType !== "residential house/villa" &&
                      propType !== "residential land" &&
                      propType !== "residential other" ? (
                        <div className="flex" style={{ alignItems: "center" }}>
                          <FormControlLabel
                            value="lease"
                            control={<Radio color="success" />}
                            label="Lease"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </RadioGroup>
                ) : (
                  ""
                )}
              </div>
              <div>
                <h6 className="bg-gray-100 p-2 lg:bg-inherit lg:p-0">
                  Ownership <span style={{ color: "red" }}>*</span>
                </h6>
                {ownership.length ? (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={ownership}
                    name="radio-buttons-group"
                    className="flex"
                    onChange={(e) => setOwnerShip(e.target.value)}
                  >
                    <div className="flex mt-2 lg:ml-5">
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="single"
                          control={<Radio color="default" />}
                          label="Single"
                        />
                      </div>
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="joint"
                          control={<Radio color="default" />}
                          label="Join"
                        />
                      </div>
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="trust"
                          control={<Radio color="default" />}
                          label="Trust"
                        />
                      </div>
                      <div className="flex" style={{ alignItems: "center" }}>
                        <FormControlLabel
                          value="rent"
                          control={<Radio color="default" />}
                          label="Rent"
                        />
                      </div>
                    </div>
                  </RadioGroup>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="upload__row pb-3 grid lg:grid-cols-2 mt-5 gap-7 lg:gap-0  ">
              <div>
                <h6 className="bg-gray-100 p-2 lg:bg-inherit lg:p-0">
                  Price <span style={{ color: "red" }}>*</span>{" "}
                </h6>

                <div
                  className="flex mt-4 lg:mt-2 lg:ml-5 w-fit "
                  id={nullPrice && !rate ? "basic__prop__type__row" : ""}
                >
                  <select className="pb-2" onChange={handleRate}>
                    <option value="">{rate?.disRate}</option>
                    <option value="not provided" defaultChecked={true}>
                      Not provided
                    </option>

                    {trType === "sale"
                      ? price.map((p, index) => {
                          return (
                            <option
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-blue-100" : "bg-inherit"
                              }
                              value={JSON.stringify(p)}
                              style={{ height: "30px" }}
                            >
                              {p.disRate}
                            </option>
                          );
                        })
                      : rentPrice.map((p, index) => {
                          return (
                            <option key={index} value={JSON.stringify(p)}>
                              {p.disRate}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
              <div>
                <h6 className="bg-gray-100 p-2 lg:bg-inherit lg:p-0">
                  Display Price <span style={{ color: "red" }}>*</span>
                </h6>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={disPrice}
                  name="radio-buttons-group"
                  className="flex"
                  onChange={(e) => setDisPrice(e.target.value)}
                >
                  <div className="flex mt-2 lg:ml-5">
                    <div className="flex" style={{ alignItems: "center" }}>
                      <FormControlLabel
                        value={true}
                        control={<Radio color="default" />}
                        label="Yes"
                      />
                    </div>
                    <div className="flex" style={{ alignItems: "center" }}>
                      <FormControlLabel
                        value={false}
                        control={<Radio color="default" />}
                        label="No"
                      />
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="basic__fourth__row">
              <div className="basic__prop__type__head">
                <p className="bg-gray-100 p-2 lg:bg-inherit lg:p-0">
                  Description <span className="text-red-500">*</span>
                </p>
              </div>
              <textarea
                value={description?.replace("breakLine", "")}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleEnter}
                id={
                  nullDesc && !description.length
                    ? "basic__prop__type__row"
                    : ""
                }
              />
              <div className="lg:flex justify-between">
                <p id="basic__desc__p">
                  Minimum 50 and Maximum 2000 Characters
                </p>
                <div className="bg-gray-200 flex p-1 pr-3 pl-3 ">
                  <div className="border-gray-400  rounded border pl-1 pr-1 w-5">
                    <p className="font-bold">B</p>
                  </div>
                  <div className="border-gray-400 rounded border pl-1 pr-1 ml-1 w-5">
                    <p>/</p>
                  </div>

                  <div className="border-gray-400 rounded border pl-1 pr-1 ml-1 w-5">
                    <p className="underline">U</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-10 pb-40">
              <Button
                onClick={validate}
                style={{ float: "right", border: "1px solid blue" }}
                disabled={saving ? true : false}
              >
                {saving ? "SAVING..." : "SAVE & CONTINUE"}
              </Button>
            </div>
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
