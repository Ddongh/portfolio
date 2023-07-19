import FinanceDataReader as fdr

stock_list = fdr.StockListing('KRX')

json = {}
for i in range(len(stock_list)):
    json[str(i)] = {"code":stock_list.Code[i], "name":stock_list.Name[i]}


print(json)