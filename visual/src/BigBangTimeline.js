import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Timeline.css';

const BigBangTimeline = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      "name": "Singularity",
      "time": 0,
      "description": [
        "The Big Bang starts from the singularity, which is a point of infinite density and temperature.",
        "At this moment, space, time, matter, and energy are all compressed into a tiny point.",
        "The laws of physics as we know them break down in this extreme environment.",
        "It marks the beginning of the universe, and all matter and energy are contained in this point.",
        "Everything that exists today, including the fabric of space itself, originates from this moment."
      ],
      "color": "#FF6B6B",
      "position": "top",
      "imageUrl": "https://images1.wikia.nocookie.net/__cb20120620150903/powerlisting/images/d/d0/Focus_singularity.jpg"
    },
    {
      "name": "Inflation",
      "time": 10,
      "description": [
        "During inflation, the universe undergoes an exponentially rapid expansion.",
        "This expansion causes the universe to grow by a huge factor in a fraction of a second.",
        "The universe becomes smoother, solving the horizon and flatness problems.",
        "Quantum fluctuations in space are stretched out and form the seeds for future structures like galaxies.",
        "The rapid inflationary period is crucial for the formation of the universe's large-scale structure."
      ],
      "color": "#4ECDC4",
      "position": "bottom",
      "imageUrl": "https://images1.wikia.nocookie.net/__cb20120620150903/powerlisting/images/d/d0/Focus_singularity.jpg"
    },
    {
      "name": "Formation of Matter",
      "time": 380000,
      "description": [
        "As the universe cools, protons and neutrons combine to form atomic nuclei like hydrogen and helium.",
        "This marks the creation of the first elements in the universe.",
        "However, electrons are still too energetic to combine with atomic nuclei and form atoms.",
        "The universe is still very hot and opaque, with light unable to travel freely.",
        "This stage is the foundation for the future formation of stars and galaxies."
      ],
      "color": "#FFE66D",
      "position": "top"
    },
    {
      "name": "Cosmic Microwave Background",
      "time": 380000,
      "description": [
        "The universe cools enough for the first atoms to form, allowing photons to travel freely through space.",
        "This marks the release of the Cosmic Microwave Background (CMB), the oldest detectable light from the universe.",
        "The CMB provides a snapshot of the universe when it was just 380,000 years old.",
        "The CMB reveals important information about the early universe's temperature, density, and composition.",
        "It serves as a crucial piece of evidence supporting the Big Bang theory."
      ],
      "color": "#FF8B94",
      "position": "bottom"
    },
    {
      "name": "Formation of Galaxies",
      "time": 100000000,
      "description": [
        "Gravity pulls matter together into giant clouds, marking the formation of the first stars and galaxies.",
        "These galaxies begin as small, irregular structures, eventually merging and growing into larger ones.",
        "The formation of galaxies is critical for the development of the universe's large-scale structure.",
        "Stars within galaxies begin to fuse elements, creating heavier elements that are essential for the formation of planets and life.",
        "Over billions of years, galaxies continue to evolve and grow, resulting in the vast array of galaxies we observe today."
      ],
      "color": "#96CEB4",
      "position": "top"
    },
    {
      "name": "Expansion Continues",
      "time": 13800000000,
      "description": [
        "The universe continues to expand at an accelerating rate, driven by dark energy.",
        "Galaxies are moving farther apart, and the expansion of the universe continues to speed up.",
        "Dark energy is believed to be responsible for this acceleration, though its exact nature remains mysterious.",
        "The continued expansion leads to a universe where distant galaxies are no longer visible to us due to the vast distance and the speed of expansion.",
        "The universe's fate is tied to the ongoing expansion, which may continue indefinitely."
      ],
      "color": "#9B7EDE",
      "position": "bottom"
    }
  ];

  useEffect(() => {
    const updateTimeline = () => {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = 500;
      const margin = {
        top: 80,
        right: width * 0.06,
        bottom: 80,
        left: width * 0.06
      };

      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const xScale = d3.scaleLog()
        .domain([1, 13800000000])
        .range([margin.left, width - margin.right]);

      // Add glow filter
      const defs = svg.append("defs");
      const filter = defs.append("filter")
        .attr("id", "glow");

      filter.append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // Main timeline line
      svg.append("line")
        .attr("x1", margin.left)
        .attr("y1", height / 2)
        .attr("x2", width - margin.right)
        .attr("y2", height / 2)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", "4")
        .attr("class", "timeline-line")
        .style("filter", "url(#glow)");

      // Event groups
      const eventGroups = svg.selectAll(".event-group")
        .data(events)
        .enter()
        .append("g")
        .attr("class", "event-group")
        .attr("transform", d => `translate(${xScale(Math.max(1, d.time))}, ${height / 2})`);

      // Vertical lines for events
      eventGroups.append("line")
        .attr("class", "event-line")
        .attr("y1", d => d.position === "top" ? -80 : 20)
        .attr("y2", d => d.position === "top" ? -20 : 80)
        .style("stroke", d => d.color)
        .style("stroke-width", 3);

      // Event circles
      eventGroups.append("circle")
        .attr("class", "event-circle")
        .attr("r", 8)
        .style("fill", d => d.color)
        .style("filter", "url(#glow)")
        .on("click", (event, d) => {
          setSelectedEvent(d);
        });

      // Event labels
      eventGroups.append("text")
        .attr("class", "event-label")
        .attr("y", d => d.position === "top" ? -90 : 90)
        .attr("text-anchor", "middle")
        .text(d => d.name)
        .style("fill", d => d.color)
        .on("click", (event, d) => {
          setSelectedEvent(d);
        });

      // Title
      svg.append("text")
        .attr("class", "timeline-title")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text("The Cosmic Timeline")
        .style("filter", "url(#glow)")
        .style("fill", "#ffffff");
    };

    updateTimeline();

    const resizeObserver = new ResizeObserver(updateTimeline);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [selectedEvent]);

  return (
    <div className="relative w-full">
      <div className="timeline-container" ref={containerRef}>
        <svg ref={svgRef}></svg>
      </div>
      
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="modal-close"
              aria-label="Close modal"
            >
              ×
            </button>
            
            <h3 className="modal-title" style={{ color: selectedEvent.color }}>
              {selectedEvent.name} 
              </h3>
            <h3 className="modal-title" style={{ color: selectedEvent.color }}>
              {selectedEvent.time}
            </h3>
            
           
            
            <div className="modal-description">
              {selectedEvent.description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigBangTimeline;