let numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?");
let personalMovieDB = {
    count : numberOfFilms,
    movies : {}, 
};

do{
    let lastFilm = prompt("Один из послених просмотренных фильмов?");
    let rating = prompt("На сколько оцените его?");
    if(lastFilm == null || lastFilm.length>50 || lastFilm == ""){ 
        alert("Wrong enter!");
        continue;
    }
    personalMovieDB.movies[lastFilm] = rating;
    break; 
}while(true);
console.log(personalMovieDB);