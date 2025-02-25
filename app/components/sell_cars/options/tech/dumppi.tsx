<div className="flex items-center gap-4">
<label className="min-w-[12rem] font-semibold text-right">
  No. of persons
</label>
<select className="select select-accent w-full">
  <option>Select No. of persons</option>
  {[...Array(10)].map((_, i) => (
    <option key={i}>{i + 1}</option>
  ))}
</select>
</div>

<div className="flex items-center gap-4">
<label className="min-w-[12rem] font-semibold text-right">
  No. of doors
</label>
<select className="select select-accent w-full">
  <option>Select No. of doors</option>
  {[2, 3, 4, 5].map((num) => (
    <option key={num}>{num}</option>
  ))}
</select>
</div>

<div className="flex items-center gap-4">
<label className="min-w-[12rem] font-semibold text-right">
  Power
</label>
<input
  type="number"
  className="input input-accent w-full"
  placeholder="Enter power"
/>
</div>

<h3 className="font-semibold text-center mt-4">Fuel Consumption</h3>
{["urban", "road", "combined"].map((type) => (
<div key={type} className="flex items-center gap-4">
  <label className="min-w-[12rem] font-semibold text-right">
    {type.charAt(0).toUpperCase() + type.slice(1)} (L/100km)
  </label>
  <input
    type="number"
    className="input input-accent w-full"
    placeholder="Enter fuel consumption"
  />
</div>
))}

<h3 className="text-center font-semibold mt-4 ">
Weight (Check your car registration certificate)
</h3>
{[
"Curb weight",
"Gross weight",
"Tow weight with brakes",
"Tow weight without brakes",
].map((label) => (
<div key={label} className="flex items-center gap-4">
  <label className="min-w-[15rem] font-semibold text-right whitespace-nowrap">
    {label} (kg)
  </label>
  <input
    type="number"
    className="input input-accent max-w-[16rem]"
    placeholder="Enter weight"
  />
</div>
))}