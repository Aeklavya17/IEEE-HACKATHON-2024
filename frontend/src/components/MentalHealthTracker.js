import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/MentalHealthTracker.css';

const App = () => {
    const [userId, setUserId] = useState(''); // State for user ID
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [pulse, setPulse] = useState('');
    const [glucose, setGlucose] = useState('');
    const [spo2, setSpo2] = useState('');
    const [pi, setPi] = useState('');
    const [pr, setPr] = useState('');
    const [fvc, setFvc] = useState('');
    const [fev1, setFev1] = useState('');
    const [pef, setPef] = useState('');
    const [output, setOutput] = useState([]);
    const [report, setReport] = useState(null); // State for receipt/report

    const generateText = async (inputData) => {
        const apiKey = 'AIzaSyDVNXwlPuF8_4fujKMvH8X9ljJVjaW0cMM';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        
        const body = {
            contents: [{
                parts: [{ text: inputData }]
            }]
        };

        try {
            const response = await axios.post(endpoint, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const textPart = response.data.candidates[0].content.parts[0].text.replace(/\*\*/g, '');
            return textPart;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const processInput = async () => {
        setOutput([]); // Clear previous output
        setReport(null); // Clear previous report

        const inputText = `
        Health Metrics Summary:
        - Blood Pressure (SYS/DIA): ${systolic}/${diastolic} mmHg
        - Pulse: ${pulse} bpm
        - Blood Glucose: ${glucose} mg/dL
        - SpO2: ${spo2}%, Perfusion Index (PI): ${pi}%, Pulse Rate (PR): ${pr} bpm
        - Lung Function: FVC: ${fvc} L, FEV1: ${fev1} L, PEF: ${pef} L/min
        Provide relevant health insights based on these values, also provide in bullet format.
        `;

        const response = await generateText(inputText);

        if (response) {
            const bulletPoints = response.split('\n').filter(line => line.trim() !== '');
            setOutput(bulletPoints); // Set the output as an array of bullet points

            // Send data to the backend
            await sendDataToBackend();
        }
    };

    const sendDataToBackend = async () => {
        try {
            // Send blood pressure data
            await axios.post('/add_blood_pressure', {
                user_id: userId,
                systolic,
                diastolic,
                pulse
            });

            // Send glucose data
            await axios.post('/add_blood_glucose', {
                user_id: userId,
                glucose_level: glucose
            });

            // Send oximeter data
            await axios.post('/add_oximeter', {
                user_id: userId,
                spo2,
                perfusion_index: pi,
                pulse_rate: pr
            });

            // Send lung function data
            await axios.post('/add_lung_function', {
                user_id: userId,
                fvc,
                fev1,
                pef
            });

            // Generate report receipt
            generateReportReceipt();
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
    };

    const generateReportReceipt = () => {
        const receipt = `
            Health Metrics Receipt:
            - User ID: ${userId}
            - Blood Pressure: ${systolic}/${diastolic} mmHg
            - Pulse: ${pulse} bpm
            - Blood Glucose: ${glucose} mg/dL
            - SpO2: ${spo2}%
            - Perfusion Index: ${pi}%
            - Pulse Rate: ${pr} bpm
            - Lung Function: FVC: ${fvc} L, FEV1: ${fev1} L, PEF: ${pef} L/min
        `;
        setReport(receipt);
    };

    const boldKeyPoints = (text) => {
        return text
            .replace(/Blood Pressure/g, '<strong>Blood Pressure</strong>')
            .replace(/Pulse/g, '<strong>Pulse</strong>')
            .replace(/Blood Glucose/g, '<strong>Blood Glucose</strong>')
            .replace(/SpO2/g, '<strong>SpO2</strong>')
            .replace(/Perfusion Index/g, '<strong>Perfusion Index</strong>')
            .replace(/Pulse Rate/g, '<strong>Pulse Rate</strong>')
            .replace(/Lung Function/g, '<strong>Lung Function</strong>')
            .replace(/FVC/g, '<strong>FVC</strong>')
            .replace(/FEV1/g, '<strong>FEV1</strong>')
            .replace(/PEF/g, '<strong>PEF</strong>');
    };

    return (
        <div className="App">
            <h1>Multi-Metric Health Insight Generator</h1>
            <div className="form-section">
                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div className="form-section">
                <h2>Blood Pressure & Pulse</h2>
                <label>Systolic (mmHg):</label>
                <input type="text" value={systolic} onChange={(e) => setSystolic(e.target.value)} />
                <label>Diastolic (mmHg):</label>
                <input type="text" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} />
                <label>Pulse (bpm):</label>
                <input type="text" value={pulse} onChange={(e) => setPulse(e.target.value)} />
            </div>

            <div className="form-section">
                <h2>Blood Glucose</h2>
                <label>Blood Glucose (mg/dL):</label>
                <input type="text" value={glucose} onChange={(e) => setGlucose(e.target.value)} />
            </div>

            <div className="form-section">
                <h2>Oxygen Saturation</h2>
                <label>SpO2 (%):</label>
                <input type="text" value={spo2} onChange={(e) => setSpo2(e.target.value)} />
                <label>Perfusion Index (PI) (%):</label>
                <input type="text" value={pi} onChange={(e) => setPi(e.target.value)} />
                <label>Pulse Rate (PR) (bpm):</label>
                <input type="text" value={pr} onChange={(e) => setPr(e.target.value)} />
            </div>

            <div className="form-section">
                <h2>Lung Function</h2>
                <label>FVC (L):</label>
                <input type="text" value={fvc} onChange={(e) => setFvc(e.target.value)} />
                <label>FEV1 (L):</label>
                <input type="text" value={fev1} onChange={(e) => setFev1(e.target.value)} />
                <label>PEF (L/min):</label>
                <input type="text" value={pef} onChange={(e) => setPef(e.target.value)} />
            </div>

            <button onClick={processInput}>Process Input</button>

            <div>
                <h2>Output:</h2>
                <ul className="output-list">
                    {output.map((bullet, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: boldKeyPoints(bullet) }}></li>
                    ))}
                </ul>
            </div>

            {report && (
                <div className="receipt">
                    <h2>Health Metrics Receipt</h2>
                    <pre>{report}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
