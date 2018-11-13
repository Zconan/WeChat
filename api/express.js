//引入模块
let mongo = require('./connect.js');
let express = require('express');
let app = express();

//保存发布信息
app.get('/saveinformation', (req, res) => {
  let longitude = req.query.longitude;
  let latitude = req.query.latitude;
  let type = req.query.type;
  let explain = req.query.explain;
  let phone = req.query.phone;
  res.append("Access-Control-Allow-Origin", "*");
  let myobj = {
    longitude,
    latitude,
    type,
    explain,
    phone
  };
  mongo.query(db => {
    db.collection("information").insertOne(myobj, (err, result) => {
      if (err) {
        throw err;
        res.send('no');
      }
      res.send('yes');
    });
  });
});

//获取发布信息
app.get('/getinformation', (req, res) => {
  res.append("Access-Control-Allow-Origin", "*");
  mongo.query(db => {
    db.collection("information").find({}).toArray((err, result) => {
      if (err) {
        throw err;
        res.send('no');
      }
      res.send(result);
    });
  });
});

app.listen(9999);