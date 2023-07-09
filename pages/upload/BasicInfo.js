import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { price } from "../../assets/data/price";
import Radio from "@mui/material/Radio";
import { Button, FormControlLabel, RadioGroup } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { rentPrice } from "../../assets/data/rentPrice";
import { useDispatch, useSelector } from "react-redux";
import { openLogin } from "../../redux/loginSlice";

const shortid = require("shortid");

export default function BasicInfo() {
  const [propType, setPropType] = useState("");
  const [trType, setTrType] = useState("sale");
  const [ownership, setOwnerShip] = useState("single");
  const [rate, setRate] = useState();
  const [disPrice, setDisPrice] = useState(true);
  const [description, setDescription] = useState("");
  const [nullPropType, setNullPropType] = useState(false);
  const [nullPrice, setNullPrice] = useState(false);
  const [nullDesc, setNullDesc] = useState(false);
  const [saving, setSaving] = useState(false);
  const propId = shortid();
  const router = useRouter();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.value);
  const proTypes = [
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

  const validate = () => {
    if (propType) {
      if (rate) {
        if (description) {
          handleSubmit();
        } else {
          setNullDesc(true);
        }
      } else {
        setNullPrice(true);
        const element = document.getElementById("price");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setNullPropType(true);
      const element = document.getElementById("propType");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    onAuthStateChanged(auth, (currentUser) => {
      const uid = currentUser.uid;

      addProperty(uid);
    });
  };
  const addProperty = async (uid) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/property`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uid,
          propType: propType,
          transType: trType,
          ownership: ownership,
          price: rate,
          displayPrice: disPrice,
          description: description,
          propId: `RP${propId}`,
          date: new Date(),
        }),
      });

      const { data } = await res.json();

      await router.push(`/upload/location/${data._id}`);
      setSaving(false);
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setDescription(description + "breakLine");
    }
  };

  const signup = useSelector((state) => state.signup.value);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser && !signup) {
        dispatch(openLogin());
      }
    });
  }, [login, signup]);

  const handleChange = (v) => {
    let obj = JSON.parse(v.target.value); //object

    setRate(obj);
    // console.log(rate)
    // if(!rate.includes('Not provided')){

    //   var w = rate.split(" ");

    //   var minVal = w[0];
    //   var maxVal = w[2];
    //   var aboveVal = w[1];

    //   if (w.length > 3) {
    //     if (rate.includes("Lac")) {
    //       minVal = minVal * 100000;
    //       maxVal = maxVal * 100000;
    //       console.log(minVal, maxVal);
    //       console.log(rate);
    //     }
    //   } else {
    //     if (rate.includes("Lac")) {
    //       minVal = minVal * 100000;
    //       console.log(minVal);
    //     }
    //     console.log(rate);
    //   }

    //   if (rate.includes("Cr")) {
    //     if (!rate.includes("Above")) {
    //       minVal = minVal * 10000000;
    //       maxVal = maxVal * 10000000;
    //       console.log(minVal, maxVal);
    //       console.log(rate);
    //     }
    //   }
    //   if (rate.includes("Cr")) {
    //     if (rate.includes("Above")) {
    //       minVal = aboveVal * 10000000;
    //       console.log(minVal)
    //       console.log(rate);
    //     }
    //   }

    //   if (!rate.includes("Lac") && !rate.includes("Cr")) {
    //     console.log(minVal);
    //     console.log(maxVal);
    //     console.log(rate);
    //   }

    // }else{
    //  setRate(rate)
    // }
  };

  return (
    <div>
      <Navbar />

      <div className="upload pt-5 grid gap-10  xl:grid-cols-5">
        <div className="basic__benwfit__div hidden xl:flex">
          <div>
            <div className="benfit__div">
              <h6>Benefits of photos</h6>

              <h5 className="mt-1">
                <li>
                  Images can be more effective than words in showcasing a
                  property, so consider adding pictures to provide a more visual
                  representation.
                </li>
              </h5>

              <li>It can boost the exposure of your property</li>

              <li>
                More the traffic, better the chances of getting potential buyers
                for your property
              </li>
              <li>
                Gives better and more idea about the appearance of your property
              </li>
            </div>
          </div>
        </div>
        <div className="col-span-4" id="propType">
          <div className="up__head p-2 bg-gray-100">
            <h4 style={{ fontSize: "20px" }}>Basic Info</h4>
          </div>

          <div className="basic__prop__type">
            <div className="basic__prop__type__head mt-5">
              <p>
                Property Type <span className="text-red-500">*</span>
              </p>
            </div>

            <div className="upload__row pb-6">
              <div
                id={nullPropType && !propType ? "basic__prop__type__row" : ""}
                className="basic__prop__type__row grid grid-cols-2 gap-4 lg:gap-10   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
              >
                {proTypes.map((t, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setPropType(t.toLowerCase())}
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

            <div className="upload__row pb-3 gap-4 md:gap-0 grid md:grid-cols-2 mt-10 ">
              <div>
                <h6 className="bg-gray-100 p-1 lg:bg-inherit lg:p-0">
                  Transaction Type <span style={{ color: "red" }}>*</span>{" "}
                </h6>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="sale"
                  name="radio-buttons-group"
                  className="flex"
                  onChange={(e) => setTrType(e.target.value)}
                  style={{ fontSize: "10px" }}
                >
                  <div className="flex mt-2  ">
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
                          control={<Radio color="default" />}
                          label="Lease"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h6 className="bg-gray-100 p-1 lg:bg-inherit lg:p-0">
                  Ownership <span style={{ color: "red" }}>*</span>
                </h6>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={"single"}
                  name="radio-buttons-group"
                  className="flex"
                  onChange={(e) => setOwnerShip(e.target.value)}
                >
                  <div className="flex mt-2  ">
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
                        value="other"
                        control={<Radio color="default" />}
                        label="Other"
                      />
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div
              className="upload__row pb-3 grid lg:grid-cols-2 mt-10 "
              id="price"
            >
              <div>
                <h6 className="bg-gray-100 p-1 lg:bg-inherit lg:p-0">
                  Price - {trType} <span style={{ color: "red" }}>*</span>{" "}
                </h6>

                <div
                  className="flex mt-2  p-2 w-full"
                  id={nullPrice && !rate ? "basic__prop__type__row" : ""}
                >
                  <select className="pb-2 pl-3 pr-5" onChange={handleChange}>
                    <option value="">--Select--</option>
                    <option value="Not provided">Not provided</option>

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
              <div className="mt-5 lg:mt-0">
                <h6 className="bg-gray-100 p-1 lg:bg-inherit lg:p-0">
                  Display Price <span style={{ color: "red" }}>*</span>
                </h6>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="true"
                  name="radio-buttons-group"
                  className="flex"
                  onChange={(e) => setDisPrice(e.target.value)}
                >
                  <div className="flex mt-2  ">
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
                <p className="bg-gray-100 p-1 lg:bg-inherit lg:p-0">
                  Description <span className="text-red-500">*</span>
                </p>
              </div>
              <textarea
                id={nullDesc && !description ? "basic__prop__type__row" : ""}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>

            <div className="mt-4 md:mt-10 pb-40">
              <Button
                disabled={saving ? true : false}
                onClick={validate}
                style={{ float: "right", border: "1px solid blue" }}
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
