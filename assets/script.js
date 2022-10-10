const API_KEY = 'eea5c51e6fbd5bc75621bf0bdab74f09';
const dateOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

const req = new XMLHttpRequest();
req.addEventListener("load", function () {
  document.getElementById('content').innerHTML = ''
  const res = JSON.parse(req.responseText);
  let content = ''
 
  res.results.forEach(result => {
    const date = new Date(result.release_date)
    content += `<div class="col-sm-4 content-card">
    <div class="card" style="width: 350px;">
      <img class="card-img-top" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${result.poster_path}" alt="${result.original_title}">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between">
          <span>${result.original_title}</span>
          <span><b>${result.vote_average}</b></span>
        </h5>
        <p class="card-text">${date.toLocaleDateString('en-US', dateOptions)}</p>
      </div>
    </div>
  </div>`
  });
  document.getElementById('content').innerHTML = content
  console.log(res);
});
req.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+"&sort_by=popularity.desc&page=1");
req.send();


function searchMovie() {
  const search = document.getElementById('search').value
  if (search.length > 2) {
    req.addEventListener("load", function () {
      document.getElementById('content').innerHTML = ''
      const res = JSON.parse(req.responseText);
      let content = ''
      res.results.forEach(result => {
        const date = new Date(result.release_date)
        content += `<div class="col-sm content-card">
        <div class="card" style="width: 350px;">
          <img class="card-img-top" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${result.poster_path}" alt="${result.original_title}">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
              <span>${result.original_title}</span>
              <span><b>${result.vote_average}</b></span>
            </h5>
            <p class="card-text">${date.toLocaleDateString('en-US', dateOptions)}</p>
          </div>
        </div>
      </div>`
      });
      document.getElementById('content').innerHTML = content
      console.log(res);
    });
    req.open("GET", "https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&query="+search+"&page=1");
    req.send();
  }
 
}