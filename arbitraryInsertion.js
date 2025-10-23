import { calculateDistance } from '../utils/distance.js';

export const arbitraryInsertion = (cities) => {
  if (cities.length <= 2) return cities.map((_, i) => i);
  
  const route = [0, 1, 0];
  const unvisited = new Set(cities.slice(2).map(city => city.id));
  
  while (unvisited.size > 0) {
    const cityId = unvisited.values().next().value;
    let bestPosition = -1;
    let minCost = Infinity;
    
    for (let i = 0; i < route.length - 1; i++) {
      const cost = calculateDistance(cities[route[i]], cities[cityId]) + 
                  calculateDistance(cities[cityId], cities[route[i + 1]]) - 
                  calculateDistance(cities[route[i]], cities[route[i + 1]]);
      
      if (cost < minCost) {
        minCost = cost;
        bestPosition = i + 1;
      }
    }
    
    route.splice(bestPosition, 0, cityId);
    unvisited.delete(cityId);
  }
  
  return route.slice(0, -1);
};