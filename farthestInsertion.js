import { calculateDistance } from '../utils/distance.js';

export const farthestInsertion = (cities) => {
  if (cities.length <= 2) return cities.map((_, i) => i);
  
  const route = [0, 1, 0];
  const unvisited = new Set(cities.slice(2).map(city => city.id));
  
  while (unvisited.size > 0) {
    let bestCity = null;
    let maxDist = -1;
    
    // Find farthest city from current route
    for (const cityId of unvisited) {
      let minDistToRoute = Infinity;
      for (const routeCity of route.slice(0, -1)) {
        const dist = calculateDistance(cities[cityId], cities[routeCity]);
        minDistToRoute = Math.min(minDistToRoute, dist);
      }
      if (minDistToRoute > maxDist) {
        maxDist = minDistToRoute;
        bestCity = cityId;
      }
    }
    
    // Find best position to insert
    let bestPosition = -1;
    let minCost = Infinity;
    for (let i = 0; i < route.length - 1; i++) {
      const cost = calculateDistance(cities[route[i]], cities[bestCity]) + 
                  calculateDistance(cities[bestCity], cities[route[i + 1]]) - 
                  calculateDistance(cities[route[i]], cities[route[i + 1]]);
      
      if (cost < minCost) {
        minCost = cost;
        bestPosition = i + 1;
      }
    }
    
    route.splice(bestPosition, 0, bestCity);
    unvisited.delete(bestCity);
  }
  
  return route.slice(0, -1);
};