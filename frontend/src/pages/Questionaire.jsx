import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Questionaire = () => {
    const navigate = useNavigate();
    const { level } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await API.get(`/questions/${level}`);
                // console.log(level);
                setQuestions(response.data.questions);
                // console.log(questions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        fetchQuestions();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await API.post(`/questions/submit/${level}`, {answers});
            console.log(response.data.recommendations);
           navigate(`/recommendations` , { state: {recommendations: response.data.recommendations}});
        } catch (error) {
            console.error("Error in submitting answers:", error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            <Navbar />

            {/* Container */}
            <div className="max-w-2xl mx-auto px-6 py-12">

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-slate-500">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </p>
                        <p className="text-xs text-slate-500">
                            {questions.length > 0 ? Math.round(((currentQuestionIndex + 1) * 100) / questions.length) : 0}%
                        </p>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full">
                        <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" style={{
                            width: `${questions.length > 0
                                ? ((currentQuestionIndex + 1) * 100) / questions.length
                                : 0}%`
                        }}></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">

                    <h2 className="text-lg font-semibold mb-6 leading-relaxed text-slate-900">
                        {questions[currentQuestionIndex]?.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">

                        {questions[currentQuestionIndex]?.options.map((option, index) => (
                            <div
                                onClick={() => setAnswers(prev => ({...prev, [currentQuestionIndex]:{questionId:questions[currentQuestionIndex]._id,selectedOption:option.text,weight:option.weight, category:questions[currentQuestionIndex].category}}))}
                                key={index}
                                className={`p-3.5 border rounded-lg cursor-pointer transition-all duration-200 text-sm ${
                                    answers[currentQuestionIndex] && answers[currentQuestionIndex].weight === option.weight
                                        ? "border-indigo-500 bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200"
                                        : "border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {option.text}
                            </div>
                        ))}

                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">

                    <button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        disabled={currentQuestionIndex === 0}
                        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 text-sm shadow-sm"
                    >
                        Previous
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-sm"
                        >
                            Next
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length !== questions.length}
                            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-sm"
                        >
                            Submit
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Questionaire
