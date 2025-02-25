"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BrandModel from "./options/basic/brand_model_comp";
import Types from "./options/basic/types";
import Colors from "./options/basic/colors";
import Regions from "./options/basic/region";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_URL = "http://localhost:4000";

const BasicInformationForm: React.FC = () => {
  const router = useRouter();
  const [userID, setUserID] = useState<number | null>(null);
  const [year, setYear] = useState("");
  const [roadCapacity, setRoadCapacity] = useState("Roadworthy");
  const [regNo, setRegNo] = useState("");
  const [taxFree, setTaxFree] = useState(false);
  const [vin, setVin] = useState("");
  const [firstRegYear, setFirstRegYear] = useState("");
  const [firstRegMonth, setFirstRegMonth] = useState("");
  const [firstRegDay, setFirstRegDay] = useState("");
  const [inspectionYear, setInspectionYear] = useState("");
  const [inspectionMonth, setInspectionMonth] = useState("");
  const [inspectionDay, setInspectionDay] = useState("");
  const [firstService, setFirstService] = useState(false);
  const [previousOwners, setPreviousOwners] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedShade, setSelectedShade] = useState("");
  const [price, setPrice] = useState("");
  const [notPriced, setNotPriced] = useState(false);
  const [vatDeductible, setVatDeductible] = useState(false);
  const [showExactLocation, setShowExactLocation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");

    if (!token) {
      router.push("/profile");
      return;
    }

    if (storedUserID) {
      setUserID(parseInt(storedUserID));
    }
  }, []);

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedSubType("");
  };

  const handleSubTypeChange = (subTypeId: string) => {
    setSelectedSubType(subTypeId);
  };

  const handleMakerChange = (makerId: string) => {
    setSelectedMaker(makerId);
    setSelectedModel("");
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleColorChange = (id: string) => {
    setSelectedColor(id);
  };

  const handleShadeChange = (id: string) => {
    setSelectedShade(id);
  };

  const handleCountryChange = (id: string) => {
    setSelectedCountry(id);
    setSelectedRegion("");
  };

  const handleRegionChange = (id: string) => {
    setSelectedRegion(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      UserID: userID ?? undefined,
      Year: year ? parseInt(year) : undefined,
      Roadworthy: roadCapacity === "Roadworthy",
      RegistrationNumber: regNo,
      TaxFree: taxFree,
      VIN: vin,
      FirstRegistration:
        firstRegYear && firstRegMonth && firstRegDay
          ? `${firstRegYear}-${firstRegMonth}-${firstRegDay}`
          : null,
      InspectionDate:
        inspectionYear && inspectionMonth && inspectionDay
          ? `${inspectionYear}-${inspectionMonth}-${inspectionDay}`
          : null,
      FirstServiceComing: firstService,
      NumberOfOwners: previousOwners ? parseInt(previousOwners) : undefined,
      Description: otherInfo,

      // Child data:
      TypeID: selectedType ? parseInt(selectedType) : undefined,
      SubTypeID: selectedSubType ? parseInt(selectedSubType) : undefined,
      MakeID: selectedMaker ? parseInt(selectedMaker) : undefined,
      ModelID: selectedModel ? parseInt(selectedModel) : undefined,
      ColorID: selectedColor ? parseInt(selectedColor) : undefined,
      ShadeID: selectedShade ? parseInt(selectedShade) : undefined,

      // Price & location
      Sold: false,
      Price: notPriced ? null : price ? parseInt(price) : undefined,
      VATDeductible: vatDeductible,
      CountryID: selectedCountry ? parseInt(selectedCountry) : undefined,
      CityID: 2, // Hardcoded for now
      RegionID: selectedRegion ? parseInt(selectedRegion) : undefined,
      ShowExactLocation: showExactLocation,
    };

    try {
      const response = await fetch(`${API_URL}/cars`, {
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
      localStorage.setItem("CarID", data.CarID);
      router.push("/new-listing/add-technical");
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-base-100 shadow-md p-4">
      <h2 className="text-md font-bold border-b pb-2 mb-4">
        Basic Information
      </h2>

      <form
        className="max-w-3xl mx-auto space-y-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">Types *</div>
          <Types
            className="flex-1"
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            selectedSubType={selectedSubType}
            onSubTypeChange={handleSubTypeChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Brand &amp; Model *
          </div>
          <BrandModel
            className="flex-1"
            selectedMaker={selectedMaker}
            onMakerChange={handleMakerChange}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Year model *
          </div>
          <select
            className="select select-accent w-full"
            defaultValue=""
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option disabled value="">
              Select year model
            </option>
            {Array.from({ length: 31 }).map((_, i) => {
              const yr = 2025 - i;
              return (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Road capacity
          </div>
          <select
            className="select select-accent w-full"
            value={roadCapacity}
            onChange={(e) => setRoadCapacity(e.target.value)}
          >
            <option>Roadworthy</option>
            <option>Not roadworthy</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Reg. No *
          </div>
          <input
            type="text"
            className="input input-accent w-[28rem]"
            placeholder="example abc-123"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={taxFree}
              onChange={(e) => setTaxFree(e.target.checked)}
            />
            <span>Tax free</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">VIN</div>
          <input
            type="text"
            className="input input-accent w-full"
            placeholder="Vehicle identification number"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            First registration
          </div>
          <div className="flex gap-2 w-full">
            <select
              className="select select-accent w-1/2"
              value={firstRegYear}
              onChange={(e) => setFirstRegYear(e.target.value)}
            >
              <option>Year</option>
              {Array.from({ length: 31 }).map((_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
              ))}
            </select>
            <select
              className="select select-accent w-1/2"
              value={firstRegMonth}
              onChange={(e) => setFirstRegMonth(e.target.value)}
            >
              <option>Month</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="select select-accent w-1/2"
              value={firstRegDay}
              onChange={(e) => setFirstRegDay(e.target.value)}
            >
              <option>Day</option>
              {Array.from({ length: 31 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Inspection date
          </div>
          <div className="flex gap-2 w-full">
            <select
              className="select select-accent w-1/2"
              value={inspectionYear}
              onChange={(e) => setInspectionYear(e.target.value)}
            >
              <option>Year</option>
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
              ))}
            </select>
            <select
              className="select select-accent w-1/2"
              value={inspectionMonth}
              onChange={(e) => setInspectionMonth(e.target.value)}
            >
              <option>Month</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="select select-accent w-1/2"
              value={inspectionDay}
              onChange={(e) => setInspectionDay(e.target.value)}
            >
              <option>Day</option>
              {Array.from({ length: 31 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 translate-x-52">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={firstService}
              onChange={(e) => setFirstService(e.target.checked)}
            />
            <span>First service for vehicle coming</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Previous owners
          </div>
          <select
            className="select select-accent w-full"
            value={previousOwners}
            onChange={(e) => setPreviousOwners(e.target.value)}
          >
            <option disabled value="">
              Select
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Color &amp; Shade *
          </div>
          <Colors
            className="flex-1"
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            selectedShade={selectedShade}
            onShadeChange={handleShadeChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Other info
          </div>
          <textarea
            className="textarea textarea-accent w-full"
            placeholder="Describe your item..."
            rows={2}
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            Asking price *
          </label>
          <div className="flex items-center gap-2 w-full">
            <input
              type="number"
              className="input input-accent w-36"
              placeholder="e.g. 10000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={notPriced}
            />
            <span>€</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            Not priced
          </label>
          <div className="w-full flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-accent mr-2"
              checked={notPriced}
              onChange={(e) => {
                setNotPriced(e.target.checked);
                if (e.target.checked) setPrice("");
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            VAT deductible
          </label>
          <div className="w-full flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-accent mr-2"
              checked={vatDeductible}
              onChange={(e) => setVatDeductible(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-[12rem] font-semibold text-right">
            Country &amp; region *
          </div>
          <Regions
            className="flex-1"
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="min-w-[12rem] font-semibold text-right">
            Show exact location
          </label>
          <div className="w-full flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-accent mr-2"
              checked={showExactLocation}
              onChange={(e) => setShowExactLocation(e.target.checked)}
            />
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Please fill the mandatory information
        </p>

        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-accent w-1/4">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInformationForm;
