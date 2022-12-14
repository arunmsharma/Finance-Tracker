//add doc from firestore collections
//and remove doc from firestore collections

import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "DELETED_DOCUMENT":
        return {
            isPending :false,
            document : null,
            success:true,
            error:null
        }

    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, disptach] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only disptach if not cancelled
  const disptachIfNotCancelled = (action) => {
    if (!isCancelled) {
      disptach(action);
    }
  };

  // add document
  const addDocument = async (doc) => {
    disptach({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({
        ...doc,
        createdAt
      });
      disptachIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      disptachIfNotCancelled({
        type: "ERROR",
        payload: err.meessage,
      });
    }
  };

  // delete the document
  const deleteDocument = async (id) => {
    disptach({
        type:"IS_PENDING"
    })
    
    try {
        await ref.doc(id).delete()
        disptachIfNotCancelled({
            type:'DELETED_DOCUMENT',
        })
    } catch (err) {
        disptachIfNotCancelled({
            type:'ERROR',
            payload:'could not delete'
        })
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    addDocument,
    deleteDocument,
    response,
  };
};
