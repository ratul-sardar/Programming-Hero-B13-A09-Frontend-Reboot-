import { Trash } from "lucide-react";

type props = {
  active: string;
  carFilterTypes: string[];
  setType: any;
};

const activeStyle = "border-gray-950 bg-gray-950 text-white";
const inActiveStyle =
  "text-gray-800 border-gray-800 hover:bg-gray-950 hover:text-white transition-all duration-400 ease-in-out";

export default function TypeFilter({ active, carFilterTypes, setType }: props) {
  return (
    <>
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <input
          type="checkbox"
          name="type"
          className="hidden"
          id="reset"
          value="reset"
          onChange={() => setType("")}
        />
        <label
          htmlFor="reset"
          className={`w-full cursor-pointer flex gap-1  text-sm border py-1 px-2 rounded-full bg-red-500 text-red-100 border-red-500 hover:bg-red-400 transition-all duration-400 ease-in-out"`}
        >
          <Trash size={16}></Trash>
          Reset Filter
        </label>
      </div>

      {carFilterTypes.map((type) => (
        <div key={type} className="flex items-center justify-center gap-1.5">
          <input
            type="checkbox"
            name="type"
            className="hidden"
            id={type}
            value={type}
            onChange={() => setType(type)}
          />
          <label
            htmlFor={type}
            className={`w-full cursor-pointer text-sm border py-1 px-2 rounded-full ${active === type ? activeStyle : inActiveStyle}`}
          >
            {type}
          </label>
        </div>
      ))}
    </>
  );
}
