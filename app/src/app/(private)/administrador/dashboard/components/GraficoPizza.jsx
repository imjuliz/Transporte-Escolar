"use client"
import React, {useState, useEffect }from "react";
import {motion} from 'framer-motion';
import {  Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [ "#2FE5A7", "#FFC01D", "magenta", "#013FF6"];

export const TipoUsuarioChart = () =>{

    const [tipoData, setTipoData] = useState([])
    const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false)

    useEffect(() =>{
        fetch ('http://localhost:3001/qtd-tipo')
        .then((res) => res.json())
        .then((data) => setTipoData(data.qtd_tipo));
    }, []);

    useEffect(() =>{
        const updateScreenSize = () =>{
            setIsSmallOrMediumScreen(window.innerWidth <= 768)
        }

        updateScreenSize()
        window.addEventListener("resize", updateScreenSize)
        return() => window.removeEventListener("resize", updateScreenSize)
    }, []);

    const outerRadius = isSmallOrMediumScreen? 60 : 80

    return(
        <motion.div className="grafico bg-white backdrop-blur-md  rounded-xl p-4 md:p-6 mx-2 md:mx-0 "
        initial={{opacity: 0, y: 20}} animate={{opacity: 1, y:0}} transition={{delay: 0.2, duration:0.5}}>
            <h2 className="titulo-grafico  mb-4 text-gray-100 text-left">
                Usuários
            </h2>
            <div className="h-64 md:h-80 ">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={tipoData} cx="50%" cy="50%" labelLine={false} outerRadius={outerRadius} dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {(tipoData || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>
                    ))}
                    </Pie>
                    <Tooltip contentStyle={{
                        backgroundColor: "#FDFDFD",
                        borderBlock: "gray",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "12px",

                    }}
                    itemStyle={{color: "black"}}></Tooltip>
                    <Legend iconType="circle" layout="horizontal" align="center" wrapperStyle={{fontSize: 12}}></Legend>
                </PieChart>
            </ResponsiveContainer>
            </div>
            </motion.div>
    )
}