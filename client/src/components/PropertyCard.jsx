import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard(props) {
  return (
    <div className="border mb-4 rounded overflow-hidden">
      <Link to={`/property/${props.property.propertyId}`}>
        <div
          style={{
            backgroundImage: `url("${props.property.photos
              .slice(0, 1)
              .map((photo, key) => photo.href)}")`,
          }}
          className="w-64 h-64 bg-blue bg-cover"
        ></div>
      </Link>
      <div className="p-3">
        <h3 className="font-bold text-xl mb-3">
          <Link to={`/property/${props.property.propertyId}`}>
            {props.property.propertyId}
          </Link>
        </h3>
        <div className="mb-3">{props.property.propertyType}</div>
        <div className="mb-3">
          <p>
            {props.property.address.line} {props.property.address.city}{" "}
            {props.property.address.stateCode}{" "}
          </p>
        </div>
        <Link
          to={`/property/${props.property.propertyId}`}
          className="bg-blue-500 text-white p-2 flex justify-center w-full"
        >
          View
        </Link>
      </div>
    </div>
  );
}
