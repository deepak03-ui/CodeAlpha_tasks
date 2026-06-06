import streamlit as st
import numpy as np
import tempfile
import joblib

from tensorflow.keras.models import load_model
from utils import extract_features


# ----------------------------
# Page Config
# ----------------------------
st.set_page_config(
    page_title="Speech Emotion Recognition",
    page_icon="🎤",
    layout="centered"
)

# ----------------------------
# Load Model
# ----------------------------
@st.cache_resource
def load_resources():

    model = load_model(
        "models/emotion_model.h5"
    )

    encoder = joblib.load(
        "models/label_encoder.pkl"
    )

    return model, encoder


model, encoder = load_resources()

# ----------------------------
# Title
# ----------------------------
st.title("🎤 Speech Emotion Recognition")

st.markdown("""
Upload a speech audio file and predict the speaker's emotion using a CNN model trained on the RAVDESS dataset.
""")

# ----------------------------
# Upload File
# ----------------------------
uploaded_file = st.file_uploader(
    "Upload WAV File",
    type=["wav"]
)

# ----------------------------
# Prediction
# ----------------------------
if uploaded_file is not None:

    st.audio(uploaded_file)

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".wav"
    ) as tmp_file:

        tmp_file.write(
            uploaded_file.read()
        )

        temp_audio_path = tmp_file.name

    try:

        features = extract_features(
            temp_audio_path
        )

        features = np.array(
            features
        ).reshape(
            1,
            40,
            1
        )

        prediction = model.predict(
            features,
            verbose=0
        )

        predicted_index = np.argmax(
            prediction
        )

        emotion = encoder.inverse_transform(
            [predicted_index]
        )[0]

        confidence = np.max(
            prediction
        ) * 100

        st.success(
            f"Predicted Emotion: {emotion.upper()}"
        )

        st.info(
            f"Confidence: {confidence:.2f}%"
        )

        st.subheader(
            "All Emotion Scores"
        )

        class_names = encoder.classes_

        for emotion_name, score in zip(
            class_names,
            prediction[0]
        ):
            st.write(
                f"{emotion_name}: {score*100:.2f}%"
            )

            st.progress(
                float(score)
            )

    except Exception as e:

        st.error(
            f"Error: {e}"
        )