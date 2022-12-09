from pygooglenews import GoogleNews
import pandas as pd
#言語および地域指定(もちろん日本以外も可)
 
gn = GoogleNews(lang = 'ja', country = 'JP')
def get_titles(search):

    news = []
    search = gn.search(search)
    newsitem = search['entries']
    for item in newsitem:
        titles = {
            'title': item.title,
            'url': item.link,
            'date': item.published
        }
        news.append(titles)

    df_news = pd.DataFrame(news)
    news_data = df_news.head().to_json(force_ascii=False, orient='records', date_format='iso', indent=2)
    print(news_data)
    return news_data 

#get_titles('sony')

"""
#実行
news = get_titles('sony')

#データ確認用
df_news = pd.DataFrame(news)
df_news.head()

news = df_news.head().to_json(force_ascii=False, orient='records', date_format='iso', indent=2)
print(news)
"""
