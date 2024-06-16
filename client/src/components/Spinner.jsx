import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#10B981" // Tailwind color emerald-500
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
