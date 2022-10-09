import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const {dispatch} = useAuthContext() 
    const [isCancelled,setIsCancelled] = useState(false)
    

    async function logout() {
        setError(null)
        setIsPending(true)
    
    
        //sign the user out
        try {
            await projectAuth.signOut()
            //dispatch logout action
            //here payload is null
            dispatch({type:'LOGOUT'})
            
            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            console.log(err.message);
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        
        return () => {
            // cleanup
            setIsCancelled(true)
        };
    }, []);


    return {logout,error,isPending}
};