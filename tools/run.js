const { exec } = require("child_process");

let host = "127.0.0.1";
let production = false;

process.argv.forEach((arg, index, args) => {
  if (arg === "--host" && args[index + 1]) {
    host = args[index + 1];
  } else if (arg === "--production") {
    production = true;
  }
});

let command = `bundle exec jekyll s -l`;
if (production) {
  command = `JEKYLL_ENV=production ${command}`;
}

console.log(`> Running: ${command}`);

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
});
