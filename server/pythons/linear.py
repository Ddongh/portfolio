import pandas as pd
import yfinance as yf
import json

def perform_linear_analysis(code, method, start, end):
    symbol = code + ".KS"
    
    df = yf.download(symbol, start=start, end=end, progress=False)

    # 날짜와 각 열을 리스트로 변환
    date_data = df.index.strftime('%Y-%m-%d').tolist()  # 날짜 데이터를 년월일 형식의 문자열로 변환하여 리스트로 저장
    output_data = {}

    # 각 열을 리스트로 변환하여 output_data에 저장
    for column in df.columns:
        column_data = df[column].tolist()  # 각 열을 리스트로 변환
        output_data[column] = column_data

    # JSON 형태로 변환하여 리턴
    try:
        output_json = json.dumps({"Date": date_data, "Data": output_data})
        # output_json = json.dumps({"Date": 1})
        return output_json
    except Exception as e:
        print("Error converting data to JSON:", e)
        return None


if __name__ == "__main__":
    import sys

    # 명령줄 인수를 파싱합니다.
    code = sys.argv[1]
    method = sys.argv[2]
    start = sys.argv[3]
    end = sys.argv[4]

    # 선형 회귀 분석을 수행하고 결과를 출력합니다.
    analysis_result = perform_linear_analysis(code, method, start, end)
    if analysis_result is not None:
        print(analysis_result)
        
