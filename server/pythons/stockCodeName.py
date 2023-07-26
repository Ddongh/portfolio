# -*- coding: utf-8 -*-
import FinanceDataReader as fdr
import json

stock_list = fdr.StockListing('KRX')

data = {}
for i in range(len(stock_list)):
    data[str(i)] = {"code":stock_list.Code[i], "name":stock_list.Name[i]}
    #가나다라마바사

json = json.dumps(data)

print(json)

