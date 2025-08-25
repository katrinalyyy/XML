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
            <img src="https://pcdn.goldapple.ru/p/ci/6825f595920563a0516b6a50/default/6369633638323566353935393230353633613035313662366135318dd93ba19c39e71fullhd.webp" class="d-block w-100" alt="Slide 3">
          </div>
          <div class="carousel-item">
            <img src="https://pcdn.goldapple.ru/p/ci/67b6fb03a559c8ff1496f618/default/6369633637623666623033613535396338666631343936663631398dd5194147d1044fullhd.webp" class="d-block w-100" alt="Slide 4">
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