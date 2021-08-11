import React from "react";

export default function Root(props) {
  const src = props
    .getCommonImages()
    .find((img) => img.name === "Baikal").image;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Application three {props.name}</h2>
      <h3>Date : {new Date().toLocaleTimeString()}</h3>
      <img src={src} style={{ maxHeight: "300px" }} alt="Baikal" />
    </div>
  );
}
