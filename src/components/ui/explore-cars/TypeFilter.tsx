import { boolean } from "better-auth";

export default function TypeFilter({
  type,
  setType,
}: {
  type: string;
  setType: any;
}) {
  return (
    <div>
      <input
        type="checkbox"
        name="type"
        className="hidden"
        id={type}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <label
        htmlFor={type}
        className="cursor-pointer py-1 px-2 rounded-full border text-gray-800 border-gray-800 hover:bg-gray-950 hover:text-white transition-all duration-400 ease-in-out"
      >
        {type}
      </label>
    </div>
  );
}
