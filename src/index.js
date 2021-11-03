console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function(){
    
    let dogUl = document.querySelector("#dog-breeds")
        
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(seeDogs)
    
    function seeDogs(jsonObject){
        let dogImageContainer = document.getElementById("dog-image-container")
        let arrayOfDogs = jsonObject.message 
        arrayOfDogs.forEach(url => {
            dogImageContainer.innerHTML += makeImageTagString(url)
        })
    }

    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(res => {
        let dogBreeds = Object.keys(res.message)
        dogBreeds.forEach((breed) => {
            dogUl.innerHTML += `<li data-info="breed">${breed}</li>`
        })
    })

    dogUl.addEventListener("click", function(e) {
        if(e.target.dataset.info === "breed") {
            e.target.style.color = "blue"
        }
    })
    function makeFetchHappen() {
        return fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
    }
    let selectDog = document.getElementById("breed-dropdown")
        selectDog.addEventListener("change", (event) => {
        makeFetchHappen()
        .then(res => {
            let dogBreedsArr = Object.keys(res.message)
            let arrayFilter = dogBreedsArr.filter(breed => {
                return breed.startsWith(event.target.value)
            })
            // console.log(event.target.value)
            // console.log(arrayFilter)

            dogUl.innerHTML = ""
            arrayFilter.forEach((breed) => {
                dogUl.innerHTML += `<li data-info="breed">${breed}</
                li>`
            })
        })
    })

    function makeImageTagString(url) {
        return `<img src="${url}"/>`
    }
})     
 

        

    


