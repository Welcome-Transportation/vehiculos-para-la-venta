const inputClass =
  "rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900";
const labelClass = "text-xs font-medium text-zinc-600 dark:text-zinc-400";

export type VehicleFieldDefaults = Partial<{
  title: string;
  price: number;
  mileage: number;
  description: string;
  city: string;
  county: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  fleetStatus: "ACTIVE_FLEET" | "PARKED";
  isAdaAccessible: boolean;
  hasSeatBelts: boolean;
  hasTVs: boolean;
  hasPASystem: boolean;
  hasWorkingRadio: boolean;
  hasBluetooth: boolean;
  hasUSBPorts: boolean;
  hasWorkingBathroom: boolean;
  isOperable: boolean;
  sellerName: string;
  sellerPhone: string;
  sellerCompany: string;
}>;

const FEATURE_FIELDS: [keyof VehicleFieldDefaults, string][] = [
  ["isAdaAccessible", "ADA accessible"],
  ["hasSeatBelts", "Seat belts"],
  ["hasTVs", "TVs"],
  ["hasPASystem", "PA system"],
  ["hasWorkingRadio", "Working radio"],
  ["hasBluetooth", "Bluetooth"],
  ["hasUSBPorts", "USB ports"],
  ["hasWorkingBathroom", "Working bathroom"],
  ["isOperable", "Operable / runs and drives"],
];

export default function VehicleFields({
  priceLabel = "Price (USD)",
  defaults,
}: {
  priceLabel?: string;
  defaults?: VehicleFieldDefaults;
}) {
  const d = defaults ?? {};

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Listing title</label>
        <input
          name="title"
          required
          defaultValue={d.title}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>{priceLabel}</label>
          <input
            name="price"
            type="number"
            min={0}
            required
            defaultValue={d.price}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Mileage (optional)</label>
          <input
            name="mileage"
            type="number"
            min={0}
            defaultValue={d.mileage}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          rows={4}
          required
          defaultValue={d.description}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2 flex flex-col gap-1">
          <label className={labelClass}>City</label>
          <input
            name="city"
            required
            defaultValue={d.city}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>County</label>
          <input
            name="county"
            required
            defaultValue={d.county}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>State</label>
          <input
            name="state"
            required
            maxLength={2}
            placeholder="FL"
            defaultValue={d.state}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>ZIP code</label>
        <input
          name="zipCode"
          required
          defaultValue={d.zipCode}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
            required
            defaultValue={d.latitude}
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
            defaultValue={d.longitude}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Fleet status</label>
        <select
          name="fleetStatus"
          className={inputClass}
          defaultValue={d.fleetStatus ?? "PARKED"}
        >
          <option value="ACTIVE_FLEET">Active fleet</option>
          <option value="PARKED">Parked</option>
        </select>
      </div>

      <fieldset className="grid grid-cols-2 gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        {FEATURE_FIELDS.map(([name, label]) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              defaultChecked={Boolean(d[name])}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Seller contact (shown on the listing)
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Name</label>
          <input
            name="sellerName"
            defaultValue={d.sellerName}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Company</label>
          <input
            name="sellerCompany"
            defaultValue={d.sellerCompany}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Phone</label>
          <input
            name="sellerPhone"
            defaultValue={d.sellerPhone}
            className={inputClass}
          />
        </div>
      </div>
    </>
  );
}
