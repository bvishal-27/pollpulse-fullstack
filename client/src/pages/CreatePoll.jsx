import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ChevronLeft } from 'lucide-react';
import API from '../api';

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', ''] }]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''] }]);
  };

  const addOption = (qIdx) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options.push('');
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    // 1. Validation
    if (!title.trim()) return alert("Please enter a poll title");
    
    const pollData = {
      title: title, // Fixed: was 'pollTitle'
      questions: questions.map(q => ({
        text: q.text,
        options: q.options.map(opt => ({
          text: opt,
          votes: 0
        })),
        isMandatory: true
      })),
      settings: {
        isPublished: true
      }
    };

    try {
      const res = await API.post('/polls/create', pollData);
      if (res.status === 201) {
        console.log("Poll Created:", res.data);
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.error("Payload sent:", pollData);
      console.error("Server responded with:", err.response?.data);
      alert(err.response?.data?.error || "Creation failed. Check console.");
    }
  };

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 opacity-50 hover:opacity-100 mb-8 font-bold"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <h1 className="text-5xl font-black tracking-tighter mb-12">Create Pulse</h1>

      <div className="space-y-6">
        <input 
          type="text" 
          placeholder="Poll Title (e.g., Team Lunch Options)"
          className="w-full bg-transparent border-b-4 border-slate-200 dark:border-white/10 text-3xl font-bold py-4 focus:border-blue-600 outline-none transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {questions.map((q, qIdx) => (
          <div key={qIdx} className="glass p-8 rounded-[32px] mt-10 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <input 
                placeholder="Your Question"
                className="w-full bg-transparent text-xl font-bold outline-none border-l-4 border-blue-600 pl-4"
                value={q.text}
                onChange={(e) => {
                  const newQ = [...questions];
                  newQ[qIdx].text = e.target.value;
                  setQuestions(newQ);
                }}
              />
              {questions.length > 1 && (
                <button 
                  onClick={() => setQuestions(questions.filter((_, i) => i !== qIdx))}
                  className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {q.options.map((opt, oIdx) => (
                <input 
                  key={oIdx}
                  placeholder={`Option ${oIdx + 1}`}
                  className="w-full bg-slate-100 dark:bg-white/5 p-4 rounded-2xl font-medium outline-none focus:ring-2 ring-blue-600/20"
                  value={opt}
                  onChange={(e) => {
                    const newQ = [...questions];
                    newQ[qIdx].options[oIdx] = e.target.value;
                    setQuestions(newQ);
                  }}
                />
              ))}
              <button 
                onClick={() => addOption(qIdx)} 
                className="text-sm font-bold text-blue-600 px-4 py-2 hover:bg-blue-600/5 rounded-xl transition-colors"
              >
                + Add Option
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-12">
          <button 
            onClick={addQuestion} 
            className="flex-1 border-2 border-slate-200 dark:border-white/10 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            Add Question
          </button>
          <button 
            onClick={handleSave} 
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Save size={20} /> Publish Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;