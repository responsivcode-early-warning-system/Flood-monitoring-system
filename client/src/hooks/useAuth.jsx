import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    useDebugValue(context.auth, context.auth?.user ? "Logged In" : "Logged Out");
    return context;
}

export default useAuth;
