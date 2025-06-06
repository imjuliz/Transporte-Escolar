"use client"

import React from "react";

export const StatCard = ({name, img, value}) => {
    return (
        <div className="box-infos flex p-4 w-70 h-35 flex-row rounded-xl bg-[#fff] items-center gap-4">
            
            <div className="icone">
                <img src={img} className=""></img>
            </div>
                <div className="textos">
                    <p className="numero">{value}</p>
                    <p className="titulo">{name}</p>
                </div>
                    
                
                
           
        </div>
    )
}

