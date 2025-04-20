import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const initialState = {
    jobs : [],
    filters: {
        title: '',
        location: '',
        type: '',
        salary: [0, 100], 
      },
}

function jobReducer(state,action){
    switch(action.type){
        case "SET_JOBS":
         return {...state,jobs:action.payload};
        case "ADD_JOB":
         return {...state, jobs: [action.payload,...state.jobs]};
        case "FILTERS":
            return {...state,filters:action.payload};
        default:
         return state;
    }
}

const JobContext = createContext();

export function JobProvider ({children}){
    const [state,dispatch] = useReducer(jobReducer,initialState);

    return (
        <JobContext.Provider value={{state,dispatch}}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobContext = () => useContext(JobContext)