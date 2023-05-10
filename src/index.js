import { Spring, Vector } from "./classes/index.js";
import "./utils/polyfills/index.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width = 800,
  H = canvas.height = 600;

// Define the points that make up the spring
const pointA = new Vector.Vec3(W / 2, H / 2, 200);
const pointB = new Vector.Vec3(W / 2, (H / 2 + 100), 50);
const points = [pointA, pointB];

// Set options for the spring
const options = {
  stiffness: 0.1, // Controls how stiff the spring is
  dampingFactor: 0.9, // Controls how much the spring oscillates
};


// Initialize the Spring object 
// with the points and options
const spring = new Spring(points, options);
console.log(spring.points)
for (var sus of spring.forceSustained()) {
  console.log(sus)
}