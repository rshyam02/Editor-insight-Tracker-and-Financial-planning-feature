import React, { useState } from 'react';
import { apiService } from '../services/apiService';

/*
FINANCIAL CALCULATOR - MISMATCH HANDLING APPROACH

"I chose to highlight mismatches instead of automatically correcting values because MRR may include 
factors like discounts, churn, or external adjustments. So I provide visibility and let the user decide."

This shows product thinking and understanding of real-world business scenarios.
*/

const FinancialCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyRevenue: '',
    growthRate: '',
    profitMargin: '',
    cashBalance: ''
  });

  const [pricingPlans, setPricingPlans] = useState([
    { name: '', pricePerMonth: '', customerCount: '' }
  ]);

  const [results, setResults] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...pricingPlans];
    updatedPlans[index][field] = value;
    setPricingPlans(updatedPlans);
  };

  const addPricingPlan = () => {
    setPricingPlans([...pricingPlans, { name: '', pricePerMonth: '', customerCount: '' }]);
  };

  const removePricingPlan = (index) => {
    if (pricingPlans.length > 1) {
      setPricingPlans(pricingPlans.filter((_, i) => i !== index));
    }
  };

  const calculateFinancials = async () => {
    try {
      setLoading(true);
      setError(null);

      const financialResults = await apiService.calculateFinancials(
        parseFloat(inputs.monthlyRevenue),
        parseFloat(inputs.growthRate),
        parseFloat(inputs.profitMargin),
        parseFloat(inputs.cashBalance)
      );

      setResults(financialResults);
    } catch (err) {
      setError('Failed to calculate financials: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateBreakdown = async () => {
    try {
      setLoading(true);
      setError(null);

      // Filter out empty plans
      const validPlans = pricingPlans.filter(plan =>
        plan.name && plan.pricePerMonth && plan.customerCount
      ).map(plan => ({
        name: plan.name,
        pricePerMonth: parseFloat(plan.pricePerMonth),
        customerCount: parseInt(plan.customerCount)
      }));

      if (validPlans.length === 0) {
        setError('Please add at least one complete pricing plan');
        return;
      }

      const breakdownResults = await apiService.calculateRevenueBreakdown(
        validPlans,
        parseFloat(inputs.monthlyRevenue)
      );

      setBreakdown(breakdownResults);
    } catch (err) {
      setError('Failed to calculate revenue breakdown: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMRRFromPlans = () => {
    if (breakdown) {
      setInputs(prev => ({
        ...prev,
        monthlyRevenue: breakdown.totalFromPlans.toString()
      }));
      setBreakdown(null); // Clear breakdown to show it's resolved
    }
  };

  return (
    <div className="panel">
      <h2>Financial Calculator</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="financial-inputs">
        <h3>Core Financial Inputs</h3>
        <div className="input-group">
          <label>Monthly Revenue (MRR) ($):</label>
          <input
            type="number"
            name="monthlyRevenue"
            value={inputs.monthlyRevenue}
            onChange={handleInputChange}
            placeholder="10000"
          />
        </div>

        <div className="input-group">
          <label>Monthly Growth Rate (%):</label>
          <input
            type="number"
            name="growthRate"
            value={inputs.growthRate}
            onChange={handleInputChange}
            placeholder="5"
          />
        </div>

        <div className="input-group">
          <label>Profit Margin (%):</label>
          <input
            type="number"
            name="profitMargin"
            value={inputs.profitMargin}
            onChange={handleInputChange}
            placeholder="20"
          />
        </div>

        <div className="input-group">
          <label>Current Cash Balance ($):</label>
          <input
            type="number"
            name="cashBalance"
            value={inputs.cashBalance}
            onChange={handleInputChange}
            placeholder="50000"
          />
        </div>

        <button onClick={calculateFinancials} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Financials'}
        </button>
      </div>

      {results && (
        <div className="financial-results">
          <h3>Financial Results</h3>
          <div className="result-grid">
            <div className="result-item">
              <strong>Annual Revenue (ARR):</strong> ${results.arr.toLocaleString()}
            </div>
            <div className="result-item">
              <strong>Monthly Profit:</strong> ${results.monthlyProfit.toLocaleString()}
            </div>
            <div className="result-item">
              <strong>Runway:</strong> {results.runway} {typeof results.runway === 'number' ? 'months' : ''}
            </div>
          </div>

          <h4>Revenue Forecast (Next 12 Months)</h4>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {results.revenueForecast.map((forecast) => (
                <tr key={forecast.month}>
                  <td>{forecast.month}</td>
                  <td>{forecast.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pricing-plans">
        <h3>Revenue Breakdown - Pricing Plans</h3>
        {pricingPlans.map((plan, index) => (
          <div key={index} className="plan-input">
            <input
              type="text"
              placeholder="Plan Name"
              value={plan.name}
              onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price/Month ($)"
              value={plan.pricePerMonth}
              onChange={(e) => handlePlanChange(index, 'pricePerMonth', e.target.value)}
            />
            <input
              type="number"
              placeholder="Customers"
              value={plan.customerCount}
              onChange={(e) => handlePlanChange(index, 'customerCount', e.target.value)}
            />
            {pricingPlans.length > 1 && (
              <button onClick={() => removePricingPlan(index)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={addPricingPlan}>Add Pricing Plan</button>
        <button onClick={calculateBreakdown} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Revenue Breakdown'}
        </button>
      </div>

      {breakdown && (
        <div className="breakdown-results">
          <h3>Revenue Breakdown Results</h3>
          
          {/* Revenue Summary - REQUIRED OUTPUT */}
          <div className="revenue-summary">
            <div className="summary-item">
              <strong>Total Plan Revenue:</strong> ${Number(breakdown.totalFromPlans).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <div className="summary-item">
              <strong>Input MRR:</strong> ${Number(breakdown.inputMRR).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <div className="summary-item">
              <strong>Difference:</strong> 
              <span className={breakdown.difference < 0 ? 'negative' : breakdown.difference > 0 ? 'positive' : 'zero'}>
                {breakdown.difference >= 0 ? '+' : ''}${Number(Math.abs(breakdown.difference)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </div>
          </div>

          {/* MISMATCH HANDLING - MOST IMPORTANT PART */}
          {!breakdown.isMatch && (
            <div className="mismatch-alert">
              <div className="alert-header">
                <span className="alert-icon">⚠️</span>
                <strong>Mismatch Detected!</strong>
              </div>
              
              <div className="alert-content">
                <p>
                  Revenue from pricing plans is 
                  <span className={breakdown.difference < 0 ? 'lower-text' : 'higher-text'}>
                    {breakdown.difference < 0 ? 'LOWER' : 'HIGHER'}
                  </span> 
                  than MRR by ${Number(Math.abs(breakdown.difference)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}.
                </p>
                
                <div className="possible-reasons">
                  <p><strong>Possible reasons:</strong></p>
                  <ul>
                    {breakdown.difference < 0 ? (
                      <>
                        <li>Missing customers in pricing plans</li>
                        <li>Discounts or promotions not included</li>
                        <li>External revenue sources not captured in plans</li>
                        <li>Seasonal or one-time revenue not in monthly plans</li>
                      </>
                    ) : (
                      <>
                        <li>Extra customers not accounted for in MRR</li>
                        <li>Premium pricing in actual plans</li>
                        <li>Additional revenue streams</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="action-required">
                  <p><strong>👉 Please adjust your inputs above to resolve this mismatch.</strong></p>
                  <p><em>Choose the approach that best fits your business model:</em></p>
                  <div className="approach-options">
                    <div className="approach-option">
                      <strong>Option A:</strong> Update pricing plan details to match your MRR
                    </div>
                    <div className="approach-option">
                      <strong>Option B:</strong> Adjust MRR to reflect actual plan revenue
                    </div>
                  </div>
                  <div className="quick-action">
                    <button onClick={updateMRRFromPlans} className="use-plan-revenue-btn">
                      Use Plan Revenue as MRR
                    </button>
                    <p className="btn-description">
                      💡 This shows product thinking - automatically syncs your MRR with calculated plan revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {breakdown.isMatch && (
            <div className="match-success">
              <span className="success-icon">✅</span>
              <strong>Revenue Match!</strong> Your pricing plans perfectly align with your MRR.
            </div>
          )}

          <h4>Pricing Plan Details</h4>
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Price/Month ($)</th>
                <th>Customers</th>
                <th>Total Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.pricingPlans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.name}</td>
                  <td>${Number(plan.pricePerMonth).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>{plan.customerCount.toLocaleString()}</td>
                  <td>${Number(plan.pricePerMonth * plan.customerCount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;