"use client"

import React, { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis , Tooltip, Legend, Bar} from "recharts";


export const IncidentesChart = () => {
    const [incidentesData, setIncidentesData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/contar-incidentes')
            .then((res) => res.json())
            .then((data) => setIncidentesData(data.incidentes));
    }, [])

    return (
        <motion.div className="grafico bg-white rounded-xl p-4 md:p-6 mx-2 md:mx-0 mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <h2 className="titulo-grafico  mb-4 text-gray-100 text-left">
                Incidentes
            </h2>

            <div className="w-full h-64 md:h-72">
                <ResponsiveContainer>
                    <BarChart data={incidentesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="black"></CartesianGrid>
                        <XAxis dataKey="tipo" stroke="black" tick={{ fontSize: 12 }} interval="preserveStartEnd"></XAxis>
                        <YAxis stroke="black" tick={{ fontSize: 12 }} width={40} ></YAxis>
                        <Tooltip contentStyle={{ backgroundColor: "#FDFDFD", borderColor: "gray", fontSize: "12px", }} itemStyle={{ color: "black" }}></Tooltip>
                        {/*<Legend wrapperStyle={{fontSize: 12}}></Legend>*/}
                            <Bar dataKey="quantidade" fill="#013FF6" radius={[4, 4, 0, 0]}barSize={20}></Bar>
                        
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )

}