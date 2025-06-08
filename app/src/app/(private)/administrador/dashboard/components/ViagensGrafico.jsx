import React, { useState, useEffect } from "react";


import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion"
export const ViagensGrafico = () => {

    const [viagensPorDia, setViagensPorDia] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/viagens-por-dia')
            .then((res) => res.json())
            .then((data) => setViagensPorDia(
                data.qtd_viagens.map((item) => ({
                    ...item,
                    data: new Date(item.data).toLocaleDateString("pt-BR"), // formata data: dd/mm/aaaa
                }))
            )
            );
    }, []);

    return (
        <motion.div className="grafico bg-white blackdrop-blur-md rounded-xl p-4 md:p-6 mx-2 md:mx-0"
        initial={{opacity: 0, y: 20}} animate={{opacity: 1, y:0}} transition={{delay: 0.2, duration:0.5}}>
            <h2 className="titulo-grafico  mb-4 text-gray-100 text-left">
                Viagens por dia
            </h2>

            <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%" >
                    <LineChart data={viagensPorDia}>
                        <CartesianGrid strokeDasharray="3 3" stroke="black"></CartesianGrid>
                        <XAxis dataKey="data" stroke="black" tick={{ fontSize: 12 }} interval="preserveStartEnd"></XAxis>
                        <YAxis stroke="gray" tick={{ fontSize: 12 }} width={40}></YAxis>
                        <Tooltip contentStyle={{
                            backgroundColor: "white",
                            borderColor: "#fdfdfd",
                            fontSize: "12px",
                        }}
                            itemStyle={{ color: "#ABADBF" }}></Tooltip>
                        <Line type="monotone" dataKey="total_viagens" stroke="magenta" strokeWidth={3} dot={{ fill: "pink", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 2 }}></Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
