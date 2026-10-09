import { Oval } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <Oval
      height={80}
      width={80}
      color="oklch(64.98% 0.2379 33.23)"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="oklch(34.98% 0.24 38.23)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
