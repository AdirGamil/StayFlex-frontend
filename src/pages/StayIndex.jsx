import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    return <h1>Hello from StayIndex</h1>
}