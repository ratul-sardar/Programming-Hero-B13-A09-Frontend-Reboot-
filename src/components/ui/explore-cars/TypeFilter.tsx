import { Trash } from "lucide-react";

type props = {
  active: string;
  carFilterTypes: string[];
  setType: (type: string) => void;
};

const activeStyle = "border-gray-950 bg-gray-950 text-white";
const inActiveStyle =
  "text-gray-800 border-gray-800 hover:bg-gray-950 hover:text-white transition-all duration-400 ease-in-out";

export default function TypeFilter({ active, carFilterTypes, setType }: props) {
  return (
    <>
      <button
        type="button"
        onClick={() => setType("")}
        className="w-full cursor-pointer flex items-center justify-center gap-1 text-sm border py-1 px-2 rounded-full bg-red-500 text-red-100 border-red-500 hover:bg-red-400 transition-all duration-400 ease-in-out"
      >
        <Trash size={16}></Trash>
        Reset Filter
      </button>
      <div className="w-full h-fit flex lg:flex-col max-lg:flex-wrap items-start justify-center gap-1.5">
        {carFilterTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setType(type)}
            className={`w-fit lg:w-full shrink-0 cursor-pointer text-sm border py-1 px-2 rounded-full ${active === type ? activeStyle : inActiveStyle}`}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
}
