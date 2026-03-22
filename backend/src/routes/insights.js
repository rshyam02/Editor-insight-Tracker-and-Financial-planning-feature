const express = require('express');
const router = express.Router();
const controller = require('../controllers/insightsController');

router.get('/insights', (req, res) => {
  try {
    const insights = controller.getInsights(req.query.activeFile || null); // allow query param for testing
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tasks', (req, res) => {
  try {
    const tasks = controller.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/edits', (req, res) => {
  try {
    const edits = controller.getEdits(req.query.file || null);
    res.json(edits);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/set-active-file', (req, res) => {
  try {
    const { file } = req.body;
    if (!file) return res.status(400).json({ error: 'File path required' });
    const result = controller.setActiveFile(file);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recent-activity', (req, res) => {
  try {
    const recentActivity = controller.getRecentActivity();
    res.json(recentActivity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/financial-calculations', (req, res) => {
  try {
    const { monthlyRevenue, growthRate, profitMargin, cashBalance } = req.body;
    
    if (monthlyRevenue == null || growthRate == null || profitMargin == null || cashBalance == null) {
      return res.status(400).json({ error: 'All financial inputs are required' });
    }

    const calculations = controller.calculateFinancials(monthlyRevenue, growthRate, profitMargin, cashBalance);
    res.json(calculations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/revenue-breakdown', (req, res) => {
  try {
    const { pricingPlans, inputMRR } = req.body;
    
    if (!pricingPlans || !Array.isArray(pricingPlans) || inputMRR == null) {
      return res.status(400).json({ error: 'Pricing plans array and input MRR are required' });
    }

    const breakdown = controller.calculateRevenueBreakdown(pricingPlans, inputMRR);
    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;