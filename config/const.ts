// https://home.openweathermap.org/api_keys
export const API_KEY = process.env.API_KEY || '';

export const OPEN_WEATHER_MAP_API_URL = 'https://api.openweathermap.org';
export const LOCATION_INFO_STORE_KEY = 'weatherWidget';
export const COOKIES_LOCALE_KEY = 'locale';

export const site = {
  links: [
    { href: '/info', label: 'Info' },
    { href: '/demos', label: 'Demos' },
    { href: '/dnd', label: 'Drag&Drop' },
  ],
};
