import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { closeContact } from "../redux/viewContactSlice";
export default function SavedContact({
  email,
  phone,
  whatsappNo,
  address,
  propType,
  district,
  town,
}) {
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();

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
    <div className="contact__view">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className=" text-gray-900 font-bold">{propType}</div>
            </td>
          </tr>
        </tbody>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 font-bold">
                {town}, {district}
              </div>
            </td>
          </tr>
        </tbody>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Phone</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">WhatsApp no</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Email</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Address</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
}
