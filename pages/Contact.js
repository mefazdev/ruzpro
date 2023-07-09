import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import PhoneInput from "react-phone-number-input";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSendig] = useState(false);
  const sendForm = async () => {
    setSendig(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/mail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          message: message,
          date: new Date(),
        }),
      });

      const { data } = await res.json();
      console.log(data);
      setSendig(false);
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };
  return (
    <div className="pb-20">
      <Navbar />

      <div className="content  lg:pr-20">
        <div className="legal">
          <h3>Contact Ruzpro.com</h3>
        </div>
        <p className="">info@ruzpro.com</p>

        <div className=" contact__form__div">
           <div>
            <form onSubmit={sendForm} className="grid grid-cols-1">
              <input
                required
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="contact__phone__input">
                <PhoneInput
                  name="phone"
                  className="pl-2"
                  placeholder="Phone"
                  value={phone}
                  onChange={setPhone}
                  required
                  defaultCountry="IN"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
               type="submit"
              >
                {sending ? "SENDING..." : "SEND"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
