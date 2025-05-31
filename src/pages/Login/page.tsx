import useRedirection from "../../hooks/useRedirection";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {

    useRedirection();

    return (
        <LoginForm />
    )
}