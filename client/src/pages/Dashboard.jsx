import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  BarChart3,
  Clock,
  Trash2,
  Share2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import API from "../api";

const PollCard = ({ poll, onDelete }) => {
  // NEW: Logic to calculate the sum of all votes from all questions
  const totalVotesCount =
    poll.questions?.reduce((acc, q) => {
      return (
        acc + (q.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0)
      );
    }, 0) || 0;

  const copyToClipboard = () => {
    const voteUrl = `${window.location.origin}/vote/${poll._id}`;
    navigator.clipboard.writeText(voteUrl);
    alert("Voting link copied to clipboard!");
  };

  return (
    <div className="glass p-8 rounded-[32px] hover:border-blue-500/30 transition-all group relative border border-white/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
            {poll.title}
          </h3>
          <Link
            to={`/results/${poll._id}`}
            className="text-xs font-bold text-blue-500 flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View Live Results <ExternalLink size={12} />
          </Link>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
            title="Share"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => onDelete(poll._id)}
            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-6 text-sm font-bold opacity-40 uppercase tracking-widest">
        {/* FIXED: Now displays real calculated votes */}
        <div className="flex items-center gap-2">
          <BarChart3 size={14} /> {totalVotesCount} Votes
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} /> Live
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const { data } = await API.get("/polls/user");
      setPolls(data);
    } catch (err) {
      console.error("Failed to fetch polls:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pulse?")) return;

    try {
      await API.delete(`/polls/${id}`);
      setPolls((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-[#0f172a]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );

  return (
    <div
      className="pt-32 px-6 max-w-7xl mx-auto min-h-screen"
      style={{ background: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Your Pulses</h1>
          <p className="opacity-50 font-medium mt-2">
            Manage your real-time feedback loops
          </p>
        </div>
        <Link
          to="/create-poll"
          className="bg-blue-600 text-white p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20"
        >
          <Plus size={24} />
        </Link>
      </header>

      {polls.length === 0 ? (
        <div className="glass p-20 rounded-[40px] text-center border-dashed border-2 border-white/10">
          <p className="text-xl font-bold opacity-30 uppercase tracking-widest">
            No pulses found
          </p>
          <Link
            to="/create-poll"
            className="text-blue-500 font-bold mt-4 inline-block hover:underline"
          >
            Create your first poll &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {polls.map((poll) => (
            <PollCard key={poll._id} poll={poll} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
