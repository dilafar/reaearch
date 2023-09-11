from utils.data_preprocessing import change_timestamp_to_dateTime, drop_column, missing_values, split_test_train, \
    scale_minmax_scaler, import_dataframe_from_csv, create_timeSeries_generater
from prediction_models import BiLstm_CNN_model


async def make_pod_predictions_memory(pod_name: str):
    df = await data_load_cpu_by_podname(pod_name)
    df = await preprocess_cpu_utilization_dataset(df)
    dataframe = df[["value"]]
    print(dataframe.head())
    train, test = split_test_train(dataframe, 0.8)
    scaler_train, scaler_test, scaler = scale_minmax_scaler(train, test)
    generator = create_timeSeries_generater(scaler_train)
    model_bilstm_cnn = BiLstm_CNN_model(64, generator, 100, 32)
    model_bilstm_cnn = model_bilstm_cnn.build_model()
    history_BiLSTM_CNN, model_bilstm_cnn = await model_bilstm_cnn.fit_model(model_bilstm_cnn)

    ##   Los Plot  ####

    prediction_bilstm_cnn = model_bilstm_cnn.predict(model_bilstm_cnn, test, scaler_train, 12, 1, scaler)

    res = prediction_bilstm_cnn.tolist()

    return {"res": res}

    df = import_dataframe_from_csv('cpu_usage.csv')
    df = change_timestamp_to_dateTime_and_sort(df, 'dateTime', 'timestamp')
    return df


async def data_load_cpu_by_podname(pod: str):
    df = import_dataframe_from_csv("CPU/ " + pod + ".csv")
    df = change_timestamp_to_dateTime(df, 'dateTime', 'timestamp')
    return df


async def preprocess_cpu_utilization_dataset(dataframe):
    df = missing_values(dataframe)
    return df

