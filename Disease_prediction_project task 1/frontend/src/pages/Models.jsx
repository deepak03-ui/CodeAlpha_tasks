import { Brain, Database, ShieldCheck, Zap } from 'lucide-react';

function Models() {
  const models = [
    {
      icon: Brain,
      title: 'Logistic Regression',
      description:
        'A statistical model used for binary classification and probability estimation.',
    },
    {
      icon: Database,
      title: 'Random Forest',
      description:
        'An ensemble learning method that combines multiple decision trees for improved accuracy.',
    },
    {
      icon: Zap,
      title: 'Support Vector Machine',
      description:
        'A powerful classification algorithm that finds the optimal decision boundary.',
    },
    {
      icon: ShieldCheck,
      title: 'Probability Scoring',
      description:
        'Each prediction includes a confidence score and interpretable risk level.',
    },
  ];

  return (
    <section className="section">
      <div className="card" style={{ padding: '2.5rem' }}>
        <span className="hero-badge">Machine Learning Models</span>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            margin: '1rem 0',
          }}
        >
          Algorithms Behind the Predictions
        </h1>
        <p
          className="text-muted"
          style={{ maxWidth: '720px', marginBottom: '2rem' }}
        >
          The platform uses trained machine learning models to analyze medical
          parameters and estimate disease risk with probability-based outputs.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {models.map((model) => {
            const Icon = model.icon;

            return (
              <div
                key={model.title}
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon
                  size={32}
                  style={{
                    color: 'var(--primary)',
                    marginBottom: '1rem',
                  }}
                />
                <h3 style={{ marginBottom: '0.75rem' }}>{model.title}</h3>
                <p className="text-muted">{model.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Models;