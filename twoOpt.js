import { calculateTotalDistance } from '../utils/distance.js';

export const twoOpt = (route, cities) => {
  let bestRoute = [...route];
  let bestDistance = calculateTotalDistance(bestRoute, cities);
  let improved = true;
  
  while (improved) {
    improved = false;
    for (let i = 1; i < bestRoute.length - 2; i++) {
      for (let j = i + 2; j < bestRoute.length; j++) {
        const newRoute = [...bestRoute];
        // Reverse the segment between i and j
        const segment = newRoute.slice(i, j).reverse();
        newRoute.splice(i, j - i, ...segment);
        
        const newDistance = calculateTotalDistance(newRoute, cities);
        if (newDistance < bestDistance) {
          bestRoute = newRoute;
          bestDistance = newDistance;
          improved = true;
        }
      }
    }
  }
  
  return bestRoute;
};