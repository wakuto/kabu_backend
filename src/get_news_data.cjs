async function get_news(brand_name) {
  const FeedParser = require('feedparser');
  const https = require('https');
  

  var feedMeta;

  const url = 'https://news.google.com/rss/search?q=' + brand_name + '&hl=ja&gl=JP&ceid=JP:ja';
  console.log(url);

  return new Promise((resolve, reject) => {
    var news_list = [];
    https.get(url, function(res) {
      res.pipe(new FeedParser({}))
        .on('error', function(error) {
          reject(error);
        })
        .on('meta', function(meta) {
          feedMeta = meta;
        })
        .on('readable', function() {
          var stream = this;
          var item;

          // chunkデータを保存する
          while (item = stream.read()) {
            var news = {
              'title': item.title,
              'url': item.link,
              'date': item.pubDate
            };
            news_list.push(news);
          }
        }).on('end', function() {
          resolve(news_list);
        });
    });
  });
}

//todo idは銘柄コードではなく銘柄名が欲しい
async function get_news_data(brand_name){
  var list;
  await get_news(brand_name).then((news_list) => {
    list = news_list;
  });

  return {"news": list};
}

module.exports = {
  get_news_data,
}
