function generateDocumentation(
  analysis,
  scanResult,
  routes,
  databaseInfo
) {

  const docs = {
    overview: "",
    techStack: {},
    projectStats: {},
    features: []
  };

  docs.overview =
    `This is a ${analysis.framework} based application.`;

  docs.techStack = {
    frontend: analysis.frontend,
    backend: analysis.backend,
    database: analysis.database
  };

  docs.projectStats = {
    totalFiles: scanResult.totalFiles,
    controllers: scanResult.controllers.length,
    models: scanResult.models.length,
    routes: routes.length,
    components: scanResult.components.length,
    pages: scanResult.pages.length
  };

  // Features Detection

  if (
    routes.some(r =>
      r.path.toLowerCase().includes("login")
    )
  ) {
    docs.features.push("Authentication");
  }

  if (
    routes.some(r =>
      r.path.toLowerCase().includes("product")
    )
  ) {
    docs.features.push("Product Management");
  }

  if (
    routes.some(r =>
      r.path.toLowerCase().includes("order")
    )
  ) {
    docs.features.push("Order Management");
  }

  if (
    databaseInfo.collections.length > 0 ||
    databaseInfo.tables.length > 0
  ) {
    docs.features.push("Database Integration");
  }

  return docs;
}

module.exports = generateDocumentation;