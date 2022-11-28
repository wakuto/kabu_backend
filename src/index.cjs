const express = require('express');
const brands = require('./brands.cjs');

/*
const PORT = 8000;
const HOST = '0.0.0.0';
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Express!!");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
*/
main();

async function main() {
  const init = require('./init_database.cjs');
  const db = init.db;
  await init.init_db(db);

  console.log("hello world...");

  // 銘柄名・銘柄コードの取得サンプル
  const sample_data_by_id = await brands.get_brand_name_by_id(db, 1440);
  console.log(sample_data_by_id);
  const sample_data_by_name = await brands.get_brand_code_by_name(db, "やまぜんホームズ");
  console.log(sample_data_by_name);
}
