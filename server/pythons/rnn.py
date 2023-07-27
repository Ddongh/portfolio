import pandas as pd
import yfinance as yf
import json
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, SimpleRNN
import sys

def perform_rnn_analysis(code, method, start, end):
    symbol = code + ".KS"
    
    df = yf.download(symbol, start=start, end=end, progress=False)

    output_data = {}
    pred = {}

    ###############################################################
    ####################순환신경망 분석 코드 시작 ###################
    ###############################################################
    for column in df.columns :
        # 데이터 추출
        data = df[column].values.reshape(-1, 1)

        # 데이터 정규화 (0 ~ 1 사이 값으로 스케일 조정)
        scaler = MinMaxScaler()
        data_scaled = scaler.fit_transform(data)

        # 학습 데이터와 타겟 데이터 생성
        X = data_scaled[:-1]  # 입력 시퀀스
        y = data_scaled[1:]  # 출력 시퀀스

        # 데이터셋 분리 (학습용 데이터와 테스트용 데이터)
        train_size = int(len(X) * 0.8)  # 전체 데이터의 80%를 학습용 데이터로 사용
        X_train, X_test = X[:train_size], X[train_size:]
        y_train, y_test = y[:train_size], y[train_size:]

        # 순환신경망 모델 생성
        model = Sequential()
        model.add(SimpleRNN(units=32, input_shape=(1, 1)))
        model.add(Dense(units=1))

        # 모델 컴파일
        model.compile(optimizer='adam', loss='mean_squared_error')

        # 모델 학습
        model.fit(X_train.reshape(-1, 1, 1), y_train, epochs=10, batch_size=1, verbose=0)

        # 테스트 데이터에 대한 예측 수행
        y_pred = model.predict(X_test.reshape(-1, 1, 1))

        # 예측 결과 역정규화
        y_pred = scaler.inverse_transform(y_pred)

        # 예측 결과를 리스트로 변환
        predictions = y_pred.flatten().tolist()

        # 마지막 데이터를 기반으로 다음 3일의 데이터 예측
        last_data = data_scaled[-1]  # 마지막 데이터
        prediction_period = 3  # 예측 기간 (3일)

        predicted_data = []
        for _ in range(prediction_period):
            input_data = np.array(last_data).reshape(1, 1, 1)
            prediction = model.predict(input_data)
            predicted_data.append(prediction[0, 0])
            last_data = prediction

        # 역정규화
        predicted_data = scaler.inverse_transform(np.array(predicted_data).reshape(-1, 1))

        # 예측 결과를 pred 딕셔너리에 추가
        pred[column] = predicted_data.flatten().tolist()

    ###############################################################
    ####################순환신경망 분석 코드 종료 ###################
    ###############################################################


    ###############################################################
    #########################json 변환 시작#########################
    ###############################################################

    # 날짜와 각 열을 리스트로 변환
    date_data = df.index.strftime('%Y-%m-%d').tolist()  # 날짜 데이터를 년월일 형식의 문자열로 변환하여 리스트로 저장

    output_data["data"] = []
    for index, row in df.iterrows():
        data = {
            "date": index.strftime("%Y-%m-%d"),  # Convert date to string format
            "Open": str(row["Open"]),
            "High": str(row["High"]),
            "Low": str(row["Low"]),
            "Close": str(row["Close"]),
            "Adj_Close": str(row["Adj Close"]),
            "Volume": str(row["Volume"])
        }
        output_data["data"].append(data)

    for i in range(len(pred["Open"])):
        data = {
            "date": "d+" + str(i + 1),
            "Open": str(int(round(pred["Open"][i]))),  # Open 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
            "High": str(int(round(pred["High"][i]))),  # High 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
            "Low": str(int(round(pred["Low"][i]))),  # Low 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
            "Close": str(int(round(pred["Close"][i]))),  # Close 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
            "Adj_Close": str(int(round(pred["Adj Close"][i]))),  # Adj_Close 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
            "Volume": str(int(round(pred["Volume"][i]))),  # Volume 값을 소수 첫째 자리에서 반올림하여 정수로 변환 후 문자열로 변환
        }
        output_data["data"].append(data)

    # JSON 형태로 변환하여 리턴
    try:
        output_json = json.dumps(output_data)
        return output_json
    except Exception as e:
        print("Error converting data to JSON:", e)
        return None

# 명령줄 인수를 파싱합니다.
code = sys.argv[1]
method = sys.argv[2]
start = sys.argv[3]
end = sys.argv[4]

# 선형 회귀 분석을 수행하고 결과를 출력합니다.
analysis_result = perform_rnn_analysis(code, method, start, end)
if analysis_result is not None:
    print("^")
    print(analysis_result)
