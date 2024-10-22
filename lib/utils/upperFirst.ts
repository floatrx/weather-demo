/**
 * Capitalize the first letter of a string
 * @param str
 */
export const upperFirst = (str?: string | null): string => {
  return typeof str === 'string' && str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

export const formatCityName = (cityName: string): string => {
  return upperFirst(decodeURIComponent(cityName));
};
