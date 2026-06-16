const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

async function extractZip(zipPath) {
  const fileName = path.basename(zipPath, ".zip");

  const extractPath = path.join(
    __dirname,
    "../uploads/extracted",
    fileName
  );

  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true });
  }

  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  return extractPath;
}

module.exports = extractZip;