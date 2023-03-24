// create a new file input element
var input = document.getElementById("file");

//ingredienti presenti in dispensa quando si va a fare la spesa
var ingredienti_posseduti = [];

//ingredienti da comprare
var ingredienti_necessari = [];

//ricette selezionate per una spesa
var ricette_selezionate = [];

//lista completa delle ricette che conosciamo
var recipes={
    "pollo al curry" : ["pollo", "curry", "farina", "latte"],
    "pollo alla soia" : ["pollo", "soia", "farina"],
    "amatriciana" : ["pomodoro", "pasta", "pancetta"]
}


var switch_color= function(){
    const myDiv = document.querySelectorAll('.ingr');
    console.log(myDiv);
      myDiv.forEach( div => {
        div.addEventListener('click', function() {
            if(div.classList.contains("F")){
                div.classList.remove('F');
                div.classList.add('T');
            }
            else if(div.classList.contains("P")){
                div.classList.remove('P');
                div.classList.add('T');
            }
          });
      })
}
//funzione che crea i div colorati con gli ingredienti da comprare
var display_ingredienti = function (ingredienti){
    var container = document.getElementById("ingredients");
    var divs= Object.entries(ingredienti).map( value => {
        var div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("ingr")
        div.classList.add(value[1]);
        var nested_div=document.createElement("div");
        nested_div.classList.add("card-body");
        nested_div.innerText = value[0];
        div.appendChild(nested_div);
        return div;
    })

    divs.forEach(function(div) {
        container.appendChild(div);
      });
    switch_color();
}

//funzione che calcola quali sono gli ingredienti che mancano sulla base delle ricette scelte e gli ingredienti già posseduti
var trova_ingredienti_necessari= function(ricette, ingredienti){
    var lista_ingredienti={};

    //AGGIUNGE CIO CHE NON C'È
    for(let recipe in ricette){
        let ingr_ricetta_selezionata= recipes[ricette[recipe]];
        for(let ingrediente in ingr_ricetta_selezionata){
            lista_ingredienti[ingr_ricetta_selezionata[ingrediente]]="F"
        }
    }
    //AGGIUNGO CIO CHE C'È
    //da rivedere per togliere ingredienti che non servono
    for(ingr in ingredienti){
        lista_ingredienti[ingredienti[ingr].nome]=ingredienti[ingr].quantità;
    }
    return lista_ingredienti;
}


//funzione che prende le ricette selezionate e genera la lista di ingredienti da comprare
var selezionaRicette= function(){
    document.getElementById("ingredients").innerHTML='';
    ricette_selezionate=[];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      // Get the parent container element of the checkbox
      const parent = checkbox.parentNode;

      // Get the value of the "data-nome" attribute from the parent container
      const nome = parent.getAttribute('data-nome');

      // Add the nome value to the selectedCheckboxes array
      ricette_selezionate.push(nome);
    }
});

    ingredienti_necessari= trova_ingredienti_necessari(ricette_selezionate, ingredienti_posseduti);
    display_ingredienti(ingredienti_necessari);
}


//PARTE PER LEGGERE IL FILE E POPOLARE GLI INGREDIENTI POSSEDUTI

input.type = "file";
const myButton = document.getElementById("myButton");

// Set the onclick function to call the function defined in myscript.js
myButton.onclick = selezionaRicette;


// add an event listener for when the file is selected
input.addEventListener("change", function () {
  // create a new file reader
  var reader = new FileReader();

  // add an event listener for when the file is loaded
  reader.addEventListener("load", function () {
    // get the contents of the file as text
    var text = reader.result;

    // split the text into an array of values
    var values = text.split("\n");
    for(let i=0; i<values.length; i++){
        let obj={
            nome: values[i].split(",")[0],
            quantità: values[i].split(",")[1]
        }
        ingredienti_posseduti.push(obj);
    }
    console.log(ingredienti_posseduti);

  });

  // read the file as text
  reader.readAsText(input.files[0]);
});

//PARTE PER POPOLARE LA CHECKLIST DI RICETTE

var recipeList = document.getElementById("recipe-list");

      // mappa le ricette in card
      for(const [key, value] of Object.entries(recipes)){
        var card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <div data-nome="${key}">
                <h2>${key}</h2>
                <input type="checkbox">
            </div>
        `;
        // aggiungi la card alla lista delle ricette
        recipeList.appendChild(card);
      }
       


      
      
