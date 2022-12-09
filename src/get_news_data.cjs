//todo idは銘柄コードではなく銘柄名が欲しい
async function get_news_data(id){
   //python-shellモジュール読み込み
   var {PythonShell} = require('python-shell');

   var shell = new PythonShell('get_news.py');

   shell.send(id);

   shell.on('message', function(data) {
      console.log(data);
      return data;
   });

   shell.end();
   
}

