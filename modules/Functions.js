const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { exec } = require("child_process");

const basePath = path.dirname(require.main.filename);
/**
 * @param {string} dirPath
 */
const bootStrap = (dirPath) => {
  /**
   * check if path exists
   */
  if (fs.existsSync(dirPath)) {
    // current project root
    const baseFiles = {
      "reset-style": basePath + "/inc/reset.css",
      "bootstrap-rtl-style":
        basePath + "/node_modules/bootstrap-v4-rtl/dist/css/bootstrap-rtl.css",
      bootstrap:
        basePath + "/node_modules/bootstrap-v4-rtl/dist/js/bootstrap.min.js",
      jquery: basePath + "/node_modules/jquery/dist/jquery.min.js",
      popper: basePath + "/node_modules/@popperjs/core/dist/cjs/popper.js",
    };
    const directories = [dirPath + "assets\\css", dirPath + "assets\\js"];
    /**
     * check if directories existant :)
     */
    if (!fs.existsSync(directories[0]) && !fs.existsSync(directories[1])) {
      fs.mkdirSync(directories[0], { recursive: true });
      fs.mkdirSync(directories[1], { recursive: true });
      console.log(chalk.green("css and js directoires created!"));
    }
    /**
     * loop the @baseFiles object value
     */
    for (let [key, value] of Object.entries(baseFiles)) {
      try {
        if (key.toLowerCase().includes("style")) {
          fs.copyFileSync(value, directories[0] + "\\" + key + ".css");
        } else {
          fs.copyFileSync(value, directories[1] + "\\" + key + ".js");
        }
      } catch (error) {
        console.log(chalk.red(error));
      }
    }
    const htmlContent = `<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/reset-style.css">
    <link rel="stylesheet" href="assets/css/bootstrap-rtl-style.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>


<script src="assets/js/jquery.js"></script>
<script src="assets/js/popper.js"></script>
<script src="assets/js/bootstrap.js"></script>
</body>
</html>
    `;
    const styleContent = `/* 
    Your custom style here
*/
    `;
    // create index file
    fs.writeFile(dirPath + "index.html", htmlContent, "utf8", (error) => {
      if (error) {
        console.log(chalk.red(error));
      }
    });
    fs.writeFile(
      directories[0] + "\\style.css",
      styleContent,
      "utf8",
      (error) => {
        if (error) {
          console.log(chalk.red(error));
        } else {
          console.log(
            chalk.green(
              "all good! bootstrap-rtl project created , enjoy coding"
            )
          );
        }
      }
    );
  } else {
    console.log(chalk.red("Path not exist! please enter the valid path"));
  }
};
/**
 * this function create react-app using => npx create-react-app
 * @param {string} dirPath 
 */
const react = (dirPath) => {
  console.log(
    chalk.green("crafting react app ,this may take a few minutes . . .")
  );
  exec( "npx create-react-app " + dirPath, (error, stdout, stderr) => {
    if (error) {
      console.log(chalk.red(error.message));
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(
      `stdout: ${stdout} \n` +
        chalk.green(
          "Application crafted! dont forget to install dependency 'npm i'"
        )
    );
  });
};
/**
 * this function create vue-cli app using => vue create
 * @param {string} dirPath 
 */
const vueCli = (dirPath) =>{
  console.log(
    chalk.green("crafting simple vue ,this may take a few minutes . . .")
  );
  exec("vue create vue-app -d",{ cwd: dirPath } ,(error, stdout, stderr) => {
    if (error) {
      console.log(chalk.red(error.message));
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(
      `stdout: ${stdout} \n` +
        chalk.green(
          "Application crafted! dont forget to install dependency 'npm i'"
        )
    );
  });

}
exports.bootStrap = bootStrap;
exports.react = react;
exports.vueCli = vueCli;

