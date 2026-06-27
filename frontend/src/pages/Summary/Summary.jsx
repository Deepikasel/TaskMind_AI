import { useEffect, useState } from "react";
import "./Summary.css";

import Loader from "../../components/Loader/Loader";

import {
  dailySummary,
  productivitySuggestions,
} from "../../services/aiService";

function Summary() {
  const [loading, setLoading] = useState(true);

  const [summaryData, setSummaryData] = useState({
    productivityScore: 0,
    summary: "",
    insights: [],
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
  try {
    setLoading(true);

    const scoreRes = await productivitySuggestions();
    const summaryRes = await dailySummary();

    const data = summaryRes.data.data;

    setSummaryData({
      productivityScore: data?.productivityScore || 0,
      summary: data?.summary || "No summary available",
      insights: Array.isArray(data?.insights) ? data.insights : [],
    });

  } catch (err) {
    console.log(err);

    setSummaryData({
      productivityScore: 0,
      summary: "Unable to load summary.",
      insights: [],
    });
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="summary-page">
      <div className="container">

        <div className="summary-header">
          <h1>AI Productivity Summary</h1>

          <p>
            AI generated productivity insights.
          </p>
        </div>

        <div className="score-card">
          <h2>Productivity Score</h2>

          <div className="score-circle">
            {summaryData.productivityScore}%
          </div>
        </div>

        <div className="summary-card">
          <h2>Today's Summary</h2>

          <p>{summaryData.summary}</p>
        </div>

        <div className="insights-card">
          <h2>Insights</h2>

          <ul>
            {summaryData.insights.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Summary;