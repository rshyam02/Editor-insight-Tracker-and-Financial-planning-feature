import { useState, useEffect } from 'react';
import './App.css';
import InsightsPanel from './components/InsightsPanel';
import TaskMapping from './components/TaskMapping';
import EditActivity from './components/EditActivity';
import SetActiveFile from './components/SetActiveFile';
import FinancialCalculator from './components/FinancialCalculator';
import { apiService } from './services/apiService';

function App() {
  const [page, setPage] = useState('insights');
  const [insights, setInsights] = useState({});
  const [tasks, setTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (file = null) => {
    try {
      setLoading(true);

      const [insightsData, tasksData, recentActivityData] = await Promise.all([
        apiService.getInsights(),
        apiService.getTasks(),
        apiService.getRecentActivity()
      ]);

      setInsights(insightsData);
      setTasks(tasksData);
      setRecentActivity(recentActivityData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="app">Loading...</div>;
  if (error) return <div className="app">Error: {error}</div>;

  const renderInsightsPage = () => (
    <div className="app">
      <h1>Editor Insights Tracking</h1>
      <button className="page-switch-btn" onClick={() => setPage('financial')}>
        Go to Financial Planning Mini-Case
      </button>
      <InsightsPanel insights={insights} />
      <TaskMapping tasks={tasks} activeTask={insights.activeTask} />
      <EditActivity recentActivity={recentActivity} tasks={tasks} />
      <SetActiveFile onFileSet={loadData} />
    </div>
  );

  const renderFinancialPage = () => (
    <div className="app">
      <h1>Financial Planning Mini-Case</h1>
      <button className="page-switch-btn" onClick={() => setPage('insights')}>
        Back to Editor Insights
      </button>
      <FinancialCalculator />
    </div>
  );

  return (
    <div className="app-wrapper">
      <div className="page-content">
        {page === 'insights' ? renderInsightsPage() : renderFinancialPage()}
      </div>
    </div>
  );
}

export default App;
