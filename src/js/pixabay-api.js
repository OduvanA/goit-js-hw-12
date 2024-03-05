export function getImages(value) {

  const searchParams = new URLSearchParams({
    key: '42585608-470f45864f44da3a6987e4378',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    });
}

