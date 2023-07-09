import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountSidebar from "../../../components/AccountSidebar";
import Navbar from "../../../components/Navbar";

import WidgetsIcon from "@mui/icons-material/Widgets";
import { Drawer } from "@mui/material";

export default function WatchList() {
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [sbar, setSbar] = useState(false);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const uid = router.query.slug;

  const getContacts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/contacts/${uid}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
      setPhone(data.phone);
      setEmail(data.email);
      setWhatsapp(data.whatsapp);
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, [uid]);

  const navigate = (propType, id) => {
    console.log(id);
    if (
      propType === "residential apartments" ||
      propType == "residential other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial shop" ||
      propType === "commercial office" ||
      propType === "commercial building" ||
      propType === "commercial other"
    ) {
      router.push(`/view/residential/${id}`);
    }
    if (
      propType === "commercial land" ||
      propType === "residential land" ||
      propType === "industrial land" ||
      propType === "agricultural land"
    ) {
      router.push(`/view/land/${id}`);
    }
    if (propType === "industrial building") {
      router.push(`/view/industrialBuilding/${id}`);
    }
  };

  // const t = `Phone : ${phone} `+'\n'+ `Whatsapp : ${whatsapp}` +'\n'+ `Email : ${email}` +'\n' + `Address : ${address}`

  const copyData = async () => {
    const text =
      `Phone : ${phone} ` +
      "\n" +
      `Whatsapp : ${whatsapp}` +
      "\n" +
      `Email : ${email}` +
      "\n" +
      `Address : ${address}`;

    await navigator.clipboard.writeText(text);

    setCopied(true);
  };

  const removeContact = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      getContacts();
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };
  return (
    <div className="pb-10">
      <Navbar />
      <div className="ac grid lg:grid-cols-5   lg:gap-10   pl-3 pr-3 lg:pl-0 lg:pr-0">
        <div className="ac__left hidden lg:grid">
          <AccountSidebar />
        </div>
        <div className="ac__right lg:col-span-4 lg:gap-5">
          <div className="ac__right__head__left pb-3 flex justify-between lg:grid">
            <h6
              className="font-bold"
              // onClick={getContacts}
            >
              Viewed contacts
            </h6>
            <WidgetsIcon
              className="lg:hidden text-gray-500 text-3xl"
              onClick={() => setSbar(true)}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-5 lg:gap-10">
            {data?.map((d, i) => {
              return (
                <div className="contact__view" key={i}>
                  <table className="  divide-y divide-gray-200 w-full">
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="pl-2 lg:pl-6 py-3">
                          <div className=" text-gray-900 font-bold capitalize">
                            {d.propType}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      <tr className="">
                        <td className="pl-2 lg:pl-6 py-4 ">
                          <div className="bg-white divide-y divide-gray-200  ">
                            <div className="text-sm text-gray-900 font-bold  ">
                              {d.town}, {d.district}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>

                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Phone</div>
                        </td>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-0">
                              <div
                                className="text-sm font-medium text-gray-900"
                                style={{ textTransform: "capitalize" }}
                              >
                                {d.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="bg-white divide-y divide-gray-200 mt-4">
                      <tr>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            WhatsApp No
                          </div>
                        </td>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-0">
                              <div className="text-sm font-medium text-gray-900">
                                {d.whatsappNo ? d.whatsappNo : "Not available"}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="bg-white divide-y divide-gray-200 mt-4">
                      <tr>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Email</div>
                        </td>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-0">
                              <div className="text-sm font-medium text-gray-900">
                                {d.email}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="bg-white divide-y divide-gray-200 mt-4 overflow-scroll">
                      <tr>
                        <td className="pl-2 lg:pl-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Address</div>
                        </td>
                        <td
                          className=" pl-2 lg:pl-6 py-3   whitespace-nowrap  overflow-x-scroll "
                          style={{ maxWidth: "200px" }}
                        >
                          <div className="flex items-center">
                            <div className="ml-0">
                              <div className="text-sm font-medium text-gray-900">
                                {d.address}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4">
                    <button
                      onClick={() => removeContact(d._id)}
                      className="bg-red-200 "
                    >
                      Remove
                    </button>
                    <button onClick={copyData} className="mr-3 bg-gray-200">
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <React.Fragment>
        <Drawer
          // anchor={anchor}
          open={sbar}
          // onClose={toggleDrawer(anchor, false)}
        >
          <div className="p-3">
            {/* <CancelRoundedIcon className="absolute top-0 right-0 mt-1 mr-1 text-red-600"/> */}

            <AccountSidebar />
            <button
              className="bg-red-500 text-white w-full mt-2 p-2"
              onClick={() => setSbar(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

{
  /* <SavedContact
key={i}
phone={d?.phone}
propType={d?.propType}
town={d?.town}
district={d?.district}
address={d?.address}
whatsappNo={d?.whatsapp}
email={d?.email}

/> */
}
