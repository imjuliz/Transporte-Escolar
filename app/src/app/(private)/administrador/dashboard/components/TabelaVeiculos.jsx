"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";

export const VeiculosTable = () => {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/listarVeiculos")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar dados da API");
                return res.json();
            })
            .then((data) => {
                setVeiculos(data.veiculos || data); // Fallback para diferentes formatos
            })
            .catch((err) => {
                console.error("Erro ao buscar veículos:", err);
            });
    }, []);

    return (
        <motion.div
            className="bg-white shadow-lg rounded-xl p-4 md:p-6 mx-2 md:mx-0 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-6">
                <h2 className="titulo-grafico  mb-4 text-gray-100 text-left">
                    Veículos
                </h2>


            </div>

            <div className="overflow-x-auto">
                <table className="tabela min-w-full border border-gray-300 rounded-xl">
                    <thead className="bg-gray-100">
                        <tr>
                            {["ID", "Placa", "ID Motorista", "Modelo", "Marca"].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-300"
                                    >
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {veiculos.map((veiculo) => (
                            <motion.tr
                                key={veiculo.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.3 }}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="px-4 py-2">{veiculo.id}</td>
                                <td className="px-4 py-2">{veiculo.placa}</td>
                                <td className="px-4 py-2">{veiculo.motorista_id}</td>
                                <td className="px-4 py-2">{veiculo.modelo}</td>
                                <td className="px-4 py-2">{veiculo.marca}</td>

                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="botao-cadastro">
                <a href="/administrador/registrar-veiculo"><button className="botao">Registrar Veículos</button></a>
            </div>
        </motion.div>
    );
};
