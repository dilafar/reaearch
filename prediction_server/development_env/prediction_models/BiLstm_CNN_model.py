import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dropout
from keras.layers import Flatten
from keras.layers import Input, Dense, LSTM, Conv1D, Dropout, Bidirectional, Multiply
from keras.models import Model
from keras.optimizers import Adam
from keras.models import *
import numpy as np


class Bi_LSTM_CNN_model():
    def __init__(self, units, generator, epohs, batch_size):
        self.units = units
        self.generator = generator
        self.epohs = epohs
        self.batch_size = batch_size

    def build_model(self):
        inputs = Input(shape=(12, 1))
        x = Conv1D(filters=128, kernel_size=1, activation='relu')(inputs)
        x = Dropout(0.02)(x)

        x = Conv1D(filters=64, kernel_size=3, activation='relu')(x)
        x = Dropout(0.02)(x)

        x = Conv1D(filters=32, kernel_size=3, activation='relu')(x)
        x = Dropout(0.02)(x)
        lstm_out = Bidirectional(LSTM(16, return_sequences=False, activation='relu'))(x)
        lstm_out = Dense(16)(lstm_out)
        lstm_out = Dense(8)(lstm_out)
        lstm_out = Dense(4)(lstm_out)
        attention_mul = Flatten()(lstm_out)
        output = Dense(2)(attention_mul)
        output = Dense(1)(output)
        model = Model(inputs=[inputs], outputs=output)
        model.compile(loss='mean_squared_error', optimizer=Adam(learning_rate=0.001))
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
