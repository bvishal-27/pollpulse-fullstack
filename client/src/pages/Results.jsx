import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart2, RefreshCcw, ArrowLeft, Share2 } from 'lucide-react';
import API from '../api';

const Results = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const { data } = await API.get(`/polls/${pollId}/results`);
      setPoll(data);
    } catch (err) {
      console.error("Error fetching results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // Pro-Tip: Set up an interval for "Live" updates every 10 seconds
    const interval = setInterval(fetchResults, 10000);
    return () => clearInterval(interval);
  }, [pollId]);

  if (loading) return <div className="pt-40 text-center animate-pulse font-bold">Calculating Results...</div>;

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-12">
        <Link to="/dashboard" className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:scale-110 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex gap-3">
            <button onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/vote/${pollId}`);
                alert("Link copied!");
            }} className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                <Share2 size={16} /> Share Poll
            </button>
        </div>
      </div>

      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter mb-4">{poll.title}</h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl text-xs font-black uppercase tracking-widest">
          <RefreshCcw size={12} className="animate-spin-slow" /> Live Results
        </div>
      </header>

      <div className="space-y-12">
        {poll.questions.map((q, qIdx) => (
          <div key={qIdx} className="glass p-8 rounded-[32px]">
            <h3 className="text-xl font-bold mb-8">{q.text}</h3>
            
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                // Calculate percentage
                const votes = opt.votes || 0;
                const total = q.totalVotes || 1; // Avoid division by zero
                const percentage = Math.round((votes / total) * 100);
                
                return (
                  <ProgressBar 
                    key={oIdx} 
                    label={opt.text} 
                    percentage={percentage} 
                    // Dynamic colors based on index
                    colorClass={oIdx % 2 === 0 ? "bg-blue-600" : "bg-indigo-400"} 
                  />
                );
              })}
            </div>
            <p className="mt-6 text-xs font-bold opacity-30 uppercase tracking-widest">
              Total Votes: {q.totalVotes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- THIS IS WHERE YOU ADD YOUR SNIPPET ---
const ProgressBar = ({ label, percentage, colorClass }) => (
  <div className="mb-6">
    <div className="flex justify-between font-bold text-sm mb-2 uppercase tracking-tighter">
      <span>{label}</span>
      <span className="opacity-50">{percentage}%</span>
    </div>
    <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ease-out ${colorClass}`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default Results;