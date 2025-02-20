import useRedirection from "../../hooks/useRedirection";
import SignupForm from "./components/SignupForm";

export default function RegisterPage() {

     useRedirection();
    
    return (
        <SignupForm />
    )
}