import fs from "fs";
import path from "path";

const ProjectDir = process.cwd();
const DistDir = path.join(ProjectDir, "dist");

if (!fs.existsSync(DistDir)) {
	fs.mkdirSync(DistDir);
}

console.log("PROJ directory:".padEnd(20, " "), ProjectDir);
console.log("DIST directory:".padEnd(20, " "), DistDir);

// Read package.json file
const packageJson = JSON.parse(fs.readFileSync(path.join(ProjectDir, "package.json"), {encoding: "utf8"}));

// Remove private flag
packageJson.private = false;

// Remove other properties
packageJson.scripts = undefined;

// Copy to dist folder
fs.writeFileSync(path.join(DistDir, "package.json"), JSON.stringify(packageJson), {encoding: "utf8"});

// Copy README to dist
fs.copyFileSync(path.join(ProjectDir, "README.md"), path.join(DistDir, "README.md"));

// Copy LICENSE to dist
fs.copyFileSync(path.join(ProjectDir, "LICENSE"), path.join(DistDir, "LICENSE"));
