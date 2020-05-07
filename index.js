#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");
const chalk = require("chalk");
const func = require(__dirname + "/modules/Functions");

const program = new Command();

program
  .option("-p, --path <value>", "path to create framework", process.cwd())
  .option("-f, --framework <value>", "framework name")
  .option("-l,--list", "list of available frameworks")
  .parse(process.argv);


/**
 * @param {string} path
 * @param {string} frameWork
 */
function craftsMan(path, frameWork, list) {
  const listDir = __dirname + "\\list.json";
  const data = fs.readFileSync(listDir);
  let names = JSON.parse(data);
  if (list) {
    for (const name in names) {
      if (names.hasOwnProperty(name)) {
        console.log(name)
      }
    }
  }
  switch (frameWork) {
    case names["bootstrap-rtl"]["name"]:
      func.bootStrap(path);
      break;
    case names["react-app"]["name"]:
      func.react(path);
      break;
    default:
      console.log(chalk.green("use -l or --list to get list of frameworks"));
      break;
  }
}
craftsMan(program.path, program.framework,program.list);
