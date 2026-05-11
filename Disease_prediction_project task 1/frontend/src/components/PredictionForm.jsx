import React, { useState ,useEffect} from 'react';
import { motion } from 'framer-motion';
import { Activity, Loader2 } from 'lucide-react';

const PredictionForm = ({ disease, onSubmit, isLoading }) => {
  const createInitialState = () =>
  disease.features.reduce(
    (acc, feature) => ({
      ...acc,
      [feature.name]:
        feature.default !== undefined && feature.default !== null
          ? feature.default
          : feature.type === 'select'
          ? feature.options?.[0]?.value ?? 0
          : feature.min !== undefined
          ? feature.min
          : 0,
    }),
    {}
  );

const [formData, setFormData] = useState(createInitialState);

useEffect(() => {
  setFormData(createInitialState());
}, [disease]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let features = disease.features.map(
      (feature) => formData[feature.name] ?? feature.default ?? 0
    );

    if (disease.id === 'cancer' && features.length < 30) {
      features = [
        ...features,
        ...Array(30 - features.length).fill(0),
      ];
    }

    onSubmit(features);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="prediction-form"
    >
      <div className="form-grid">
        {disease.features.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">{field.label}</label>

            {field.type === 'select' ? (
              <select
                value={formData[field.name]}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="form-control"
              >
                {field.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                step={field.step || 1}
                min={field.min}
                max={field.max}
                value={formData[field.name]}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="form-control"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`submit-button ${
          isLoading ? 'loading' : ''
        }`}
      >
        {isLoading ? (
          <>
            <Loader2
              size={20}
              className="spinner"
            />
            Analyzing Data...
          </>
        ) : (
          <>
            <Activity size={20} />
            Predict Risk Probability
          </>
        )}
      </button>
    </motion.form>
  );
};

export default PredictionForm;