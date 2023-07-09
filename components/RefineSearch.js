import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function RefineSearch() {
  return (
    <div className="refine">
      {/* <h4>Refine search</h4>

      <div className="refine__row mt-5">
        <h5>Find by property ID</h5>
        <div className="ref__id__div  flex">
          <input />
          <SearchIcon id="ref__id__icon" style={{ color: "gray" }} />
        </div>
      </div>

      <div className="refine__row mt-5">
        <h5>Districts</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="checkbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Malappuram</p>
        </div>
      </div>
      <div className="refine__row mt-5">
        <h5>Town</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="checkbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Manjeri</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input  className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Nilambur</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input   className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Tirur</p>
        </div>
      </div>
      <div className="refine__row mt-5">
        <h5>Localities</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="checkbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Nellikkuth</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input  className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Cherukulam</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input   className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Koyilandy</p>
        </div>
      </div>
      <div className="refine__row mt-5">
        <h5>Owner</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="checkbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Individual</p>
        </div>
        
        
      </div>
      <div className="refine__row mt-5">
        <h5>Ownership type</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="checkbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="checkbox" />
          <p className="ml-2">Individual</p>
        </div>
        
        
      </div>
      <div className="refine__row mt-5">
        <h5>Price Ranges (INR)</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="chekbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">1 Lac - 5 Lac (1)</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">4 Lac - 6 Lac (1)</p>
        </div>
         
        
        
      </div>
      <div className="refine__row mt-5">
        <h5>Posted Dates</h5>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input className="h-4 w-4" type="chekbox" />
          <p className="ml-2">All</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">Today</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">This week</p>
        </div>

        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">This month</p>
        </div>         
        
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">Last 3 months</p>
        </div>
        <div
          className="refine__row__div mt-2 flex"
          style={{ alignItems: "center" }}
        >
          <input checked className="h-4 w-4" type="radio" />
          <p className="ml-2">Last 6 months</p>
        </div>

      </div>
      <div className="flex mt-2" style={{alignItems:'center',justifyContent:'center'}}>
      <button
      onClick={()=>setAdvSearch(!advSearch)}
      >Advanced Search <MoreVertIcon style={{color:'#FF385C'}} /> </button>
      </div> */}
    </div>
  );
}
