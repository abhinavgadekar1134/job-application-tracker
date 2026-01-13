import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const FollowupGenerator = (e) => {
  const { id } = useParams(); 



  const [mailsub, setmailsub] = useState();


  const [p1,setp1] = useState();
  const [p2,setp2] = useState();
  const [p3,setp3] = useState();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const generateMail = async (e) => {

    try { //follow up email type or summary
      const token = localStorage.getItem('token');
      const data = {
        "requestType": "follow up Email",
        "prompt": "",
        "applicationId": id
      }
      const res = await axios.post(`${BACKEND_URL}/submitAiReq`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      setp1(res.data.res.mailbody.p1)
      setp2(res.data.res.mailbody.p2)
      setp3(res.data.res.mailbody.p3)
      setmailsub(res.data.res.subjectkey)
      // console.log(res.data.res)
      setjobshow(true);

    } catch (e) {
      console.log(e);
    }


  }

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/getJob/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((e) => console.log(e));

      setJob(res.data);
    };

    fetchJob();
    generateMail()
  }, [id]);

  if (!p1) return <p>Loading...</p>;
  return (
    <>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl border">

          {/* Header */}
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Subject: {mailsub}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              To: hr@company.com
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 text-gray-700 space-y-4">
            <p>Dear Hiring Manager</p>

            <p>
              {p1}
            </p>
            <p>
              {p2}
            </p>
            <p>
              {p3}
            </p>
            <p className="pt-4">
              Best regards, <br />
              <span className="font-medium">Abhinav Gadekar</span>
            </p>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-end gap-3 bg-gray-50">
            <button className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100">
              Edit
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FollowupGenerator
