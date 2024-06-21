import React, {createContext, useEffect, useState} from "react";
import {getAllNeedsReviewKnowledges} from "../../servicesBack/KnowledgeServices";


export const ReviewContext = createContext({});

export const ReviewProvider = ({children}) => {
    const [toReviewState, setToReviewState] = useState(0)

    useEffect(() => {
        getAllNeedsReviewKnowledges().then(res => {
            const {numberOfElements} = res.data
            setToReviewState(numberOfElements)
        }).catch(err => {
            console.log(err)
        })
    }, [toReviewState]);

    const toReview = () => {
        return toReviewState
    }

    return (
        <ReviewContext.Provider
            value={{toReview}}
        >
            {children}
        </ReviewContext.Provider>
    );
};