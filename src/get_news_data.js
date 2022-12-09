/*
//expressモジュールの読み込み
var express = require('express')
//expressのインスタンス化
var app = express()

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(8080, () => {
  console.log("サーバー起動中");
});

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/hello', (req, res)=> {
   res.send(req.query.name)
   //res.json(require('./stock_data.json'));
    //console.log('GETリクエストを受け取りました')
    res.end();
})
*/


function get_news_data(id){
   //pythonスクリプト実行
   var {PythonShell} = require('python-shell');

   PythonShell.send(id);
   PythonShell.run('get_news.py', null, function (err,result) {
      if (err) throw err;
      console.log(result);
});

}


