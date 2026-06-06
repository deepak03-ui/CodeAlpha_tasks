import numpy as np
import joblib

from tensorflow.keras.models import load_model

from utils import extract_features


MODEL_PATH = "models/emotion_model.h5"
ENCODER_PATH = "models/label_encoder.pkl"

model = load_model(MODEL_PATH)

encoder = joblib.load(ENCODER_PATH)

audio_file = input(
    "Enter audio path: "
)

features = extract_features(audio_file)

features = np.array(features)

features = features.reshape(
    1,
    features.shape[0],
    1
)

prediction = model.predict(features)

emotion_index = np.argmax(prediction)

emotion = encoder.inverse_transform(
    [emotion_index]
)

print("\nPredicted Emotion:")
print(emotion[0])