const button = document.querySelector('button');
const input = document.querySelector('input');
const span = document.querySelector('span')
const list = document.querySelector('film');

button.addEventListener('click', () =>{

    const objet = input.value  
    getFilm(objet)
    input.focus()
})

function getFilm(objetFilm,page = 1){
    console.log(page)
fetch("https://www.omdbapi.com/?s="+objetFilm+"&apikey=f6e256e1&page="+page)
    .then(response => {
        return response.json()
    })
    .then(films =>{
        //console.log(films)
        displayFilm(films)
    })
}
function displayFilm(films){
    list.innerHTML = ''
    span.textContent = "Nombre de Film Trouve :" + films.totalResults
    
    films.Search.forEach(film =>{
        
        const detail = document.createElement('div');
        const filmList = document.createElement("p")
        var image = document.createElement("img")

        filmList.innerHTML = film.Title
        image.src = film.Poster
        image.alt = "";
        list.appendChild(detail)
        detail.appendChild(filmList)
        detail.appendChild(image)
    })
    if(films.totalResults>10){
        const listButton = document.createElement('div');
        result = films.totalResults

        var nbPage = 1
        
        while(result>10){
            
            
            const pageSup = document.createElement('button');
            pageSup.textContent = nbPage

            
            pageSup.addEventListener('click' ,() => {
                let page = pageSup.textContent
                getFilm(input.value,page)

            },false)  
            
            list.appendChild(listButton)
            listButton.appendChild(pageSup)

            nbPage = nbPage +1
            result = result - 10
        }
       
    }
}