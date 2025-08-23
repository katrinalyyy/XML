export class Carousel {
  constructor() {
    this.carouselHTML = `
      <div id="main-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#main-carousel" data-bs-slide-to="3"></button>
        </div>
        
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://pcdn.goldapple.ru/p/ci/680a6ddd5d73fe3c777907f8/default/6369633638306136646464356437336665336337373739303766398dd835155b2b7f9fullhd.webp" class="d-block w-100" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="https://pcdn.goldapple.ru/p/ci/67cdd57a9731f7539427862c/default/6369633637656366633137363133383865616566323462393964628dd71c4781f27c2fullhd.webp" class="d-block w-100" alt="Slide 2">
          </div>
          <div class="carousel-item">
            <img src="https://pcdn.goldapple.ru/p/ci/67fe33d45d73fe3c7778f254/default/6369633638306238663436356437336665336337373739306132658dd83fdd5b2192ffullhd.webp" class="d-block w-100" alt="Slide 3">
          </div>
          <div class="carousel-item">
            <img src="https://pcdn.goldapple.ru/p/msc/363861373463303265303663646561353464666364616164/web/5f6d756c7469536f75726365436f6d6d6f6e8dde0d1745dc8cafullhd.webp" class="d-block w-100" alt="Slide 3">
          </div>
        </div>
        
        <button class="carousel-control-prev" type="button" data-bs-target="#main-carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#main-carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }

  getHTML() {
    return this.carouselHTML;
  }
}