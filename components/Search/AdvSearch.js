import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { districts } from "../../assets/data/districts";
import { cities } from "../../assets/data/city";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { closeAdvSearch } from "../../redux/advSearch";
import { searchRentPrice } from "../../assets/data/searchRentPrice";
import { searchPrice } from "../../assets/data/searchPrice";
import Link from "next/link";
import { onSearch } from "../../redux/searchSlice";

export default function AdvSearch() {
  const [searching, setSearching] = useState(false);
  const [propType, setPropType] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const viewSearch = useSelector((state) => state.searchRow.value);

  const [filterText, setFilterText] = useState("");
  const [distIndex, setDistIndex] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [postDate, setPostDate] = useState("");
  const [trType, setTrType] = useState("sale");
  const router = useRouter();

  const handleDist = async (e) => {
    setDistIndex(e);
  };
  const dispatch = useDispatch();
  const view = useSelector((state) => state.advSearch.value);

  const tags = {
    transType: trType,
    propType: propType.toLowerCase(),
    district: district,
    town: town,
    minRate: minRate,
    maxRate: maxRate,
  };

  const t = JSON.stringify(tags);

  const search = async () => {
    dispatch(onSearch());
    setSearching(true);
    dispatch(closeAdvSearch());
  };

  return (
    <div style={{ minWidth: "100%" }}>
      <div className="adv__search">
        <div className="bg-gray-300 h-9 rounded">
          <div
            className="close__div"
            onClick={() => dispatch(closeAdvSearch())}
          >
            <CloseIcon />
          </div>
        </div>

        {/* <div className="adv__top">
      <div className="adv__top__row  grid gap-2   md:gap-5 md:grid-cols-4">
         

        <FormControl fullWidth>
          <TextField
            fullWidth
            className="bg-white"
            id="country-code-select"
            select
            size="small"
            label="Filterby"
            value={filterTag}
            displayEmpty
              onChange={(e) => setFilterTag(e.target.value)}

            SelectProps={{
              renderValue: (value) => value,
            }}
          >
            <MenuItem value="Id">Id</MenuItem>
            <MenuItem value="District">District</MenuItem> 
            <MenuItem value="Town">Town</MenuItem> 
            <MenuItem value="Locality">Locality</MenuItem>
            
          </TextField>
        </FormControl>
      
        <TextField
          fullWidth
          className="bg-white outline-hidden"
         
          size="small"
          onChange={(e) => setFilterText(e.target.value)}
          placeholder={`Please enter ${filterTag.toLowerCase()}`}
          
        />

       
      </div>
    </div> */}

        <div className="adv__row__div">
          <div className="adv__row    grid-cols-4 gap-10 ">
            <h6 className="mt-1 text-gray-600">
              I want to
              {/* <span style={{ color: "red" }}>*</span>{" "} */}
            </h6>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="sale"
              name="radio-buttons-group"
              onChange={(e) => setTrType(e.target.value)}
              style={{ fontSize: "10px" }}
            >
              <div className="flex   ">
                <div className="flex" style={{ alignItems: "center" }}>
                  <FormControlLabel
                    value="sale"
                    control={<Radio color="success" />}
                    label={<span style={{ fontSize: "0.9rem" }}>Buy</span>}
                  />
                </div>
                <div className="flex" style={{ alignItems: "center" }}>
                  <FormControlLabel
                    value="rent"
                    control={<Radio color="success" />}
                    label={<span style={{ fontSize: "0.9rem" }}>Rent</span>}
                  />
                </div>

                <div className="flex" style={{ alignItems: "center" }}>
                  <FormControlLabel
                    value="lease"
                    control={<Radio color="success" />}
                    label={<span style={{ fontSize: "0.9rem" }}>Lease</span>}
                    style={{ fontSize: "10px" }}
                  />
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="adv__row mt-3 gri md:grid-cols-4 gap-1 md:gap-10">
            <div className="col-span-2 adv__row__right flex">
              <FormControl fullWidth className="h-10">
                <TextField
                  className="bg-white"
                  fullWidth
                  id="country-code-select"
                  select
                  label="Property type"
                  value={propType}
                  size="small"
                  onChange={(e) => setPropType(e.target.value)}
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem disabled>ALL RESIDENTIAL</MenuItem>
                  <MenuItem value="Residential Appartments">
                    {" "}
                    Residential Appartments
                  </MenuItem>
                  <MenuItem value="Residential House/Villa">
                    Residential House/Villa
                  </MenuItem>

                  <MenuItem value="Residential Land">Residential Land</MenuItem>
                  <MenuItem value="Residential Other">
                    Residential Other
                  </MenuItem>
                  <MenuItem disabled>ALL COMMERCIAL</MenuItem>

                  <MenuItem value="Commercial Shop">Commercial Shop</MenuItem>
                  <MenuItem value="Commercial Office">
                    Commercial Office
                  </MenuItem>
                  <MenuItem value="Commercial Land">Commercial Land</MenuItem>
                  <MenuItem value="Commercial Building">
                    Commercial Building
                  </MenuItem>
                  <MenuItem value="Commercial Other">Commercial Other</MenuItem>
                  <MenuItem disabled> ALL INDUSTRIAL</MenuItem>
                  <MenuItem value="Industrial Building">
                    Industrial Building
                  </MenuItem>
                  <MenuItem value="Industrial Land">Industrial Land</MenuItem>

                  <MenuItem disabled> ALL AGRICULTURAL</MenuItem>

                  <MenuItem value="Agricultural Land">
                    Agricultural Land
                  </MenuItem>
                </TextField>
              </FormControl>
            </div>
          </div>

          <div className="adv__row mt-3 gri d md:grid-cols-4 gap-1 md:gap-10">
            <h6 className="text-gray-600">
              Price rang
              {/* <span style={{ color: "red" }}>*</span>{" "} */}
            </h6>
            <div className="grid grid-cols-2 mt-1 col-span-2 adv__row__right     gap-5">
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  className="bg-white"
                  id="country-code-select"
                  select
                  size="small"
                  label="From"
                  value={minRate}
                  // displayEmpty
                  onChange={(e) => setMinRate(e.target.value)}
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  {/* <MenuItem value="lowest price">Lowest price</MenuItem> */}
                  {trType === "sale"
                    ? searchPrice.map((p, i) => (
                        <MenuItem key={i} value={p.value}>
                          {p.disRate}
                        </MenuItem>
                      ))
                    : searchRentPrice.map((p, i) => {
                        return (
                          <MenuItem key={i} value={p.value}>
                            {p.disRate}
                          </MenuItem>
                        );
                      })}
                </TextField>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  className="bg-white"
                  id="country-code-select"
                  select
                  size="small"
                  label="To"
                  value={maxRate}
                  displayEmpty
                  onChange={(e) => setMaxRate(e.target.value)}
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  {trType === "sale"
                    ? searchPrice.map((p, i) => (
                        <MenuItem key={i} value={p.value}>
                          {p.disRate}
                        </MenuItem>
                      ))
                    : searchRentPrice.map((p, i) => {
                        return (
                          <MenuItem key={i} value={p.value}>
                            {p.disRate}
                          </MenuItem>
                        );
                      })}
                </TextField>
              </FormControl>
            </div>
          </div>

          <div className="adv__row mt-3 gri d md:grid-cols-4 gap-1 md:gap-10">
            {/* <h6>
          State <span style={{ color: "red" }}>*</span>{" "}
        </h6> */}
            <div className="col-span-2 adv__row__right flex">
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  className="bg-white"
                  id="country-code-select"
                  select
                  size="small"
                  label="State"
                  value={"Kerala"}
                  displayEmpty
                  // onChange={(e) => setFromRate(e.target.value)}

                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  <MenuItem value={"Kerala"}>Kerala</MenuItem>
                </TextField>
              </FormControl>
            </div>
          </div>
          <div className="adv__row mt-3 gri d md:grid-cols-4 gap-1 md:gap-10">
            {/* <h6>District</h6> */}
            <div className="col-span-2 adv__row__right flex">
              <FormControl fullWidth className="h-10">
                <TextField
                  className="bg-white"
                  fullWidth
                  id="country-code-select"
                  select
                  label="District"
                  //  value={district}
                  // displayEmpty
                  onChange={(e) => setDistrict(e.target.value)}
                  // helperText="Please select your country"
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                  size="small"
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
            </div>
          </div>
          <div className="adv__row mt-3 gri d md:grid-cols-4 gap-1 md:gap-10">
            {/* <h6>Town</h6> */}
            <div className="col-span-2 adv__row__right flex">
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  className="bg-white"
                  id="country-code-select"
                  select
                  label="Town"
                  value={town}
                  // displayEmpty
                  size="small"
                  onChange={(e) => setTown(e.target.value)}
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  {cities[distIndex]?.towns.map((option, i) => (
                    <MenuItem
                      key={option}
                      value={option}
                      onClick={(e) => setTown(e.target.value)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                  <MenuItem
                  // value=''
                  ></MenuItem>
                </TextField>
              </FormControl>
            </div>
          </div>
          <div className="adv__row mt-3 gri d md:grid-cols-4 gap-1 md:gap-10">
            {/* <h6>Locality</h6> */}
            <div className="col-span-2 adv__row__right flex">
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  className="bg-white"
                  id="country-code-select"
                  select
                  label="Locality"
                  value={town}
                  // displayEmpty
                  onChange={(e) => setTown(e.target.value)}
                  size="small"
                  SelectProps={{
                    renderValue: (value) => value,
                  }}
                >
                  {cities[distIndex]?.towns.map((option, i) => (
                    <MenuItem
                      key={option}
                      value={option}
                      onClick={(e) => setTown(e.target.value)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                  <MenuItem value=""></MenuItem>
                </TextField>
              </FormControl>
            </div>
          </div>

          {/* <div className="adv__row mt-3 grid md:grid-cols-4 gap-1 md:gap-10">
        <h6>Posted by</h6>
        <div className=" adv__row__right grid grid-cols-2 gap-5 col-span-2">
          
          <FormGroup className="col-span-2">
            <span className="grid grid-cols-2 ">
              {" "}
              <FormControlLabel
                className=""
                control={<Checkbox defaultChecked />}
                label="Individual"
              />
              <FormControlLabel control={<Checkbox />} label="Builders" />
            </span>
          </FormGroup>
        </div>
      </div> */}

          {/* <div className="adv__row mt-3 grid md:grid-cols-4 gap-1 md:gap-10">
        <h6>Posted within</h6>
        <div className="col-span-2 adv__row__right flex">
          <FormControl fullWidth>
            <TextField
              fullWidth
              className="bg-white"
              id="country-code-select"
              select
              label="Posted within"
              value={postDate}
              displayEmpty
              onChange={(e) => setPostDate(e.target.value)}
              size="small"
              SelectProps={{
                renderValue: (value) => value,
              }}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="This week">This week</MenuItem>
              <MenuItem value="This month">This month</MenuItem>
              <MenuItem value="Last three months">Last three months</MenuItem>
              <MenuItem value="Last six months">Last six months</MenuItem>
            </TextField>
          </FormControl>
        </div>
      </div> */}
          <div className="adv__row mt-3 grid md:grid-cols-4 gap-1 md:gap-10">
            <h6></h6>
            <div className="col-span-2 adv__row__right ">
              <div className="adv__btn__div">
                <Link aria-disabled href={`/search/advSearch/${t}`}>
                  <button
                    id="ad__search__btn"
                    className="bg-green-800"
                    onClick={search}
                  >
                    {searching ? "PROCESSING..." : "  SEARCH"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* : ''} */}
    </div>
  );
}
