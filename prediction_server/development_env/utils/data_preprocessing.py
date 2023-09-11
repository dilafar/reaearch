from sklearn.preprocessing import MinMaxScaler, StandardScaler
import numpy as np
from keras.preprocessing.sequence import TimeseriesGenerator
import pandas as pd
from datetime import datetime
import os


def change_timestamp_to_dateTime(dataframe, dateTime_col_name, timestamp_col_name):
    dataframe[dateTime_col_name] = [datetime.fromtimestamp(x) for x in dataframe[timestamp_col_name]]
    dataframe = dataframe.sort_values('dateTime')
    dataframe = dataframe.set_index('dateTime')
    return dataframe


def drop_column(dataframe, column_name):
    return dataframe.drop(column_name, axis=1)


def missing_values(dataframe):
    for col in dataframe.columns:
        if col == 'timestamp' or col == 'dateTime':
            continue
        print(dataframe[col].isna().sum())
        print('')

        if dataframe[col].isna().sum() > 0:
            # Locate the missing value
            df_missing_date = dataframe.loc[dataframe[col].isna() == True]
            # Replcase missing value with interpolation
            dataframe[col].interpolate(inplace=True)
            dataframe.fillna(method='pad')

    return dataframe


def split_test_train(dataframe, ratio):
    train_size = int(len(dataframe) * ratio)
    train = dataframe.iloc[:train_size]
    test = dataframe.iloc[train_size:]
    return train, test


def scale_minmax_scaler(train, test):
    scaler = MinMaxScaler()
    scaler_train = scaler.fit(train)
    scaler_train = scaler.transform(train)
    scaler_test = scaler.transform(test)
    return scaler_train, scaler_test, scaler


def create_timeSeries_generater(scaler_train):
    n_input = 12
    n_features = 1
    generator = TimeseriesGenerator(scaler_train, scaler_train, length=n_input, batch_size=1)
    return generator


def import_dataframe_from_csv(csv_name):
    directory = os.getcwd() + '/app/util/datasets/' + csv_name
    df = pd.read_csv(directory)
    return df
