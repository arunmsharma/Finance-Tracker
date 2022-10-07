import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {

    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const {dispatch} = useAuthContext() 

    async function logout() {
        setError(null)
        setIsPending(true)
    
    
        //sign the user out
        try {
            await projectAuth.signOut()
            //dispatch logout action
            //here payload is null
            dispatch({type:'LOGOUT'})
    
            setIsPending(false)
            setError(null)
        } catch (err) {
            console.log(err.message);
            setError(err.message)
            setIsPending(false)
        }
    }


    return {logout,error,isPending}
};