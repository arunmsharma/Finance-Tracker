import { useState,useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //sign up user
      const resp = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!resp) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await resp.user.updateProfile({ displayName: displayName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: resp.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      // cleanup
      setIsCancelled(true);
    };
  }, []);

  return {
    error,
    isPending,
    signup,
  };
}
