import fs from "fs";

// Read package.json file
const packageJson = JSON.parse(fs.readFileSync("./package.json", {encoding: "utf8"}));

// Remove private flag
packageJson.private = false;

// Remove other properties
packageJson.scripts = undefined;

// Copy to dist folder
fs.writeFileSync("./dist/package.json", JSON.stringify(packageJson), {encoding: "utf8"});

// Copy README to dist
fs.copyFileSync("./README.md", "./dist/README.md");
