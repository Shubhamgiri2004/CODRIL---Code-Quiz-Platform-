"use client"

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

export function StarButton() {
    const [isHovered, setIsHovered ] = useState(false);
    const controls = useAnimation()
    const startIconControls = useAnimation()

    useEffect(()=>{
        async function fetchStars() {
            try{
                controls.start({ opacity: 1, y: 0, scale:1 })
                setTimeout(async ()=>{
                    await controls.start({ scale: 1.1, transition: { duration: 0.3}})
                    await controls.start({ scale: 1, transition: { duration: 0.2}})
                })
            }
        }
    })
}