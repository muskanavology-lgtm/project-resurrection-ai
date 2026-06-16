const fs = require("fs");
const path = require("path");

const detectProject = async (projectPath) => {
  const result = {
    framework: "Unknown",
    frontend: "",
    backend: "",
    database: "",
  };

  const files = fs.readdirSync(projectPath);

  // Laravel
  if (files.includes("artisan")) {
    result.framework = "Laravel";
    result.backend = "PHP";
    result.database = "MySQL";
    return result;
  }

  // WordPress
  if (files.includes("wp-config.php")) {
    result.framework = "WordPress";
    result.backend = "PHP";
    result.database = "MySQL";
    return result;
  }

  // Core PHP
  if (files.includes("index.php")) {
    result.framework = "Core PHP";
    result.backend = "PHP";
    result.database = "MySQL";
    return result;
  }

  // HTML Template
  if (files.includes("index.html")) {
    result.framework = "HTML Template";
    result.frontend = "HTML/CSS/JS";
    return result;
  }

  // Node / React / MERN
  if (files.includes("package.json")) {
    const packagePath = path.join(projectPath, "package.json");

    const packageData = JSON.parse(
      fs.readFileSync(packagePath, "utf8")
    );

    const deps = {
      ...packageData.dependencies,
      ...packageData.devDependencies,
    };

    if (deps.react) {
      result.frontend = "React";
    }

    if (deps.express) {
      result.backend = "Express";
    }

    if (deps.mongoose || deps.mongodb) {
      result.database = "MongoDB";
    }

    if (
      deps.react &&
      deps.express &&
      (deps.mongodb || deps.mongoose)
    ) {
      result.framework = "MERN";
    } else {
      result.framework = "Node Project";
    }

    return result;
  }

  return result;
};

module.exports = detectProject;