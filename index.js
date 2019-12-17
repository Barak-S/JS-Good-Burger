document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  const baseURL = "http://localhost:3000/burgers"

  const burgerMenu = document.getElementById("burger-menu")
  const burgerUl = document.getElementsByTagName("ul")[0]
  allBurgers = []

  function getBurgers(){
    fetch(baseURL)
    .then(function(response){return response.json()})
    .then(function(burgers){
      allBurgers = burgers
      burgers.forEach(function(burger){appendBurger(burger)}
      )})
  }

  function appendBurger(burger){
    burgerDiv = document.createElement("div")
    burgerDiv.class = "burger"
    burgerDiv.innerHTML = 
  `<h3 class = "burger_title">${burger.name}</h3>
  <img src = ${burger.image}>
  <p class = "burger_description">${burger.description}</p>
  <button class = "button" id = "${burger.id}">Add to Order</button>`
    burgerMenu.appendChild(burgerDiv)
  }


  burgerMenu.addEventListener("click", function(e){
    if (e.target.innerText === "Add to Order"){
      const li = document.createElement("li")
      let title = (e.target.parentNode.getElementsByClassName("burger_title")[0].innerText)
      li.innerText = `${title}`
      burgerUl.appendChild(li)
    }
  })

  const form = document.getElementById("custom-burger")

  form.addEventListener("submit", function(e){
    e.preventDefault()
    debugger
    let newBurger = {
      name: e.target.name.value,
      image: e.target.url.value,
      description: e.target.description.value
    }

    createBurger(newBurger)

  })


  function createBurger(newBurger){
    fetch(baseURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(newBurger)
    })
    .then(function(resp){ return resp.json()})
    .then(function(newBurger){appendBurger(newBurger)})
    }


  getBurgers()

})



