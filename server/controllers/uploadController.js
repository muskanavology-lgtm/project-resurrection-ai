
const generateDocumentation =require("../analyzers/documentationGenerator");
const databaseAnalyzer = require("../analyzers/databaseAnalyzer");
const extractRoutes = require("../analyzers/routeExtractor");
const generateSummary = require("../analyzers/projectSummary");
const scanProject = require("../analyzers/projectScanner");
const extractZip = require("../utils/zipExtractor");
console.log("extractZip =", extractZip);
const detectProject = require("../analyzers/projectDetector");

const uploadProject = async (req, res) => {
  try {
    console.log("===== Upload Request Received =====");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Uploaded File:", req.file.path);

    // Step 1: Extract ZIP
    const extractedPath = await extractZip(req.file.path);

    console.log("ZIP Extracted Successfully");
    console.log("Extract Path:", extractedPath);

    // Step 2: Detect Project
const analysis = await detectProject(extractedPath);
const scanResult = scanProject(extractedPath);
    console.log("Project Analysis:", analysis);
const routes = extractRoutes(extractedPath);
const databaseInfo =databaseAnalyzer(extractedPath);
    const summary = generateSummary(
  analysis,
  scanResult
);
const documentation =
generateDocumentation(
  analysis,
  scanResult,
  routes,
  databaseInfo
);
    // Step 3: Send Response
return res.json({
  success: true,
  uploadedFile: req.file.filename,
  extractedPath,
  analysis,
  scanResult,
  summary,
  routes,
  databaseInfo,
  documentation
});

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { uploadProject };