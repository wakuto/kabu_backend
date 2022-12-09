const express = require('express');
const brands = require('./brands.cjs');
const comment = require('./comments.cjs');
const init = require('./init_database.cjs');

init.init_db().then((db) => {
  const PORT = 8000;
  const HOST = '0.0.0.0';
  const app = express();


  app.get("/", (req, res) => {
    res.send("Express!!");
  });

  app.get("/brands/by-name/:name", async (req, res) => {
    const json = await brands.get_brand_code_by_name(db, req.param.name);
    res.json(json);
  });

  app.get("/brands/by-id/:id", async (req, res) => {
    const json = await brands.get_brand_name_by_id(db, req.param.id);
    res.json(json);
  });

  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});


/*
main();

async function main() {
  const init = require('./init_database.cjs');
  const db = await init.init_db();

  console.log("hello world...");

  // 銘柄名・銘柄コードの取得サンプル
  const sample_data_by_id = await brands.get_brand_name_by_id(db, 1440);
  console.log(sample_data_by_id);
  const sample_data_by_name = await brands.get_brand_code_by_name(db, "やまぜんホームズ");
  console.log(sample_data_by_name);

  /*
  const sampel_comment1 = await comment.get_comments(db, 1440);
  console.log("comment before:");
  console.log(sampel_comment1);
  console.log("append");
  /

  const comment_data = {
		"user_name": "test_user4",
		"comment": "これはテストメッセージです！",
		"mentioned_date": "2022-11-11T00:00:00+09:00"
	};
  await comment.append_comment(db, 1440, JSON.stringify(comment_data));
  console.log("append done");

  const sampel_comment2 = await comment.get_comments(db, 1440);
  console.log("comment after:");
  console.log(sampel_comment2);
}
*/
