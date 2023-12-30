const searchForm=document.querySelector("form")
const searchResultDiv=document.querySelector(".search-result")
const container=document.querySelector(".container")
let searchQuery="";

const APP_ID='46fc35a5'
const APP_KEY='99fd0e4046d758b9c9b4dee5bea08146'
const baseURL='https://api.edamam.com/search?q='

searchForm.addEventListener("submit",(e)=>{
e.preventDefault();
searchQuery=e.target.querySelector('input').value;
fetchAPI(searchQuery);

})
async function fetchAPI(searchQuery)
{
    const response=await fetch(baseURL+searchQuery+'&app_id='+APP_ID+'&app_key='+APP_KEY+"&to=12")
    
        const data=await response.json();
        console.log(data)
        generateHTML(data.hits)

}
function generateHTML(results) {
    container.classList.remove('initial')
    let generatedHTML = ''; // Initialize as an empty string

    results.map(result=> {
        // Use template literals and return a string for each result
        generatedHTML +=
         `
        <div class="item">
            <img src=${result.recipe.image} alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a href=${result.recipe.url} target="_blank" class="view-button">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length>0?result.recipe.dietLabels:"No Data Found"}</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>`;
    });

    searchResultDiv.innerHTML = generatedHTML;
}
