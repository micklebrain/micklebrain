import json
import csv

def remove_empty(d):
    if isinstance(d, dict):
        return {k: remove_empty(v) for k, v in d.items() if v not in (None, "", [], {})}
    elif isinstance(d, list):
        return [remove_empty(x) for x in d if x not in (None, "", [], {})]
    else:
        return d
    
def remove_keys(obj, keys_to_remove):
    if isinstance(obj, dict):
        return {k: remove_keys(v, keys_to_remove) for k, v in obj.items() if k not in keys_to_remove}
    elif isinstance(obj, list):
        return [remove_keys(i, keys_to_remove) for i in obj]
    else:
        return obj
    
def addStock(symbol, ownWebull=False, ownEtrade=False):
    with open("stocks.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    new_item = {
        "Symbol": symbol.upper(),
        "ownWebull": ownWebull,
        "ownEtrade": ownEtrade
    }

    found = False
    for item in data:
        if item.get("Symbol") == symbol:
            if ownWebull:
                item["ownWebull"] = True
            if ownEtrade:
                item["ownEtrade"] = True
            found = True
            print("stock updated")
            break

    if not found:
        # Add new item
        data.append(new_item)
        print("new stock added.")

    # Sort by NASDAQ Symbol (case-insensitive, missing values go last)
    data = sorted(
        data,
        key=lambda x: (str(x.get("Symbol") or "").upper())
    )

    # Save updated data
    with open("stocks.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def mergeKey(key):
    # Load both files
    with open("stocks.json", "r", encoding="utf-8") as f:
        stocks = json.load(f)

    with open("stocks2.json", "r", encoding="utf-8") as f:
        stocks2 = json.load(f)

    # Build lookup from stocks2.json (NASDAQ Symbol → Company Name)
    lookup = {
        item.get("NASDAQ Symbol"): item.get(key)
        for item in stocks2
        if "NASDAQ Symbol" in item and key in item
    }

    # Merge into stocks.json
    for item in stocks:
        symbol = item.get("NASDAQ Symbol")
        if symbol in lookup and key not in item:
            item[key] = lookup[symbol]

    # Save updated stocks.json
    with open("stocks.json", "w", encoding="utf-8") as f:
        json.dump(stocks, f, indent=4)

with open("stocks.json", "r", encoding="utf-8") as f:
    stocks = json.load(f)

# Sort by NASDAQ Symbol (case-insensitive, missing values go last)
stocks = sorted(
    stocks,
    key=lambda x: (str(x.get("Symbol") or "").upper())
)

# save sorted
with open("stocks.json", "w", encoding="utf-8") as f:
    json.dump(stocks, f, indent=4)

totalNumberStocks = len(stocks)

keys_to_remove = {"ACT Symbol", "CQS Symbol", "ETF", "Exchange", "Round Lot Size", "Security Name", "Test Issue"}
allStocks = remove_keys(stocks, keys_to_remove)

notOwned = [item for item in allStocks if item.get("ownWebull") is False and item.get("ownEtrade") is False]
ownWebullStocks = [item for item in allStocks if item.get("ownWebull") is True]
ownEtradeStocks = [item for item in allStocks if item.get("ownEtrade") is True]
stocksOwned = [item for item in allStocks if item.get("ownWebull") is True or item.get("ownEtrade") is True]

printedResults = ownWebullStocks
# printedResults = [ # print stocks with missing names
#     item for item in printedResults
#     if item.get("Name") in (None, "")
# ]
print(json.dumps(printedResults, indent=4))
print("\n".join(stock["Symbol"] for stock in printedResults))
# from tabulate import tabulate
# print(tabulate(printedResults, headers="keys", tablefmt="fancy_grid"))

# a_symbols = [item["Symbol"] for item in printedResults if item.get("Symbol", "").startswith("H")]
# print("\n".join(a_symbols))

percentageCompleted = round(len(printedResults)/totalNumberStocks * 100, 2)
print(f"{len(printedResults)} / {totalNumberStocks} stocks | {percentageCompleted}%")

# count = sum(1 for stock in stocksOwned if stock.get("Symbol", "").startswith("B"))
# print("number of symbols starting with A:", count)

# upcoming splits - ENVB
# upcoming delisting - BHILQ, PGRE, LAZRQ, WBD
stocksToAdd = []

for stock in stocksToAdd:
    addStock(stock, ownWebull=True)
