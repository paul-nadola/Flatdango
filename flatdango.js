


fetch(`http://localhost:3000/films`)
  .then(res => res.json())
  .then(films => displayMovies(films))
  .catch(error => console.error(error));//Fetching data ,passing it in our function

function displayMovies(films) {//declaring our function
  const currentFilm = document.getElementById('current');
  const defaultFilm = films[0];

  currentFilm.innerHTML = `
    <div id='defMovie'>
      <h2>${defaultFilm.title}</h2>
      <p>Duration: ${defaultFilm.runtime} minutes</p>
      <p>Maximum viewers: ${defaultFilm.capacity} people</p>
      <p>Airing at: ${defaultFilm.showtime}</p>
      <p>Tickets Sold: ${defaultFilm.tickets_sold} tickets</p>
      <p>Description: ${defaultFilm.description}</p>
      <button type="submit" id='buy'>BUY TICKET</button>
      <img id="image" src="${defaultFilm.poster}">
    </div>
  `;

  const cardList = document.getElementById('movieList');//Grabbing elements and declaring variables
  films.forEach(film => {//iterating through the elements to display titles on the left side
    const card = document.createElement('li');
    card.innerHTML = `<a href="#" id="movie-${film.id}">${film.title}</a><p></p>`;
    cardList.appendChild(card);//Creating a card that displays movie titles

    card.addEventListener('click', (event) => {
      event.preventDefault();//adding a click event listener that will display movie details when clicked
      const selectedFilmId = event.target.id.split('-')[1];
      fetch(`http://localhost:3000/films/${selectedFilmId}`)//fetching data to display movie details
        .then(res => res.json())
        .then(selectedFilm => {
          const currentFilm = document.getElementById('current');
          //creating a card that will display movie details
          currentFilm.innerHTML = `
            <div id='selMovie'>
              <h2>${selectedFilm.title}</h2>
              <p>Duration: ${selectedFilm.runtime} minutes</p>
              <p>Maximum viewers: ${selectedFilm.capacity} people</p>
              <p>Airing at: ${selectedFilm.showtime}</p>
              <p>Tickets Sold: ${selectedFilm.tickets_sold} tickets</p>
              <p>Description: ${selectedFilm.description}</p>
              <button type="submit" id='buy'>BUY TICKET</button>
              <img id="image" src="${selectedFilm.poster}">
            </div>
          `;
          const buyTick = currentFilm.querySelector('#buy');
          buyTick.addEventListener('click', (event) => {
            event.preventDefault();//event listener that will handle buy tickets
            selectedFilm.tickets_sold += 1;
            fetch(`http://localhost:3000/films/${selectedFilm.id}`, {//Making a patch request to enable the buttons functionality
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                tickets_sold: selectedFilm.tickets_sold
              })
            })
              .then(res => res.json())
              .then(updatedFilm => {//If statement that tells the user if the purchase is successful or the tickets are sold out
                if (updatedFilm.tickets_sold < updatedFilm.capacity) {
                  alert(`You have purchased a ticket for ${updatedFilm.title}! Enjoy the movie for the next ${updatedFilm.runtime} minutes.`);
                } else {
                  alert(`Sorry, the movie ${updatedFilm.title} is sold out! Please check out our other movies.`);
                  const direct = currentFilm.querySelector('p');
                  direct.textContent = 'SOLD OUT!!!';
                  // card.appendChild(direct);
                }
              })
              .catch(error => console.log(error));
          });
        })
        .catch(error => console.log(error));
    });
  });
}


