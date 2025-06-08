"use client"

import React from "react";
import {motion} from "framer-motion"

export const StatCard = ({index, name, img, value}) => {
    return (
        <motion.div className="box-infos bg-white backdrop-blur-md flex p-4 w-70 h-35 overflow-hidden flex-row rounded-xl items-center gap-4"
        whileHover={{y:-5, boxShadow: "rgba(0,0,0, 0.9)"}}>
            
            <div className="icone p-3 rounded-full">
                <img src={img} className="w-8 h-8"></img>
            </div>
                <div className="textos">
                    <p className="numero">{value}</p>
                    <p className="titulo">{name}</p>
                </div>
                    
                
                
           
        </motion.div>
    )
}

