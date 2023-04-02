
function displayDefault(){//A function that displays the first movie in the data base
        
    fetch(`http://localhost:3000/films`)//fetching for data
    .then(res => res.json())//converting the data
    .then(films => {
        const currentFilm = document.getElementById('current')//defining the place the default movie will be displayed
        const defaultFilm = films[0]//Grabbing the first movie
//Creating the HTML card that will display the details
        currentFilm.innerHTML = `
            <div id='defMovie'>
                <h2>${defaultFilm.title}</h2>
                <p>Duration: ${defaultFilm.runtime} minutes</p>
                <p>Maximum viewers: ${defaultFilm.capacity} people</p>
                <p>Airing at: ${defaultFilm.showtime}</p>
                <p>Tickets Sold: ${defaultFilm.tickets_sold} tickets</p>
                <p>Description: ${defaultFilm.description}</p>
                <img id="image" src="${defaultFilm.poster}">
            </div>
        `
    })
    .catch(error => console.error(error));
   //a function that will throw any errors encounteres
}

function displayMovies(){//a function that will display the details of the films when clicked in in the menu section

    fetch(`http://localhost:3000/films`)//fetching data
    .then(res => res.json())//converting the data
    .then(films => {
        const cardList = document.getElementById('movieList');//declaring the parent node
        const master = document.getElementById('display');
        
        films.forEach(film => {//creating an element that will link the menu to the display container
            const card = document.createElement('li');
            card.innerHTML = `<a href="#" id="movie-${film.id}">${film.title}</a>`;
            cardList.appendChild(card);//appending the child node

            // Add event listener to each film title link
            card.addEventListener('click', (event) => {
                event.preventDefault()//preventing default reload
                const selectedFilmId = event.target.id.split('-')[1]//
                fetch(`http://localhost:3000/films/${selectedFilmId}`)
                .then(res => res.json())//fetching the data and converting
                .then(selectedFilm => {
                    const currentFilm = document.getElementById('current')
                    //creating the card that will display the details
                    currentFilm.innerHTML = `
                    <div id='selMovie'>
                        <h2>${selectedFilm.title}</h2>
                        <p>Duration: ${selectedFilm.runtime} minutes</p>
                        <p>Maximum viewers: ${selectedFilm.capacity} people</p>
                        <p>Airing at: ${selectedFilm.showtime}</p>
                        <p>Tickets Sold: ${selectedFilm.tickets_sold} tickets</p>
                        <p>Description: ${selectedFilm.description}</p>
                        <img id="image" src="${selectedFilm.poster}">
                    </div>
                    `
                })

                  });
                  
                  

      })

    })
}

displayDefault();//calling the functions to manipulate the DOM and fetch from server
displayMovies();


function buyTickets() {
  // const currentMovie = document.getElementById('current');
  const buyTick = document.getElementById('buy');
  
  buyTick.addEventListener('click', (event) => {
    event.preventDefault(); // prevent default form submission
    newSales = tickets_sold += 1; // increment tickets_sold by 1
    fetch(`http://localhost:3000/films/`),{
      method: 'PATCH',
      headers:{
        "Content-Type" : "application/json",
        "Accept":  "application/json"
      },
      body: JSON.stringify(
        {
          tickets_sold : newSales
        }
      )
    } //fetching and converting data from server
      .then(res => res.json())
      .then(films => films.forEach(film =>{
        return film.tickets_sold
      }))

      })
      .catch(error => console.log(error)); // add catch block to handle errors
  
}
// buyTickets()

        // const noOfTickets = parseInt(document.getElementById('numberOfTickets').value); // convert value to integer - user input on number of tickets
        // const newTicketsSold = film.tickets_sold + noOfTickets;
        // const remainingTickets = film.capacity - film.tickets_sold;

        // if (noOfTickets > remainingTickets) {
        //   alert('Sorry, we are sold out. Kindly try other titles');
        // } else {
        //   return newTicketsSold = film.tickets_sold + noOfTickets
           
        // }

        // fetch(`http://localhost:3000/films/${currentMovie.value}`, { // use film.id instead of movie.id
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     tickets_sold: newTicketsSold
        //   })
        // })


