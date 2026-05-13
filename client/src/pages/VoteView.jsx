// src/pages/VoteView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import API from '../api';

const VoteView = () => {
  const { id } = useParams(); // Matches :id in App.jsx
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        // This is the specific public route we verified earlier
        const { data } = await API.get(`/polls/public/${id}`);
        setPoll(data);
      } catch (err) {
        setError("This pulse doesn't exist or has been moved.");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (qIdx, oIdx) => {
    setSubmitting(true);
    try {
      // Matches the PATCH /vote/:id route in your backend
      await API.patch(`/polls/vote/${id}`, { 
        questionIndex: qIdx, 
        optionIndex: oIdx 
      });
      navigate(`/results/${id}`);
    } catch (err) {
      alert("Voting failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pt-40 text-center font-bold animate-pulse">Loading Pulse...</div>;
  if (error) return <div className="pt-40 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="pt-32 px-6 max-w-2xl mx-auto pb-20">
      <h1 className="text-5xl font-black mb-12 tracking-tighter">{poll?.title}</h1>
      
      {poll?.questions.map((q, qIdx) => (
        <div key={qIdx} className="glass p-10 rounded-[40px] mb-8 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold mb-8">{q.text}</h3>
          <div className="grid gap-4">
            {q.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                disabled={submitting}
                onClick={() => handleVote(qIdx, oIdx)}
                className="w-full text-left p-6 rounded-[24px] bg-slate-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white transition-all group flex justify-between items-center"
              >
                {/* Note: Check if your data uses opt.text or just opt */}
                <span className="font-bold text-lg">{opt.text || opt}</span>
                <CheckCircle2 className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoteView;