let personalMovieDB = {
    privat : false, 
    movies : { 
    },
    
};

for(let i = 0; i<3; i++){ 
    let movie = prompt("Введите название фильма "+(i+1)); 
    let raiting = prompt("Введите оценку фильма "+ (i+1)); 
    personalMovieDB.movies[movie] = raiting; 
}

function PrintTable(personalMovieDB){
    if(personalMovieDB.privat == false){ 
        createTable(personalMovieDB);  
    }
    else{ 
        console.log("privat is true."); 
    }
}

function createTable(object) {
    const table = document.createElement('table');
    table.setAttribute('border', '1px');

    let row = table.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();

    cell1.innerHTML = "Название фильма";
    cell2.innerHTML = "Оценка фильма";

    for (let elem in object.movies) {
        let row = table.insertRow();

        let cell1 = row.insertCell();
        let cell2 = row.insertCell();

        cell1.innerHTML = elem;
        cell2.innerHTML = object.movies[elem];
    }

    document.body.prepend(table);
}

PrintTable(personalMovieDB);

