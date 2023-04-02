import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import PropertyCard from "./PropertyCard";

export default function Dashboard() {
  const url = "http://localhost:6999/allproperties";
  const [properties, setProperties] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    setProperties({
      loading: true,
      data: null,
      error: false,
    });

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((d) => {
        setProperties({
          loading: false,
          data: d.properties,
          error: false,
        });
      })
      .catch(() => {
        setProperties({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, [url]);

  let content = null;

  if (properties.error) {
    content = <p>Error! Please try later</p>;
  }

  if (properties.loading) {
    content = <Loader></Loader>;
  }

  if (properties.data) {
    content = properties.data.map((property, key) => (
      <div>
        <PropertyCard property={property} />
      </div>
    ));
  }

  return (
    <div className="font-bold text-2xl">
      <h1>Apartment List</h1>
      {content}
    </div>
  );
}
