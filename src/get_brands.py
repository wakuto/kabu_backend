from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError
import pandas as pd
import json
from datetime import date, datetime
import sys

#code = 3323 #銘柄コード
#period = 3 #取得する長さ(month)
#duration = 1 #データの取得頻度(day)

#get_brands_data.jsからのデータ受信
data = json.loads(sys.stdion.readline())
code = data["code"]
period = data["period"]
duration = data["duration"]

#銘柄データを取得し、JSONファイルに出力
def get_stock(code, period, duration):
    company_code = str(code) + '.T'
    my_share = share.Share(company_code)
    symbol_data = None

    try:
        symbol_data = my_share.get_historical(share.PERIOD_TYPE_MONTH,
                period,
                share.FREQUENCY_TYPE_DAY,
                duration)
    except YahooFinanceError as e:
        print(e.message)
        sys.exit(1)

    #データは日付と終値のみ
    df = pd.DataFrame({'datetime': [datetime.fromtimestamp(d/1000) for d in symbol_data['timestamp']        ],'close' : symbol_data['close']})

    df.datetime = df.datetime.dt.date
    data = df.to_json(orient='records', date_format='iso', indent=2)
    print(data)

get_stock(code, period, duration)
