import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBuildingPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState({
    buildingName: "",
    type: "",
    description: "",
    location: "",
    rent: "",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/buildings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setBuilding(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("company.")) {
      const companyField = name.split(".")[1];
      setBuilding((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          [companyField]: value,
        },
      }));
    } else {
      setBuilding({
        ...building,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/buildings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(building),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Building updated:", data);
        navigate(`/buildings/${id}`);
      })
      .catch((error) => console.error("Error updating building:", error));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Edit Building</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-xl"
      >
        <input
          type="text"
          name="buildingName"
          placeholder="Building Name"
          value={building.buildingName}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={building.type}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={building.description}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={building.location}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="rent"
          placeholder="Rent"
          value={building.rent}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="company.name"
          placeholder="Company Name"
          value={building.company.name}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="company.description"
          placeholder="Company Description"
          value={building.company.description}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        ></textarea>
        <input
          type="email"
          name="company.contactEmail"
          placeholder="Contact Email"
          value={building.company.contactEmail}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="tel"
          name="company.contactPhone"
          placeholder="Contact Phone"
          value={building.company.contactPhone}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
        >
          Update Building
        </button>
      </form>
    </div>
  );
};

export default EditBuildingPage;
