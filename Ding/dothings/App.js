import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GitHubStatsChart = () => {
  const [stats, setStats] = useState([]);

  const fetchGitHubData = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/edwingeorgeshaji');
      const newStat = {
        time: new Date().toLocaleTimeString(),
        followers: response.data.followers,
        public_repos: response.data.public_repos,
      };
      setStats((prev) => [...prev.slice(-9), newStat]); // Keep last 10 records
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  useEffect(() => {
    fetchGitHubData();
    const interval = setInterval(fetchGitHubData, 60000); // Update every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">GitHub Profile Stats (Real-time)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="followers" stroke="#3b82f6" name="Followers" />
          <Line type="monotone" dataKey="public_repos" stroke="#10b981" name="Public Repos" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GitHubStatsChart;
