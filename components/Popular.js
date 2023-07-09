import React, { useEffect, useState } from "react";

export default function Popular() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/admin/popularPlaces`,
        {}
      );

      const { data } = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
  }, []);
  return (
    <div className="pop">
      <div className="pop__head">
        <h3 className="text-gray-800 font-bold">Popular Places</h3>
      </div>
      <div className="pop__content grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => {
          return (
            <div className="pop__box grid " key={i}>
              
              <div className="pop__right text-gray-800">
                <div>
                  <h5>{d.place}</h5>
                  <h6>{d.totalEntry}</h6>
                  <p>Properties</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
