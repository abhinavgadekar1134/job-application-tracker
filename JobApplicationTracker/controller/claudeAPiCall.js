const giveResponse = async (detailes) => {


    const aiResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+process.env.GROQ_KEY,
            
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful AI assistant for job applications. Always respond in JSON with key 'answer'."
                    },
                    {
       
                        role: "user",
                        content: `
Task: ${detailes.companyName}
Company Name: ${detailes.companyName}
Job Title: ${detailes.jobTitle}
Job Type: ${detailes.jobType}
Job Location: ${detailes.jobLocation}
Job Description: ${detailes.jobDescription}
requestType:${detailes.requestType}
Instructions: ${detailes.prompt || "No extra instructions"}
Output format: Provide only JSON with key 'answer' containing the result. 
- If summarization, summarize in 2-3 sentences.
- If follow-up email , write a professional email to recruiter.if giving mail then give mailbody key and then value if in mail body give 3 paragraphs p1 p2 p3.then give subjectkey and its value.in mailbody dont give dear hr direct start give each paragraph of at least 2 to 3 lines and atmost 3 lines
`
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                max_completion_tokens: 500,
                top_p: 1,
                stream: false,
                response_format: { type: "json_object" },
                stop: null
            })
        }
    );

    if (!aiResponse.ok) {
        const text = await aiResponse.text();
        return null;
    }

    const body = await aiResponse.json();
 
    const answer = JSON.parse(body.choices[0].message.content).answer;
    return answer;



}
module.exports = { giveResponse }