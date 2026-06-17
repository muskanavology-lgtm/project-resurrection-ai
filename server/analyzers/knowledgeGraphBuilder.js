function buildKnowledgeGraph(dependencyGraph = {}) {

  const nodes = [];
  const edges = [];

  Object.keys(dependencyGraph).forEach((file) => {

    nodes.push({
      id: file,
      label: file
    });

    const deps = dependencyGraph[file] || [];

    deps.forEach((dep) => {

      edges.push({
        source: file,
        target: dep
      });

    });

  });

  return { nodes, edges };
}

module.exports = buildKnowledgeGraph;