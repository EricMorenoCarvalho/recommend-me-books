const searchQuery = "busqueda";

const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

const booksArray = [[, ,], [, ,], [, ,]]

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.items && data.items.length > 0) {
      data.items.slice(0, 3).forEach((item, index) => {
        booksArray[index][0] = item.volumeInfo.title
        booksArray[index][1] = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No disponibles'
        booksArray[index][2] = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'No disponible'
        console.log(booksArray[index][0])
        console.log(booksArray[index][1])
        console.log(booksArray[index][2])
      });
    } else {
      console.log('No se encontraron resultados.');
    }
  })
  .catch((error) => {
    console.error('Error al hacer la solicitud:', error);
  });