import CytoscapeComponent from "react-cytoscapejs";

export const Graph = ({ points, route }) => {
  const mapPoints = (points) =>
    Object.keys(points).map((p) => ({
      data: {
        id: p,
        label: p,
      },
      position: {
        x: points[p].x * 50 + 50,
        y: points[p].y * 50 + 50,
      },
    }));

  const mapRoute = (route) => {
    let edges = [];
    if (!route) return edges;
    for (let i = 0; i < route.length; i++) {
      edges.push({
        data: {
          id: `${route[i]}_${route[(i + 1) % route.length]}`,
          source: `${route[i]}`,
          target: `${route[(i + 1) % route.length]}`,
        },
      });
    }
    return edges;
  };
  const elements = mapPoints(points).concat(mapRoute(route));
  return (
    <>
      {elements && Object.keys(elements).length > 0 && (
        <CytoscapeComponent
          elements={elements}
          style={{
            width: "600px",
            height: "600px",
            position: "absolute",
            backgroundColor: "#2D3044",
          }}
          zoomingEnabled={false}
          panningEnabled={false}
          boxSelectionEnabled={false}
          userPanningEnabled={false}
          userZoomingEnabled={false}
          autoungrabify={true}
        />
      )}
    </>
  );
};
