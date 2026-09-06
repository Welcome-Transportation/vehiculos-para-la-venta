const inputClass =
  "rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900";
const labelClass = "text-xs font-medium text-zinc-600 dark:text-zinc-400";

export default function VehicleFields({
  priceLabel = "Price (USD)",
}: {
  priceLabel?: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Listing title</label>
        <input name="title" required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>{priceLabel}</label>
          <input
            name="price"
            type="number"
            min={0}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Mileage (optional)</label>
          <input name="mileage" type="number" min={0} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={4} required className={inputClass} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>City</label>
          <input name="city" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>County</label>
          <input name="county" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>ZIP code</label>
          <input name="zipCode" required className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Longitude</label>
          <input
            name="longitude"
            type="number"
            step="any"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Fleet status</label>
        <select name="fleetStatus" className={inputClass} defaultValue="PARKED">
          <option value="ACTIVE_FLEET">Active fleet</option>
          <option value="PARKED">Parked</option>
        </select>
      </div>

      <fieldset className="grid grid-cols-2 gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        {[
          ["isAdaAccessible", "ADA accessible"],
          ["hasSeatBelts", "Seat belts"],
          ["hasTVs", "TVs"],
          ["hasPASystem", "PA system"],
          ["hasWorkingRadio", "Working radio"],
          ["hasBluetooth", "Bluetooth"],
          ["hasUSBPorts", "USB ports"],
          ["hasWorkingBathroom", "Working bathroom"],
          ["isOperable", "Operable / runs and drives"],
        ].map(([name, label]) => (
          <label key={name} className="flex items-center gap-2">
            <input type="checkbox" name={name} />
            {label}
          </label>
        ))}
      </fieldset>
    </>
  );
}
