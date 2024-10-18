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
