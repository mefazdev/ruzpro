import Link from "next/link";
import React, { useEffect } from "react";
import AdminNav from "../../components/admin/AdminNav";
import Modal from "@mui/material/Modal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  NativeSelect,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
 export default function PopularPlaces() {
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [totalEntry, setTotalEntry] = useState("");
  const [data, setData] = useState([]);
  const [del,setDel] = useState(false)
  // http://localhost:3000/api/admin/popularPlaces

  const addPopPlace = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/popularPlaces", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'Content-type': 'text/plain',
        },
        body: JSON.stringify({
          place: place,
          totalEntry: totalEntry,
        }),
      });

      const { data } = await res.json();
        // setData(data)
      setSaving(false);
      setOpen(false);
      getData()
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };
  const getData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/popularPlaces`,
        {}
      );
      const { data } = await res.json();
      //   console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
  }, []);

  const deletePopPlace = async (id) => {
    setDel(true)
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/popularPlaces/${id}`,
        {
          method: "DELETE",
        }
      );

   await   getData();
   setDel(false)
      //   setAddedToFav(true)
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="ad__cont pt-5">
        {data?.length}
        <div className="flex justify-between">
          <p className="text-large">Popular place</p>
          <button
            className="bg-blue-500 p-1 text-white cursor-pointer  pr-5 pl-5 rounded-sm"
            onClick={() => setOpen(true)}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      {/* <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Place
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Props
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {/* {no} */}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-0">
                                <div className="text-sm font-medium text-gray-900">
                                  {d.place}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-0">
                                <div className="text-sm font-medium text-gray-900">
                                  {d.totalEntry}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                           
                              className="bg-blue-500 p-1 text-white  pr-3 pl-3"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => deletePopPlace(d._id)}
                              className="bg-red-500 p-1 text-white  pr-3 pl-3"
                            >
                                {del? 'Deleting...' : 'Delete'}
                 
                            </button>   
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="outline-none bg-white rounded-lg"
          style={{ maxWidth: "400px", margin: "auto", marginTop: "40px" }}
        >
          <CancelIcon
            className="float-right mt-2 mr-3 text-red-600 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="p-10">
            <FormControl fullWidth className="h-10">
              <TextField
                //  fullWidth
                id="country-code-select"
                //    select
                label="Place"
                value={place}
                displayEmpty
                onChange={(e) => setPlace(e.target.value)}
                // helperText="Please select your country"
                SelectProps={{
                  renderValue: (value) => value,
                }}
              >
                <MenuItem></MenuItem>
              </TextField>
            </FormControl>
            <FormControl
              fullWidth
              className="h-10  "
              style={{ marginTop: "30px" }}
            >
              <TextField
                //  fullWidth
                id="country-code-select"
                //    select
                label="Total entry"
                value={totalEntry}
                displayEmpty
                onChange={(e) => setTotalEntry(e.target.value)}
                // helperText="Please select your country"
                SelectProps={{
                  renderValue: (value) => value,
                }}
              >
                <MenuItem></MenuItem>
              </TextField>
            </FormControl>

            <Button
              onClick={addPopPlace}
              style={{
                border: "1px solid blue",
                marginTop: "40px",
                width: "100%",
              }}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
