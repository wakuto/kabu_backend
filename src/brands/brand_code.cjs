const pgp = require('pg-promise')();
const XLSX = require('xlsx');

const pg_conf = {
  host: 'db',
  port: 5432,
  database: 'stock_db',
  user: 'db_user',
  password: 'passw0rd',
  max: 30
};

db = pgp(pg_conf);

console.log("initializing...");
register_brand()
  .then( () => {
    console.log("initialize complete.");
  });


// 銘柄情報の登録を行う関数
async function register_brand() {
  const url = "https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls"
  console.log(`data fetch from ${url}`);
  const data = await (await fetch(url)).arrayBuffer();

  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets['Sheet1'];
  const rows = XLSX.utils.sheet_to_json(sheet);


  console.log("Reading database...");
  // dbサーバー負荷軽減のため取得してから検索
  const brand_codes = await db.any("SELECT brand_code, brand_name FROM brand_details;");

  console.log("Updating database...");
  for (const row of rows) {
    const code = row['コード'];
    const name = row['銘柄名'];


    // データを探す
    const brand_details = brand_codes.filter(result => {
      return result['brand_code'] === code;
    });

    // データが見つかったか？
    if (brand_details.length === 0) {
      // データが見つからなければinsert
      console.log(`INSERT: code=${code}, name=${name}`);
      await db.none("INSERT INTO brand_details(brand_code, brand_name) VALUES($1, $2)", [code, name]);
    } else {
      //   データが不一致ならupdate
      if (brand_details[0]['brand_name'] !== name) {
        console.log(`UPDATE: code=${code}, name=${name}`);
        await db.none("UPDATE brand_details SET brand_name=$1 WHERE brand_code=$2", [name, code]);
      }
    }
  }
}
