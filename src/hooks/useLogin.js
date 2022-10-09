import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {

    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const {dispatch} = useAuthContext() 
    const [isCancelled,setIsCancelled] = useState(false)
    

    async function login(email,password) {
        setError(null)
        setIsPending(true)
    
    
        //login the user 
        try {
            const resp = await projectAuth.signInWithEmailAndPassword(email,password)
            //dispatch logout action
            //here payload is null
            dispatch({type:'LOGIN',payload:resp.user})
            
            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if(!isCancelled){
                console.log(err.message);
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


    return {login,error,isPending}
};