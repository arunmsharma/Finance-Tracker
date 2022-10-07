import { useState } from "react";
import { projectAuth } from "../firebase/config";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
    

    try {
        //sign up user
        const resp = await projectAuth.createUserWithEmailAndPassword(email,password)
        console.log(resp.user);

        if(!resp){
            throw new Error("Could not complete signup")
        }

        // add display name to user
        await resp.user.updateProfile({displayName:displayName})

        setIsPending(false)
        setError(null)

    } catch (err) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
    }

  };


  return {
    error,
    isPending,
    signup,
  };
}
