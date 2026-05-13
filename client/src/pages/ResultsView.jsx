import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, RefreshCcw } from 'lucide-react';
import API from '../api';

const ResultsView = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const { data } = await API.get(`/polls/${id}/results`);
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // OPTIONAL: Auto-refresh every 10 seconds for "Live" feel
    const interval = setInterval(fetchResults, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className="pt-40 text-center animate-pulse">Calculating Results...</div>;
  if (!results) return <div className="pt-40 text-center">No data found.</div>;

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
      <Link to="/dashboard" className="flex items-center gap-2 opacity-50 hover:opacity-100 mb-8 font-bold">
        <ChevronLeft size={20} /> Back to Dashboard
      </Link>

      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-black tracking-tighter">{results.title}</h1>
        <button onClick={fetchResults} className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <RefreshCcw size={20} className="opacity-50" />
        </button>
      </div>

      <div className="space-y-12">
        {results.questions.map((q, qIdx) => (
          <div key={qIdx} className="glass p-8 rounded-[40px] border border-white/10">
            <h3 className="text-2xl font-bold mb-8 flex justify-between items-center">
              {q.text}
              <span className="text-sm bg-blue-600/10 text-blue-500 px-4 py-1 rounded-full flex items-center gap-2">
                <Users size={14}/> {q.totalVotes}
              </span>
            </h3>

            <div className="space-y-6">
              {q.options.map((opt, oIdx) => {
                const percentage = q.totalVotes > 0 
                  ? Math.round((opt.votes / q.totalVotes) * 100) 
                  : 0;

                return (
                  <div key={oIdx} className="relative">
                    <div className="flex justify-between mb-2 font-bold px-2">
                      <span>{opt.text}</span>
                      <span className="text-blue-500">{percentage}%</span>
                    </div>
                    {/* The Progress Bar Container */}
                    <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      {/* The Animated Fill */}
                      <div 
                        className="h-full bg-blue-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-[10px] opacity-30 font-bold uppercase tracking-widest px-2">
                      {opt.votes} Votes
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsView;