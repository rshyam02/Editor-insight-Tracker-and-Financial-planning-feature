const API_BASE = 'http://localhost:3001/api';

export const apiService = {
  async getInsights() {
    const res = await fetch(`${API_BASE}/insights`);
    if (!res.ok) throw new Error('Failed to fetch insights');
    return res.json();
  },

  async getTasks() {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  async getEdits(file) {
    const url = file 
    ? `${API_BASE}/edits?file=${encodeURIComponent(file)}`
    : `${API_BASE}/edits`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch edits');
    return res.json();
  },

  async setActiveFile(file) {
    const res = await fetch(`${API_BASE}/set-active-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file })
    });
    if (!res.ok) throw new Error('Failed to set active file');
    return res.json();
  },

  async getRecentActivity() {
    const res = await fetch(`${API_BASE}/recent-activity`);
    if (!res.ok) throw new Error('Failed to fetch recent activity');
    return res.json();
  },

  async calculateFinancials(monthlyRevenue, growthRate, profitMargin, cashBalance) {
    const res = await fetch(`${API_BASE}/financial-calculations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monthlyRevenue, growthRate, profitMargin, cashBalance })
    });
    if (!res.ok) throw new Error('Failed to calculate financials');
    return res.json();
  },

  async calculateRevenueBreakdown(pricingPlans, inputMRR) {
    const res = await fetch(`${API_BASE}/revenue-breakdown`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pricingPlans, inputMRR })
    });
    if (!res.ok) throw new Error('Failed to calculate revenue breakdown');
    return res.json();
  }
};