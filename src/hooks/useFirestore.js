//add doc from firestore collections
//and remove doc from firestore collections

import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error : null,
    success : null
}

const firestoreReducer = (state,action) => {
    switch(action.type){
        default:
            return state
    }
}


export const useFirestore = (collection) => {

    const [response, disptach] = useReducer(firestoreReducer,initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection)

    // add document 
    const addDocument = (doc) => {
        
    }

    // delete the document
    const deleteDocument = (id) => {

    }

    useEffect(()=> {
        return () => {
            setIsCancelled(true)
        }
    },[])

    return {
        addDocument,deleteDocument,response
    }
    
    
}