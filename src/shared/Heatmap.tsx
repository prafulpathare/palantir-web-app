// Heatmap.tsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type HeatmapProps = {
  rows?: number;
  cols?: number;
  width?: number;
  height?: number;
};

type CellData = {
  row: number;
  col: number;
  value: number;
};


const Heatmap: React.FC<HeatmapProps> = ({ rows = 10, cols = 10, width = 300, height = 300 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data = d3.range(rows * cols).map((_: number, i: number) => ({
      row: Math.floor(i / cols),
      col: i % cols,
      value: Math.floor(Math.random() * 100),
    }));

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, 100]); // adjust domain to your data

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Clear previous render

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: CellData) => d.col * cellWidth)
      .attr("y", (d: CellData) => d.row * cellHeight)
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("fill", (d: CellData) => colorScale(d.value)!);

    // Optional: add text values
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d: CellData) => d.col * cellWidth + cellWidth / 2)
      .attr("y", (d: CellData) => d.row * cellHeight + cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "black")
      .attr("font-size", "10px")
      .text((d: CellData) => d.value);
  }, [rows, cols, width, height]);

  return <svg ref={svgRef} />;
};

export default Heatmap;