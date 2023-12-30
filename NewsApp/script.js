var API_KEY = "51697d1141ce4a619bff51824c44f9c7";
var url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", function () {
  fetchNews("India");
});

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
  console.log(data);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  var newsImg = cardClone.querySelector("#news-image");
  var newsTitle = cardClone.querySelector("#news-title");
  var newsSource = cardClone.querySelector("#news-source");
  var newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  if (newsTitle) {
    newsTitle.innerHTML = article.title || "";
  }

  if (newsDesc) {
    newsDesc.innerHTML = article.description || "";
  }

  if (newsSource) {
    var date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML =
      article.source && article.source.name
        ? article.source.name + " · " + date
        : date;
  }

  if (cardClone.firstElementChild) {
    cardClone.firstElementChild.addEventListener("click", function () {
      window.open(article.url, "_blank");
    });
  }
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", function () {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
