import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import Navbar from "../../../components/Navbar";
import "react-phone-number-input/style.css";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
export default function Profile() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [secondaryPhone, setSecondoryPhone] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [saving, setSaving] = useState(false);

  const [nullAddress, setNullAddress] = useState(false);
  const [nullMail, setNullMail] = useState(false);
  const [nullPhone, setNullPhone] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const id = router.query.slug;

  const fillData = () => {
    setAddress(dt.data.address);
    setEmail(dt.data.email);
    setPhone(dt.data.phone);
    setWhatsappNo(dt.data.whatsappNo);
    setSecondoryPhone(dt.data.secondaryPhone);
  };

  const valEmail = (e) => {
    setEmail(e);
    let em = e.includes("@");
    em ? setEmailError(false) : setEmailError(true);
  };
  const validateForm = () => {
    if (address) {
      if (email) {
        if (email.includes("@")) {
          if (phone) {
            addProfile();
          } else {
            setNullPhone(true);
          }
        }
      } else {
        setNullMail(true);
      }
    } else {
      setNullAddress(true);
    }
  };

  const addProfile = async () => {
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
            address: address,
            email: email,
            phone: phone,
            secondaryPhone: secondaryPhone,
            whatsappNo: whatsappNo,
          }),
        }
      );

      await router.push(`/upload/details/${id}`);
      setSaving(false);
    } catch (error) {
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
      if (data.address) {
        setAddress(data.address);
        setEmail(data.email);
        setPhone(data.phone);
        setSecondoryPhone(data.secondaryPhone);
        setWhatsappNo(data.whatsappNo);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProperty();
  }, [id]);
  return (
    <div className="pb-20">
      <Navbar />
      <div className="upload pt-5 grid gap-4 lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4>Property profile</h4>
          </div>

          <div className="mt-6">
            <div>
              <TextField
                id="outlined-basic"
                label="Property Address"
                variant="outlined"
                required
                style={{ width: "100%" }}
                multiline
                minRows={4}
                maxRows={4}
                value={address}
                error={nullAddress && !address ? true : false}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className=" mt-5 md:mt-10 grid md:grid-cols-2 gap-5">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
                style={{ width: "100%" }}
                value={email}
                placeholder="ff"
                onChange={(e) => valEmail(e.target.value)}
                error={
                  nullMail && !email
                    ? true
                    : false || (emailError && email.length)
                    ? true
                    : false
                }
              />
              <TextField
                id="outlined-basic"
                label="Confirm Email"
                variant="outlined"
                required
                style={{ width: "100%" }}
                value={confEmail}
                onChange={(e) => setConfEmail(e.target.value)}
                error={email != confEmail && confEmail.length ? true : false}
              />
            </div>

            <div className=" mt-5 md:mt-10 grid md:grid-cols-2 gap-5">
              <div className="phone__input">
                <PhoneInput
                  placeholder="Phone"
                  value={phone}
                  onChange={setPhone}
                  required
                  defaultCountry="IN"
                />
              </div>
              <div className="phone__input">
                <PhoneInput
                  placeholder="Secondary No"
                  value={secondaryPhone}
                  onChange={setSecondoryPhone}
                  required
                  defaultCountry="IN"
                />
              </div>
            </div>

            <div className="mt-5 md:mt-10 grid md:grid-cols-2 gap-10">
              <div className="phone__input">
                <PhoneInput
                  placeholder="Whatsapp No"
                  value={whatsappNo}
                  onChange={setWhatsappNo}
                  required
                  defaultCountry="IN"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
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
