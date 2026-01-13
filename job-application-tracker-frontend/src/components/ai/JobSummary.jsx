import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const JobSummary = (e) => {
  const { id } = useParams();
  const [summary, setSummary] = useState();
  const generateSummary = async (e) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try { 

      const data = {
        "requestType": "Give summary",
        "prompt": "",
        "applicationId": id
      }
      const res = await axios.post(`${BACKEND_URL}/submitAiReq`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // console.log(res)
      // console.log(res.data.res)
      setSummary(res.data.res)


    } catch (e) {
      console.log(e);
    }


  }

  useEffect(() => {

    generateSummary()
  }, []);
  if(!summary) return <><p>Loading..</p></>
  return (
    <>

      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        🤖✨ AI-Generated Job Summary
      </h4>

      <div className="bg-gray-50 border rounded-lg p-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          📌 {summary}
        </p>
      </div>
    </>
  )
}

export default JobSummary
