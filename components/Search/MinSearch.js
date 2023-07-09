import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { districts } from "../../assets/data/districts";
import { cities } from "../../assets/data/city";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { closeSearchrow, openSearchrow } from "../../redux/searchrowSlice";
import { openAdvSearch } from "../../redux/advSearch";
import { properties } from "../../assets/data/propTypes";
import { onSearch } from "../../redux/searchSlice";

export default function MinSearch() {
  const dispatch = useDispatch();
  const [distIndex, setDistIndex] = useState("");
  const [town, setTown] = useState("");
  const [propType, setPropType] = useState("");
  const [searching, setSearching] = useState(false);
  const [nullDist, setNullDist] = useState(false);
  const [nullTown, setNullTown] = useState(false);
  const [nullProp, setNullProp] = useState(false);
const [district,setDistrict] = useState('')
  const handleDist = async (e) => {
    setDistIndex(e);
  };

  const tags = {
    propType: propType.toLowerCase(),
    district: district,
    town: town,
  };
  let t = JSON.stringify(tags);

  const checkTags = () => {
    if (!propType) {
      setNullProp(true);
    }

    if (!district) {
      setNullDist(true);
    }
    if (!town) {
      setNullTown(true);
    }
  };
  const handleSearch = () => {
    dispatch(closeSearchrow());
    dispatch(onSearch());
  };

  const controlAdvSearch = () => {
    dispatch(closeSearchrow());
    dispatch(openAdvSearch());
  };

  return (
    <div className="scom__parent">
      <div
        className="close__div absolute  "
        onClick={() => dispatch(closeSearchrow())}
      >
        <CloseIcon />
      </div>
      <div>
        <div className="scom grid gap-5   lg:grid-cols-5">
          {/* <input placeholder='Enter Keyword'/> */}
          {/* <select
      onChange={(e) => handleDist(e)}
      >
        <option>District</option>
   
        {districts?.map((d,i)=>{
          return(
            <option key={i}> {d}</option>
          )
        })}
      </select> */}
          {/* <Link href='/category/residential/hhiiii'><button>check me</button></Link> */}
          <FormControl fullWidth className="h-10">
            <TextField
              className="bg-white"
              fullWidth
              id="country-code-select"
              select
              label="Property type"
              value={propType}
              error={!propType && nullProp ? true : false}
              //  displayEmpty
              onChange={(e) => setPropType(e.target.value)}
              SelectProps={{
                renderValue: (value) => value,
              }}
            >
              {properties?.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl fullWidth className="h-10">
            <TextField
              className="bg-white"
              fullWidth
              id="country-code-select"
              select
              label="District"
              value={district}
              error={!district && nullDist ? true : false}
              //  displayempty
              onChange={(e) => setDistrict(e.target.value)}
              SelectProps={{
                renderValue: (value) => value,
              }}
            >
              {districts.map((option, i) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={(e) => handleDist(i)}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              className="bg-white"
              id="country-code-select"
              select
              label="Town"
              value={town}
              // displayempty
              onChange={(e) => setTown(e.target.value)}
              error={!town && nullTown ? true : false}
              SelectProps={{
                renderValue: (value) => value,
              }}
            >
              {cities[distIndex]?.towns.map((option, i) => (
                <MenuItem
                  key={i}
                  value={option}
                  onClick={(e) => setTown(e.target.value)}
                >
                  {option}
                </MenuItem>
              ))}
              <MenuItem></MenuItem>
            </TextField>
          </FormControl>

          <button id="scom__left__btn" onClick={controlAdvSearch}>
            Advanced Search <MoreVertIcon className="text-green-800" />{" "}
          </button>

          {propType && district && town ? (
            <Link aria-disabled href={`/search/minSearch/${t}`}>
              <button
                onClick={handleSearch}
                id="scom__search__btn"
                className="bg-green-800"
              >
                {searching ? "Searching" : "Search"}
              </button>
            </Link>
          ) : (
            <button
              onClick={checkTags}
              id="scom__search__btn"
              className="bg-green-800"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
