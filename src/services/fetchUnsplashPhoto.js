const fetchUnsplashPhoto = async (query) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_API_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.full;
    }
    return null;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return null;
  }
};

export default fetchUnsplashPhoto;
