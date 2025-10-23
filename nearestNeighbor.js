import { calculateDistance } from '../utils/distance.js';

export const nearestNeighbor = (cities) => {
  const unvisited = new Set(cities.map(city => city.id));
  const route = [0];
  unvisited.delete(0);
  
  while (unvisited.size > 0) {
    const current = route[route.length - 1];
    let nearest = null;
    let minDist = Infinity;
    
    for (const cityId of unvisited) {
      const dist = calculateDistance(cities[current], cities[cityId]);
      if (dist < minDist) {
        minDist = dist;
        nearest = cityId;
      }
    }
    
    route.push(nearest);
    unvisited.delete(nearest);
  }
  
  return route;
};