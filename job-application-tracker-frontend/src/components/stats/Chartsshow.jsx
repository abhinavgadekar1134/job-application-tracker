import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const Chartsshow = () => {
    useEffect(() => {
        fetchStats();
    })

    const [total, setTotal] = useState();
    const [applied, setapplied] = useState();
    const [interview, setinterview] = useState();
    const [rejected, setRejected] = useState();
    const [offer, setOffer] = useState();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const fetchStats = async () => {
        const token = localStorage.getItem('token')
        const data = await axios.get(`${BACKEND_URL}/getDashboardStat`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // <--- JWT Bearer token
            },
        });
        // console.log(data.data);
        setTotal(data.data.total);
        setapplied(data.data.applied);
        setinterview(data.data.interview);
        setRejected(data.data.rejected);
        setOffer(data.data.offer);
    }
    const chartData = [
        { status: "Applied", count:applied },
        { status: "Interview", count: interview },
        { status: "Rejected", count: rejected},
        { status: "Offer", count: offer },
    ];
    return (
        <><br /><br /><br />
            <div className="bg-white rounded-2xl border shadow-sm p-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Applications by Status
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Chartsshow
