import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeContact } from "../redux/viewContactSlice";
import { Slide } from "@mui/material";
export default function ViewContact({ email, phone, whatsappNo, address }) {
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  const viewContact = useSelector((state) => state.viewContact.value);

  const t =
    `Phone : ${phone} ` +
    "\n" +
    `Whatsapp : ${whatsappNo}` +
    "\n" +
    `Email : ${email}` +
    "\n" +
    `Address : ${address}`;

  const copyData = async () => {
    const text =
      `Phone : ${phone} ` +
      "\n" +
      `Whatsapp : ${whatsappNo}` +
      "\n" +
      `Email : ${email}` +
      "\n" +
      `Address : ${address}`;

    await navigator.clipboard.writeText(text);

    setCopied(true);
  };
  return (
    <Slide direction="up" in={viewContact} mountOnEnter unmountOnExit>
      <div className="absolute  top-0 right-0  w-full   ">
        <div className="view__contact">
          <h4>Contact details</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Phone</div>
                </td>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div
                        className="text-sm font-medium text-gray-900"
                        style={{ textTransform: "capitalize" }}
                      >
                        {phone}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody className="bg-white divide-y divide-gray-200 mt-4">
              <tr>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">WhatsApp no</div>
                </td>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900">
                        {whatsappNo}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody className="bg-white divide-y divide-gray-200 mt-4">
              <tr>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Email</div>
                </td>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900">
                        {email}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody className="bg-white divide-y divide-gray-200 mt-4">
              <tr>
                <td className="lg:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Address</div>
                </td>
                <td
                  className="lg:px-6 py-4   whitespace-nowrap  overflow-scroll lg:overflow-hidden"
                  style={{ maxWidth: "200px" }}
                >
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900">
                        {address}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              onClick={() => dispatch(closeContact())}
              className="bg-red-600 text-white"
            >
              Close
            </button>
            <button onClick={copyData} className="mr-3 text-white bg-gray-600">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
