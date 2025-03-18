import express from 'express';
const router = express.Router();
import ollama from 'ollama';

let currentMessage = ''; // To store the latest message for streaming

router.post('/nonstream', async(req, res) => {
    let fullResponse = '';
        const data= req.body.data;
        const message = { role: 'user', content: `data=${data} , You are a medical AI assistant. Analyze the patient's historical medical data provided below and generate a comprehensive report.
         The report should be formatted into the following sections: 
            1. **Summary**: Summarize the key trends in the patient's data, highlighting any significant changes over time. 
            2. **Risk Assessment**: Identify potential health risks based on the data provided and compare values to standard medical ranges.
            3. **Predictive Analytics**: Based on historical trends, predict possible future health outcomes or changes in the parameters.
            4. **Lifestyle Suggestions**: Provide actionable and evidence-based recommendations for improving or maintaining the patient’s health.
            5. **Comparative Analysis**: Compare the patient’s data to average population values and clinical benchmarks for similar demographics (e.g., age, gender).
            6. **Recommendations**: Offer specific recommendations for further medical evaluation or lifestyle changes based on the data.
            ### Guidelines:
            - Use concise, medically accurate language.
            - Do not provide any other sections beyond the ones listed.
            - Avoid making assumptions beyond the provided data.
            - Do not include any introductory or context setting messages or any notes
            ` };
        const response = await ollama.chat({ model: 'llama3.2', messages: [message] })
        
        res.json({ response: response.message.content });

    }
);

router.post('/chat', async (req, res) => {

    const data= req.body.data;
    
    const message = { role: 'user', content: data };
    const response = await ollama.chat({ model: 'llama3.2', messages: [message] })
    console.log(response.message.content)
    res.json({ response: response.message.content });
});

router.get('/stream', async (req, res) => {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        // const message = { role: 'user', content: currentMessage };
        // const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: true });
        const data= req.body.data;
        const date = req.body.date;
        const message = { role: 'user', content: `creatine=${data},dates=${date} considering the following data. provide insight about rate of change(trend) of this data measure how the parameter
        is changing over time.next provide health trend projections like predict future trajectory if current trends continue. maxiumum three points per output insight.
        .make sure you only provide four headings with brief short points (single sentence).1)Rate of change,2)Trend analysis,3)Health Trend projections,4)Future trajectory.do not provide any sorts of code. i only need textual insights` };
        const response = await ollama.chat({ model: 'llama3.2', messages: [message],stream:true })

        for await (const part of response) {
            const chunk = part.message.content;
            console.log(chunk); // Log the chunk
            res.write(`data: ${chunk}\n\n`); // Stream each chunk to the client
        }

        res.write(`data: [DONE]\n\n`); // Indicate completion
        res.end();
    } catch (error) {
        console.error(error);
        res.write(`data: [ERROR]\n\n`);
        res.end();
    }
});


router.post('/stream', async (req, res) => {
    // const data = req.body.data;
    // console.log(data)
    // const message = { role: 'user', content: data };

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        //const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: true });
        const data= req.body.data;
        const date = req.body.date;
        const message = { role: 'user', content: `creatine=${data},dates=${date} considering the following data. provide insight about rate of change(trend) of this data measure how the parameter
        is changing over time.next provide health trend projections like predict future trajectory if current trends continue. maxiumum three points per output insight.
        .make sure you only provide four headings with brief short points (single sentence).1)Rate of change,2)Trend analysis,3)Health Trend projections,4)Future trajectory,4. i do not require any kind of code or any introudctory statements or context-setting statements. only the insights you are generating` };
        const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: true  })

        for await (const part of response) {
            const chunk = part.message.content;
            console.log(chunk); // Log the chunk
            res.write(`data: ${chunk}\n\n`); // Stream each chunk to the client
        }

        res.write(`data: [DONE]\n\n`); // Indicate completion
        res.end();
    } catch (error) {
        console.error(error);
        res.write(`data: [ERROR]\n\n`);
        res.end();
    }
});

export default router;
