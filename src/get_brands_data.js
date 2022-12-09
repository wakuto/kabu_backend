async function get_brands_data(id, period, duration){
   //python-shell読み込み
   var {PythonShell} = require('python-shell');
   
   var shell = new PythonShell('get_brand.py', {
      mode: 'json',
   });

   //jsonデータ作成
   var json = {
      "code": id,
      "period": period,
      "duration": duration,
   };

   PythonShell.send(json);
   
   shell.on('message', function(data){
      return data;
   });

   shell.end();
}
