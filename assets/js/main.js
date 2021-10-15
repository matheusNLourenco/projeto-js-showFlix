const API_KEY = 'api_key=6987783fa5aacef1ff3796474861f2c2';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL_TV = BASE_URL + '/discover/tv?sort_by=popularity.desc&'+API_KEY + '&language=pt-BR';
const API_URL_MOVIE = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY + '&language=pt-BR';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
const cinema = BASE_URL + '/discover/movie?primary_release_date.gte=2021-10-14&' + API_KEY + '&language=pt-BR';
const bestMovie = BASE_URL + '/trending/all/day?' + API_KEY+'&language=pt-BR&page=1';

const content = document.querySelector('.main .container .content');
const main = document.querySelector('.main');
const link = document.querySelectorAll('.nav__link');



link.forEach(link => link.addEventListener('click', ()=>{
  if(link.classList.contains('tv')){
    getMovie(API_URL_TV)
    main.style.display = 'block'
  }else if(link.classList.contains('movie')){
    main.style.display = 'block'
    getMovie(API_URL_MOVIE)
  }else if(link.classList.contains('cinema')){
    main.style.display = 'block'
    getMovie(cinema)
  }else{
    main.style.display = 'none'
  }
}))

getMovie(bestMovie)

function getMovie(url) {
   fetch(url).then(res => res.json()).then(data => {
    showMovie(data.results);
    showMovieSlide(data.results)
   })
}

// show movie
function showMovie(data){
  content.innerHTML = '';

  data.forEach(tv => {
    const {title, name, poster_path, vote_average} = tv
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${name}">
        <div class="movie__info">
          <h3>${name || title}</h3>
          <span class="${getColor(vote_average)}">
          <i class='bx bxs-star'></i>
          ${vote_average}</span>
        </div>
    `
    content.appendChild(movieEl)
  });
}

// show best movie swiper slide
function showMovieSlide(data){
  const swiperWrapper = document.querySelector('.swiper-wrapper')
  swiperWrapper.innerHTML = '';

  data.forEach(best => {
  
    const {original_title, name,  backdrop_path, overview} = best
    const movieEl = document.createElement('div')
    movieEl.classList.add('swiper-slide')
    movieEl.innerHTML = `
    <div style="background-image: url('${IMG_URL + backdrop_path}');" class="slide-1">
      
    </div>
    <div class="container">
      <div class="home__content">
        <div class="home__heading">
          <h1 class="home__filme__title">${original_title || name}</h1>
          <p class="home__filme__sinopse">${overview}</p>
        </div>
        <div class="home__btn">
          <button type="button" class="btn">
            <i class='bx bx-play'></i>
            Assistir Agora
          </button>
          <button type="button" class="btn btn--black">
            <i class='bx bx-plus'></i>
            Add a lista
          </button>
        </div>
      </div>
    </div>
    `
    swiperWrapper.appendChild(movieEl)
  });
}

function getColor(vote) {
  if(vote >= 8){
    return 'green'
  }else if (vote>=5){
    return 'orange'
  }else{
    return 'red'
  }
}



// active link
function activeLink(){
  link.forEach(link => link.classList.remove('active'))
  this.classList.add('active')
}
link.forEach(n => n.addEventListener('click', activeLink))


// scroll header
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  const header = document.querySelector('.header');

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    header.classList.add('scroll-header')
  } else {
    header.classList.remove('scroll-header');
  }
}


// slides swiper
const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
  },
});