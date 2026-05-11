import {
  ShieldCheck,
  Brain,
  Activity,
  Database,
} from 'lucide-react';

function About() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Prediction',
      description:
        'Machine learning models analyze patient data to estimate disease risk probabilities.',
    },
    {
      icon: Activity,
      title: 'Clinical Analytics',
      description:
        'Advanced healthcare metrics are processed using trained predictive algorithms.',
    },
    {
      icon: Database,
      title: 'Medical Data Processing',
      description:
        'Structured datasets and preprocessing pipelines improve prediction consistency.',
    },
    {
      icon: ShieldCheck,
      title: 'Risk Assessment',
      description:
        'Probability-based outputs help identify potential disease risks early.',
    },
  ];

  return (
    <section className="section">
      <div className="about-hero card">
        <span className="hero-badge">
          About HealthPredict AI
        </span>

        <h1 className="about-title">
          AI-Driven Healthcare Risk Prediction
        </h1>

        <p className="about-text text-muted">
          HealthPredict AI is a modern disease prediction
          platform designed to analyze clinical parameters
          using machine learning models. The system predicts
          risk probabilities for Heart Disease, Diabetes,
          and Breast Cancer using intelligent analytics and
          healthcare-focused AI pipelines.
        </p>
      </div>

      <div className="about-grid">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="about-card"
            >
              <Icon
                size={34}
                className="about-icon"
              />

              <h3>{item.title}</h3>

              <p className="text-muted">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="about-bottom card">
        <h2>Project Vision</h2>

        <p className="text-muted">
          The goal of this platform is to demonstrate how
          machine learning can support healthcare decision
          systems through predictive analytics, intuitive
          visualizations, and modern web technologies.
        </p>
      </div>
    </section>
  );
}

export default About;