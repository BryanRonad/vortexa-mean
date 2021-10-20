const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const MongoClient = require("mongodb").MongoClient;
const config = require("../config/database");
var resArr;
const endpointMap = {
  1: "vessels",
  2: "vesselmovements",
  3: "cargo",
};

// Vessels
router.post("/:type", (req, res, next) => {
  const type = req.params.type;
  const filterObj = req.body;
  const mongo = filterObj.mongo;
  delete filterObj.mongo;
  const pyProgram = spawn("/home/bryan/anaconda3/envs/vortexa/bin/python", [
    __dirname + "/vortexa_sdk.py",
    endpointMap[type],
    JSON.stringify(filterObj),
  ]);
  pyProgram.stdout.on("data", (data) => {
    resArr = data.toString();
    console.log(resArr);
    return res.write(data.toString());
  });
  pyProgram.stderr.on("data", (data) => {
    console.log(`Error occurred: ${data}`);
  });
  pyProgram.on("close", (code) => {
    console.log(`Python process exit with code ${code}`);
    if (mongo) {
      MongoClient.connect(config.client, (err, client) => {
        if (err) {
          throw err;
        } else {
          console.log("Checking existence", resArr);
          let resultArr = JSON.parse(resArr);
          let db = client.db(config.database);
          console.log("Connected to database", config.database);
          console.log("Insertion", resultArr);
          db.collection(endpointMap[type]).insertOne(
            {
              datetime: new Date(Date.now()),
              filters: filterObj,
              result: resultArr,
            },
            (err, res) => {
              if (err) throw err;
              console.log(res.insertedCount + " documents inserted");
            }
          );
        }
      });
    } else {
      console.log("Insertion to MongoDB disabled");
    }
    res.end();
  });
});

module.exports = router;
