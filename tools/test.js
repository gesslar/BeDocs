const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const siteDir = "_site";
let config = "_config.yml";

process.argv.forEach((arg, index, args) => {
  if (arg === "--config" && args[index + 1]) {
    config = args[index + 1];
  }
});

if (fs.existsSync(siteDir)) {
  console.log("> Cleaning up previous site...");
  fs.rmSync(siteDir, { recursive: true, force: true });
}

console.log("> Building site...");
execSync(
  `bundle exec jekyll b -d ${siteDir} -c ${config}`,
  { stdio: "inherit" }
);
