import FinanceDataReader as fdr
import json

stock_list = fdr.StockListing('KRX') # 국내 주식 데이터 크롤링(dataframe)

data = {}
for i in range(len(stock_list)):
    data[str(i)] = {"code":stock_list.Code[i], "name":stock_list.Name[i]} # 코드와 이름을 딕셔너리에 담기


json = json.dumps(data) # json 변환

print(json) # node.js 라우터에서 값을 받아 사용하기위해 출력

