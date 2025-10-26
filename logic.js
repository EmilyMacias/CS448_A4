const mapWidth = 1968 / 2.4;
const mapHeight = 1580 / 2.4; // the 2.4 can be increased or decreased to adjust the size of the map while maintaining the aspect ratio

// These are the extent of our datapoints, coordinates-wise
const longitudeRange = [-122.52876879101329, -122.34501499128038];
const latitudeRange = [37.69947941416328, 37.81633202723721];

// Note: I thik this was incorrect in the starter code provided so I had to get some help from ChatGPT to fix it.
const mapFrameGeoJSON = (() => {
  const coords = [
    [longitudeRange[0], latitudeRange[0]],
    [longitudeRange[1], latitudeRange[1]],
  ];
  return {
    type: "Feature",
    geometry: { type: "LineString", coordinates: coords },
  };
})();

// This projects a given [longitude, latitude] pair into [x, y] pixel positions onto our image.
// D3 geoMercator projection fitted to San Francisco map
const projection = d3.geoMercator().fitExtent(
  [
    [0, 0],
    [mapWidth, mapHeight],
  ],
  mapFrameGeoJSON
);

var svg = d3
  .select("#map")
  .attr("width", mapWidth)
  .attr("height", mapHeight)
  .style("border", "1px solid black");

// Add map image to our container
svg
  .append("image")
  .attr("width", mapWidth)
  .attr("height", mapHeight)
  .attr("href", "sf_map.png");

d3.csv("data/SF_Film_Locations_Filtered.csv").then((data) => {
  const films = svg
    .selectAll("film_circles")
    .data(data)
    .join("circle")
    .attr("cx", (d) => projection([d.Longitude, d.Latitude])[0])
    .attr("cy", (d) => projection([d.Longitude, d.Latitude])[1])
    .attr("r", 2)
    .attr("fill", "black");

  const circle1 = svg
    .append("circle")
    .attr("cx", projection([-122.45, 37.75])[0])
    .attr("cy", projection([-122.45, 37.75])[1])
    .attr("r", 100)
    .attr("fill", "rgba(0,0,255,0.2)")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  const circle2 = svg
    .append("circle")
    .attr("cx", projection([-122.4, 37.75])[0])
    .attr("cy", projection([-122.4, 37.75])[1])
    .attr("r", 100)
    .attr("fill", "rgba(255,0,0,0.2)")
    .attr("stroke", "red")
    .attr("stroke-width", 2);
});
