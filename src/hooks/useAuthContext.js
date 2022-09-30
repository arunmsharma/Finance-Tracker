import { useContext } from "react";
import { AuthContext } from "../ context/AuthContext";

export const useAuthContext = function () {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("use of context must be inside and AuthContextProvider")
    }
 
    return context
}