//create a zip file of the extension
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const zip = new AdmZip();

// Get the project root directory
const projectRoot = path.join(__dirname, "..");

// Add the main extension files
const filesToInclude = [
  "manifest.json",
  "content.js",
  "content.css",
  "popup.html",
  "popup.js",
];

// Add each file to the zip
filesToInclude.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    zip.addLocalFile(filePath);
  } else {
    console.warn(`Warning: ${file} not found, skipping...`);
  }
});

// Add icons directory if it exists
const iconsPath = path.join(projectRoot, "icons");
if (fs.existsSync(iconsPath)) {
  zip.addLocalFolder(iconsPath, "icons");
}

// Create dist directory if it doesn't exist
const distPath = path.join(projectRoot, "dist");
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, {recursive: true});
}

// Write the zip file
const zipPath = path.join(distPath, "extension.zip");
zip.writeZip(zipPath);

console.log(`Extension packaged successfully: ${zipPath}`);

//upload the zip file to the server
