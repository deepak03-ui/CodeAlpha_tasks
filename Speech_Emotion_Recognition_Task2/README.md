# Speech Emotion Recognition using Deep Learning

## Overview

This project detects human emotions from speech audio using Deep Learning and MFCC feature extraction.

Supported emotions:

* Happy
* Sad
* Angry
* Fear
* Disgust
* Surprise
* Neutral
* Calm

## Technologies Used

* Python
* TensorFlow / Keras
* Streamlit
* Librosa
* NumPy
* Scikit-Learn

## Dataset

RAVDESS (Ryerson Audio-Visual Database of Emotional Speech and Song)

## Features

* MFCC Feature Extraction
* CNN-based Emotion Classification
* Audio Upload Interface
* Confidence Score Visualization
* Streamlit Web Application

## Installation

```bash
pip install -r requirements.txt
```

## Run Application

```bash
streamlit run app.py
```

## Project Structure

emotion/
│
├── app.py
├── train.py
├── predict.py
├── utils.py
├── requirements.txt
├── README.md
└── models/

## Author

Deepak
