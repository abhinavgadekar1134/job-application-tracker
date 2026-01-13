import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Cards = () => {
    useEffect(()=>{
        fetchStats();
    })
 
    const [total,setTotal] = useState();
    const [applied,setapplied] = useState();
    const [interview,setinterview] = useState();
    const [rejected,setRejected] = useState();
    const [offer,setOffer] = useState();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const fetchStats = async()=>{
        const token = localStorage.getItem('token')
        const data = await axios.get(`${BACKEND_URL}/getDashboardStat`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // <--- JWT Bearer token
          },
        });
        // console.log(data.data);s
        setTotal(data.data.total);
        setapplied(data.data.applied);
        setinterview(data.data.interview);
        setRejected(data.data.rejected);
        setOffer(data.data.offer);
    }
    return (
        <>
        <div className='max-w-7xl mx-auto px-6 py-6'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                {/* Total Applications */}
                <div className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Applications
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                                {total}
                            </h2>
                        </div>
                        <div className="text-3xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 p-4 rounded-xl">
                            📌
                        </div>
                    </div>
                </div>

                {/* Applied */}
                <div className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Applied
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                                {applied}
                            </h2>
                        </div>
                        <div className="text-3xl bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 p-4 rounded-xl">
                            ⏳
                        </div>
                    </div>
                </div>

                {/* Interviews */}
                <div className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Interviews
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                                {interview}
                            </h2>
                        </div>
                        <div className="text-3xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 p-4 rounded-xl">
                            📞
                        </div>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Rejected */}
                <div className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Rejected
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                                {rejected}
                            </h2>
                        </div>
                        <div className="text-3xl bg-gradient-to-br from-red-100 to-red-200 text-red-700 p-4 rounded-xl">
                            ❌
                        </div>
                    </div>
                </div>

                {/* Offers */}
                <div className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Offers
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                                {offer}
                            </h2>
                        </div>
                        <div className="text-3xl bg-gradient-to-br from-green-100 to-green-200 text-green-700 p-4 rounded-xl">
                            🎯
                        </div>
                    </div>
                </div>

            </div>

        </div>


        </>
    )
}

export default Cards
