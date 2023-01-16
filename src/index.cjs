const express = require('express');
const brands = require('./brands.cjs');
const comment = require('./comments.cjs');
const news = require('./get_news_data.cjs');
const brands_data = require('./get_brands_data.cjs');
const init = require('./init_database.cjs');

init.init_db().then((db) => {
  const PORT = 8000;
  const HOST = '0.0.0.0';
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Express!!");
  });

  app.get("/brands/by-name/:name", async (req, res) => {
    try {
      const json = await brands.get_brand_code_by_name(db, req.params.name);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  app.get("/brands/by-id/:id", async (req, res) => {
    try {
      const json = await brands.get_brand_name_by_id(db, req.params.id);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  app.get("/:id/comments", async (req, res) => {
    try {
      const json = await comment.get_comments(db, req.params.id);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  app.post("/:id/comments", async (req, res) => {
    try {
      const json = await comment.append_comment(db, req.params.id, req.body);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  app.get("/:id/news", async (req, res) => {
    try {
      const brand_json = await brands.get_brand_name_by_id(db, req.params.id);
      const json = await news.get_news_data(brand_json.brand_name);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });

  app.get("/:id/details/:period/:duration", async (req, res) => {
    try {
      const id = req.params.id;
      const period = req.params.period;
      const duration = req.params.duration;

      const json = await brands_data.get_brands_data(id, period, duration);
      res.json(json);
    } catch (err) {
      errorHandler(req, res, err);
    }
  });



  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});

function errorHandler(req, res, err) {
  res.status(500).send({ "error": err }); //"something wrong!!!"});
}


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
