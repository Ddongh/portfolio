import pandas as pd
import yfinance as yf
import json
from prophet import Prophet
import sys

def perform_prophet_analysis(code, method, start, end):
    symbol = code + ".KS"
    
    df = yf.download(symbol, start=start, end=end, progress=False)

    output_data = {}
    pred = {}

    ###############################################################
    #################### Prophet 분석 코드 시작 ####################
    ###############################################################

    for column in df.columns:
        # 데이터 추출
        data = df[column].reset_index()

        # Prophet 입력 형식에 맞게 컬럼 이름 변경
        data = data.rename(columns={"Date": "ds", column: "y"})

        # Prophet 모델 생성 및 학습
        model = Prophet()
        model.fit(data)

        # 향후 3일의 데이터 예측
        future = model.make_future_dataframe(periods=3)
        forecast = model.predict(future)

        # 예측 결과를 pred 딕셔너리에 추가
        pred[column] = forecast["yhat"].tail(3).tolist()

    ###############################################################
    #################### Prophet 분석 코드 종료 ####################
    ###############################################################

    # 날짜와 각 열을 리스트로 변환
    date_data = df.index.strftime('%Y-%m-%d').tolist()

    output_data["data"] = []
    for index, row in df.iterrows():
        data = {
            "date": index.strftime("%Y-%m-%d"),
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
            "Open": str(int(round(pred["Open"][i]))),
            "High": str(int(round(pred["High"][i]))),
            "Low": str(int(round(pred["Low"][i]))),
            "Close": str(int(round(pred["Close"][i]))),
            "Adj_Close": str(int(round(pred["Adj Close"][i]))),
            "Volume": str(int(round(pred["Volume"][i]))),
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

# Prophet 분석을 수행하고 결과를 출력합니다.
analysis_result = perform_prophet_analysis(code, method, start, end)
if analysis_result is not None:
    print("^")
    print(analysis_result)
