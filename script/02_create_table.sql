-- change user
\c stock_db db_user

-- CREATE TABLE テーブル名 (列名 データ型 成約[, ...]);
-- 銘柄情報
CREATE TABLE brand_details(brand_code INTEGER PRIMARY KEY, brand_name TEXT NOT NULL);

-- ニュースのキャッシュ
CREATE TABLE news(brand_code INTEGER REFERENCES brand_details(brand_code), url TEXT NOT NULL, title TEXT NOT NULL, id UUID PRIMARY KEY, create_date TIMESTAMP, get_date TIMESTAMP);

-- コメント
CREATE TABLE comments(brand_code INTEGER REFERENCES brand_details(brand_code), comments TEXT NOT NULL, post_date TIMESTAMP, mentioned_date TIMESTAMP, related_news UUID REFERENCES news(id));


