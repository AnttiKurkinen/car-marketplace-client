"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FuelTypes from "./options/tech/fuel_type";
import DriveTypes from "./options/tech/drive_type";
import Transmission from "./options/tech/transmission";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_URL = "http://localhost:4000";

const TechnicalInformationForm: React.FC = () => {
  const router = useRouter();
  const [carID, setCarID] = useState<number | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  const [mileage, setMileage] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedDriveType, setSelectedDriveType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedEngineCapacity, setSelectedEngineCapacity] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");
    const storedCarID = localStorage.getItem("CarID");

    if (!token) {
      router.push("/profile");
      return;
    }

    if (storedUserID) {
      setUserID(parseInt(storedUserID));
    }

    if (!storedCarID) {
      router.push("/new-listing"); // Redirect back if CarID is missing
      return;
    }

    setCarID(parseInt(storedCarID));
  }, []);

  const handleFuelTypeChange = (fuelTypeId: string) => {
    setSelectedFuelType(fuelTypeId);
  };

  const handleDriveTypeChange = (driveTypeId: string) => {
    setSelectedDriveType(driveTypeId);
  };

  const handleTransmisssionChange = (transmissionId: string) => {
    setSelectedTransmission(transmissionId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      CarID: carID,
      Mileage: mileage ? parseInt(mileage) : undefined,
      FuelTypeID: selectedFuelType ? parseInt(selectedFuelType) : undefined,
      DriveTypeID: selectedDriveType ? parseInt(selectedDriveType) : undefined,
      TransmissionID: selectedTransmission ? parseInt(selectedTransmission) : undefined,
      EngineCapacity: selectedEngineCapacity ? parseInt(selectedEngineCapacity) : undefined,
    };

    try {
      const response = await fetch(`${API_URL}/cartechnicaldetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Car created:", data);
      router.push("/sell_cars/images");
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-base-100 shadow-md p-4">
      <h2 className="text-md font-bold border-b pb-2 mb-4">
        Technical Information
      </h2>

      <form
        className="space-y-1.5 max-w-3xl mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            Mileage (driven km) *
          </label>
          <input
            type="number"
            className="input input-accent w-full"
            placeholder="Enter mileage"
            onChange={(e) => setMileage(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Fuel type *
          </div>
          <FuelTypes
            className="flex-1"
            selectedFuelType={selectedFuelType}
            onFuelTypeChange={handleFuelTypeChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Drive type *
          </div>
          <DriveTypes
            className="flex-1"
            selectedDriveType={selectedDriveType}
            onDriveTypeChange={handleDriveTypeChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Transmission *
          </div>
          <Transmission
            className="flex-1"
            selectedTransmission={selectedTransmission}
            onTransmissionChange={handleTransmisssionChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            Engine capacity *
          </label>
          <select
            className="select select-accent w-full"
            defaultValue=""
            value={selectedEngineCapacity}
            onChange={(e) => setSelectedEngineCapacity(e.target.value)}
          >
            <option>Select Engine capacity</option>
            <option>1.0L</option>
            <option>1.6L</option>
            <option>2.0L</option>
            <option>3.0L</option>
          </select>
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-accent w-1/4">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnicalInformationForm;
