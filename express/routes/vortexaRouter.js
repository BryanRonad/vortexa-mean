const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

const endpointMap = {
  1: "vessels",
  2: "vesselmovements",
  3: "cargo",
};

// Vessels
router.post("/:type", (req, res, next) => {
  const type = req.params.type;
  const pyProgram = spawn("/home/bryan/anaconda3/envs/vortexa/bin/python", [
    __dirname + "/vortexa_sdk.py",
    endpointMap[type],
    JSON.stringify(req.body),
  ]);
  pyProgram.stdout.on("data", (data) => {
    // console.log("Result", data.toString());
    // res.send(data.toString());
    res.write(data.toString());
  });
  pyProgram.stderr.on("data", (data) => {
    console.log(`Error occurred: ${data}`);
  });
  pyProgram.on("close", (code) => {
    console.log(`Python process exit with code ${code}`);
    res.end();
  });
});

module.exports = router;
