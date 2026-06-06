import os
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv1D
from tensorflow.keras.layers import MaxPooling1D
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dropout
from tensorflow.keras.callbacks import EarlyStopping

import joblib

from utils import extract_features


emotion_dict = {
    "01": "neutral",
    "02": "calm",
    "03": "happy",
    "04": "sad",
    "05": "angry",
    "06": "fear",
    "07": "disgust",
    "08": "surprise"
}

DATASET_PATH = "dataset/RAVDESS"

X = []
y = []

for actor in os.listdir(DATASET_PATH):

    actor_path = os.path.join(DATASET_PATH, actor)

    if not os.path.isdir(actor_path):
        continue

    for file in os.listdir(actor_path):

        if file.endswith(".wav"):

            emotion_code = file.split("-")[2]

            emotion = emotion_dict[emotion_code]

            file_path = os.path.join(actor_path, file)

            features = extract_features(file_path)

            if features is not None:
                X.append(features)
                y.append(emotion)

X = np.array(X)
y = np.array(y)

print("Features Shape:", X.shape)

encoder = LabelEncoder()

y_encoded = encoder.fit_transform(y)

joblib.dump(encoder, "models/label_encoder.pkl")

y_categorical = to_categorical(y_encoded)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_categorical,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

X_train = X_train.reshape(
    X_train.shape[0],
    X_train.shape[1],
    1
)

X_test = X_test.reshape(
    X_test.shape[0],
    X_test.shape[1],
    1
)

model = Sequential()

model.add(
    Conv1D(
        64,
        kernel_size=3,
        activation='relu',
        input_shape=(40, 1)
    )
)

model.add(MaxPooling1D(pool_size=2))

model.add(Dropout(0.3))

model.add(
    Conv1D(
        128,
        kernel_size=3,
        activation='relu'
    )
)

model.add(MaxPooling1D(pool_size=2))

model.add(Dropout(0.3))

model.add(Flatten())

model.add(Dense(128, activation='relu'))

model.add(Dropout(0.4))

model.add(Dense(
    y_categorical.shape[1],
    activation='softmax'
))

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

early_stop = EarlyStopping(
    patience=5,
    restore_best_weights=True
)

history = model.fit(
    X_train,
    y_train,
    validation_data=(X_test, y_test),
    epochs=50,
    batch_size=32,
    callbacks=[early_stop]
)

loss, acc = model.evaluate(
    X_test,
    y_test
)

print(f"Accuracy: {acc*100:.2f}%")

model.save("models/emotion_model.h5")

print("Model saved.")