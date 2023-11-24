import React from "react"

type CardPlansType = {
    id: string
    sp: string
    objectType: 'premises' | 'equipment' | 'systems' | 'processes'
}

export const CardPlans: React.FC<CardPlansType> = ({ id, sp, objectType }) => {
    
    return <>{id} {objectType} {sp}</>
}