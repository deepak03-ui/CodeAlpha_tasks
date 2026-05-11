import { motion } from 'framer-motion';

function ResultCard({ result, onReset }) {
  if (!result) return null;

  const probability = Math.round((result.probability || 0) * 100);

  const isHighRisk = probability >= 70;
  const isMediumRisk = probability >= 40 && probability < 70;

  const strokeColor = isHighRisk
    ? '#ef4444'
    : isMediumRisk
    ? '#f59e0b'
    : '#10b981';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="result-wrapper card"
    >
      <div className="result-meter">
        <svg width="220" height="220">
          <circle
            cx="110"
            cy="110"
            r="90"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="14"
            fill="none"
          />

          <motion.circle
            cx="110"
            cy="110"
            r="90"
            stroke={strokeColor}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={565}
            initial={{ strokeDashoffset: 565 }}
            animate={{
              strokeDashoffset:
                565 - (565 * probability) / 100,
            }}
            transition={{ duration: 1.5 }}
            transform="rotate(-90 110 110)"
          />
        </svg>

        <div className="meter-content">
          <h1>{probability}%</h1>

          <span>
            {isHighRisk
              ? 'High Risk'
              : isMediumRisk
              ? 'Medium Risk'
              : 'Low Risk'}
          </span>
        </div>
      </div>

      <div className="result-details">
        <h2>{result.model_used}</h2>

        <p className="text-muted">
          AI-generated disease probability analysis
          based on clinical parameters.
        </p>

        <div className="result-info-grid">
          <div className="result-info-card">
            <span>Prediction</span>
            <strong>{String(result.prediction)}</strong>
          </div>

          <div className="result-info-card">
            <span>Risk Level</span>
            <strong>{result.risk_level}</strong>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={onReset}
        >
          Predict Again
        </button>
      </div>
    </motion.div>
  );
}

export default ResultCard;