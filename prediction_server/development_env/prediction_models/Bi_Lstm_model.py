import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import  Dense, LSTM,Bidirectional
import numpy as np


class Bi_LSTM_model():
    def __init__(self, units, generator, epohs, batch_size):
        self.units = units
        self.generator = generator
        self.epohs = epohs
        self.batch_size = batch_size

    def build_model(self):
        model = Sequential()
        # Input layer
        model.add(Bidirectional(
            LSTM(units=self.units, return_sequences=True),
            input_shape=(12, 1)))
        # Hidden layer
        model.add(Bidirectional(LSTM(units=self.units)))
        model.add(Dense(1))
        # Compile model
        model.compile(optimizer='adam', loss='mse')
        return model

    async def fit_model(self, model):
        early_stop = keras.callbacks.EarlyStopping(monitor='val_loss',
                                                   patience=50)
        history = model.fit(self.generator, epochs=self.epohs,
                            batch_size=self.batch_size,
                            callbacks=[early_stop])
        return history, model

    def predict(self, model, test, scaler_train,n_input,n_features,scaler):
        test_prediction = []
        first_eval_batch = scaler_train[-12:]
        current_batch = first_eval_batch.reshape((1, n_input, n_features))

        for i in range(len(test)):
            current_pred = model.predict(current_batch)[0]
            test_prediction.append(current_pred)
            current_batch = np.append(current_batch[:, 1:, :], [[current_pred]], axis=1)

        true_prediction = scaler.inverse_transform(test_prediction)
        return true_prediction
