const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

const endpointMap = {
  1: "vessels",
  2: "vesselMovements",
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
    return res.send(data.toString());
  });
  pyProgram.stderr.on("data", (data) => {
    console.log(`Error occurred: ${data}`);
    return res.send(false);
  });
  pyProgram.on("close", (code) => {
    console.log(`Python process exit with code ${code}`);
  });
});

module.exports = router;
