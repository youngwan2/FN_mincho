import PulseLoader from "react-spinners/PulseLoader";

export default function PulseSpinner() {
    return (
        <PulseLoader
            className="mx-auto mt-10"
            size={15}
            color="#05D182"
            aria-label="Loading Spinner"
        />
    )
}