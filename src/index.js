/*   
Helper:
map & forEach =>https://codeburst.io/javascript-map-vs-foreach-f38111822c0f#:~:text=map()%20allocates%20memory%20and,instead%20return%20a%20new%20array.
*/

const toyFormContainer = document.querySelector(".container");
const addBtn = document.querySelector("#new-toy-btn");
let addToy = false;
const addToyForm = document.getElementsByClassName('add-toy-form')
/////////////////////////////////////////
const toysURL='http://localhost:3000/toys'

//   submit(create new toy) EventListener
toyFormContainer.addEventListener("submit", function(event){
  event.preventDefault()
  //  console.log(event.target.name)
  //  console.log(event.target.image)
  const toyName = event.target.name.value //grab input toy name
  const toyImage = event.target.image.value //grab input toy image link
  //console.log(toyName,toyImage)

  // POST request to toysURL to allow new toy be added to collection
  fetch(toysURL, {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name":toyName,
      "image":toyImage,
      likes: 0 
    })
  })
  .then(resp => resp.json())
  .then(newToy => {
    // fetch updated the DB.json(backend)
    // now I need to update to DOM (frontend)
    let newToyCard = `<div class="card" data-toy-id= "${newToy.id}">
      <h2>${newToy.name}</h2>
      <img src="${newToy.image}" class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button class="like-btn"> 👍 </button>
      <button class="delete-btn"> 🙅 </button>
      </div>`
    const collection = document.getElementById('toy-collection')
    collection.innerHTML += newToyCard
  })
})

 /*  click to show add new toy section*/
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })


  //        Fetch method 1        //
  // function fetchToy() {
  //   fetch(toysURL)
  //   .then(resp => resp.json())
  //   .then(toysData => {
  //     //map() allocates memory and stores return values. 
  //     //forEach() throws away return values and always returns undefined.
  //     let card = toysData.map(function(toy){
  //       return ` <div class="card" data-toy-id= "${toy.id}">
  //       <h2>${toy.name}</h2>
  //       <img src="${toy.image}" class="toy-avatar" />
  //       <p>${toy.likes} Likes </p>
  //       <button class="like-btn"> 👍 </button>
  //       <button class="delete-btn"> 🙅 </button>
  //       </div> `
  //       })
  //       const collection = document.getElementById('toy-collection')
  //       collection.innerHTML += card
  //     })
  // }
  
  

//        Fetch method 2 + renderToy        //
function fetchToy() {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(toysData => {
    toysData.map(renderToy);
  })
}


function renderToy(toy){
      const card = `<div class="card" data-toy-id= "${toy.id}">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn"> 👍 </button>
      <button class="delete-btn"> 🙅 </button>
      </div>`
      // <div class="card">
      // <h2>Woody</h2>
      // <img src=toy_image_url class="toy-avatar" />
      // <p>4 Likes </p>
      // <button class="like-btn">Like <3</button>
      // </div>
      const collection = document.getElementById('toy-collection')
      collection.innerHTML += card
      }


  




//invoke
fetchToy()