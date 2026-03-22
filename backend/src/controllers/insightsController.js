const data = require('../models/data');

function getActiveTask(activeFile) {
  if (!activeFile) return null;
  const matchingTasks = data.tasks.filter(task => task.relatedFiles && task.relatedFiles.includes(activeFile));
  if (matchingTasks.length === 0) return null;
  if (matchingTasks.length === 1) return matchingTasks[0];
  // For multiple, return all for display
  return { multiple: true, tasks: matchingTasks };
}

function getEditActivitySummary(activeFile) {
  if (!activeFile) return { totalEdits: 0, totalLinesChanged: 0 };
  const fileEdits = data.editEvents.filter(event => event.file === activeFile);
  const totalEdits = fileEdits.length;
  const totalLinesChanged = fileEdits.reduce((sum, event) => sum + (event.linesAdded || 0) + (event.linesRemoved || 0), 0);
  return { totalEdits, totalLinesChanged };
}

function getTaskStatus(activeFile, activeTask) {
  if (!activeTask) return 'Unassigned Work';

  const fileEdits = data.editEvents.filter(event => event.file === activeFile);

  if (activeTask.multiple) {
    return fileEdits.length > 0
      ? 'In Progress (Ambiguous)'
      : 'Not Started (Ambiguous)';
  }

  if (fileEdits.length === 0) return 'Not Started';

  // KEY CHANGE: use active file, not time
  if (activeFile === data.currentActiveFile) return 'In Progress';

  return 'Recently Active';
}

function getInsights(activeFile) {
  const activeFileToUse = activeFile || data.currentActiveFile;
  const activeTask = getActiveTask(activeFileToUse);
  const summary = getEditActivitySummary(activeFileToUse);
  const status = getTaskStatus(activeFileToUse, activeTask);
  const lastEdited = data.editEvents.filter(e => e.file === activeFileToUse).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))[0]?.timestamp || null;
  let activeTaskName = 'None';
  if (activeTask) {
    if (activeTask.multiple) {
      activeTaskName = activeTask.tasks.map(t => t.name).join(', ');
    } else {
      activeTaskName = activeTask.name;
    }
  }
  return {
    activeFile: activeFileToUse || 'None',
    activeTask: activeTaskName,
    lastEdited,
    numberOfEditEvents: summary.totalEdits,
    totalLinesChanged: summary.totalLinesChanged,
    status
  };
}

function getTasks() {
  return data.tasks;
}

function getEdits(activeFile) {
  const fileToUse = activeFile || data.currentActiveFile;
  return data.editEvents.filter(event => event.file === fileToUse);
}

function getRecentActivity() {
  return data.recentActivity.slice(0, 5); // Return last 5 activities
}

function setActiveFile(file) {
  // In real app, validate file exists, but for mock, just set
  data.currentActiveFile = file;

  // Add to recent activity (avoid duplicates, keep most recent)
  const existingIndex = data.recentActivity.findIndex(activity => activity.file === file);
  const newActivity = {
    file,
    timestamp: new Date().toISOString(),
    action: 'accessed'
  };

  if (existingIndex >= 0) {
    // Move existing entry to front
    data.recentActivity.splice(existingIndex, 1);
  }

  // Add to beginning and keep only last 5
  data.recentActivity.unshift(newActivity);
  data.recentActivity = data.recentActivity.slice(0, 5);

  return { success: true, activeFile: file };
}

function calculateFinancials(monthlyRevenue, growthRate, profitMargin, cashBalance) {
  // Convert percentages to decimals
  const growthRateDecimal = growthRate / 100;
  const profitMarginDecimal = profitMargin / 100;

  // 1. Annual Revenue (ARR)
  const arr = monthlyRevenue * 12;

  // 2. Revenue Forecast (next 12 months)
  const revenueForecast = [];
  let currentRevenue = monthlyRevenue;
  
  for (let month = 1; month <= 12; month++) {
    revenueForecast.push({
      month,
      revenue: Math.round(currentRevenue * 100) / 100 // Round to 2 decimal places
    });
    currentRevenue *= (1 + growthRateDecimal);
  }

  // 3. Monthly Profit (using first month's revenue)
  const monthlyProfit = monthlyRevenue * profitMarginDecimal;

  // 4. Runway calculation
  let runway;
  if (monthlyProfit < 0) {
    // Making a loss
    const monthlyLoss = Math.abs(monthlyProfit);
    runway = Math.floor(cashBalance / monthlyLoss);
  } else {
    // Profitable
    runway = 'Infinite';
  }

  return {
    arr: Math.round(arr * 100) / 100,
    revenueForecast,
    monthlyProfit: Math.round(monthlyProfit * 100) / 100,
    runway,
    inputs: {
      monthlyRevenue,
      growthRate,
      profitMargin,
      cashBalance
    }
  };
}

function calculateRevenueBreakdown(pricingPlans, inputMRR) {
  // Calculate total revenue from pricing plans
  const totalFromPlans = pricingPlans.reduce((total, plan) => {
    return total + (plan.pricePerMonth * plan.customerCount);
  }, 0);

  const difference = totalFromPlans - inputMRR;

  return {
    totalFromPlans: Math.round(totalFromPlans * 100) / 100,
    inputMRR,
    difference: Math.round(difference * 100) / 100,
    pricingPlans,
    isMatch: Math.abs(difference) < 0.01 // Consider match if difference is less than 1 cent
  };
}

module.exports = {
  getInsights,
  getTasks,
  getEdits,
  getRecentActivity,
  setActiveFile,
  calculateFinancials,
  calculateRevenueBreakdown
};