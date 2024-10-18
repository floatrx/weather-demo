export const getBgImageByCity = async (city: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&client_id=tnpsehSdQ6o1Y5PAUZls-zfGjqgE5vx1exeAqVyXKG0&per_page=1`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching background image:', error);
    return null;
  }
};
