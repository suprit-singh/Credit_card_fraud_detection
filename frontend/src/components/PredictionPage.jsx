import {Info, SearchCheck} from 'lucide-react';
import React from 'react'
import { useState } from 'react';
const PredictionPage = () => {
    const [formData, setFormData] = useState({
        amt: "",
        hour: "",
        category: "",
        gender: "",
        city_pop: "",
        merchant: "",
        city: "",
        state: "",
        job: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        
        const fieldsToLowercase = ["category", "gender", "city", "state", "job", "merchant"];
      
        setFormData({
          ...formData,
          [name]: fieldsToLowercase.includes(name) ? value.toLowerCase() : value
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to fetch. Please check server.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div>
                <div className='flex gap-2 items-center font-semibold text-lg text-slate-200 mt-6 lg:mx-24'>Please fill in the details <div><Info color='yellow'/></div></div>
                
                <form className='mt-12 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className=' flex flex-col gap-3 justify-center lg:flex-row'>
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="amt" placeholder="Amount" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="hour" placeholder="Hour of Day" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="category" placeholder="Category" onChange={handleChange} required />
                    </div>

                    <div className='flex flex-col  gap-3 justify-center lg:flex-row'>
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="gender" placeholder="Gender" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="city_pop" placeholder="City Population" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="merchant" placeholder="Merchant" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col gap-3 justify-center lg:flex-row'>
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="city" placeholder="City" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="state" placeholder="State" onChange={handleChange} required />
                        <input className='my-2 w-72 border border-slate-800 px-4 py-2 rounded-md' name="job" placeholder="Job" onChange={handleChange} required />
                    </div>
                    <div className='flex justify-center'>
                        <button className='flex gap-2 items-center text-lg font-bold text-slate-100 border border-slate-900 px-5 py-2 rounded-lg w-fit bg-indigo-600' type="submit" disabled={loading}>
                            {loading ? "Detecting..." : "Click to Detect"} 
                            <SearchCheck/>
                        </button>
                    </div>

                </form>
            </div>
            {loading && <p className='flex justify-center text-slate-200 mt-2'>Loading prediction...</p>}

            {result && (
                <div className='flex flex-col items-center justify-center mt-3'>
                    <h2 className="font-bold text-slate-100 mb-2">
                        Prediction: {result.prediction === 1 ? "🚨 Fraud" : "✅ Legitimate"}
                    </h2>
                    <p className="font-bold text-slate-100">
                    Fraud Probability: {(result.probability * 100).toFixed(2)}%

                    </p>
                </div>
            )}
        </div>
    )
}

export default PredictionPage
