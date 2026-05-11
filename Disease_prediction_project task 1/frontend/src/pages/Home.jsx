import { Link } from 'react-router-dom';
import { HeartPulse, Brain, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/hero.jpg.png';
function Home() {
  return (
    <section className="hero section">
      <div className="hero-card card">
        <div className="hero-content">
          <span className="hero-badge">AI-Powered Clinical Risk Assessment</span>

          <h1>
            Predict Disease Risk with
            <span> Machine Learning</span>
          </h1>

          <p className="text-muted hero-text">
            Analyze Heart Disease, Diabetes, and Breast Cancer risk using
            trained machine learning models with real-time probability scores.
          </p>

          <div className="hero-actions">
            <Link to="/predict" className="btn btn-primary">
              Start Prediction
            </Link>
            <Link to="/models" className="btn hero-secondary">
              View Models
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
  <img
    src={heroImage}
    alt="Medical AI Dashboard"
    className="hero-image"
  />
</div>
        <div className="hero-stats">
          <div className="stat-card">
            <HeartPulse size={28} />
            <h3>3 Diseases</h3>
            <p className="text-muted">Heart, Diabetes, Cancer</p>
          </div>

          <div className="stat-card">
            <Brain size={28} />
            <h3>3 Algorithms</h3>
            <p className="text-muted">LR, SVM, Random Forest</p>
          </div>

          <div className="stat-card">
            <ShieldCheck size={28} />
            <h3>Risk Scores</h3>
            <p className="text-muted">Probability-Based Results</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;