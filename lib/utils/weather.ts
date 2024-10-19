export const convertTemperature = (kelvin: number, format: 'C' | 'K' | 'F') => {
  switch (format) {
    case 'C':
      return (kelvin - 273.15).toFixed();
    case 'F':
      return (((kelvin - 273.15) * 9) / 5 + 32).toFixed();
    case 'K':
    default:
      return kelvin.toFixed();
  }
};

/**
 * Check if the temperature in Kelvin is considered cold (below freezing point of water).
 * @param kelvin - Temperature in Kelvin
 * @returns boolean - True if the temperature is below freezing point, otherwise false
 */
export const isNegativeTemperature = (kelvin: number): boolean => {
  const freezingPointInKelvin = 273.15;
  return kelvin < freezingPointInKelvin;
};
