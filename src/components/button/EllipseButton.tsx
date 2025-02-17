import { type EllipseButton } from "../../types/button.types";

export default function EllipseButton({btnName}:EllipseButton){

    return (
        <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center">
            {btnName}
        </button>
    )
}