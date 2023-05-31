import "../../index.html";
import "../style/index.scss";

// npm import

// install Swiper
import Swiper, { Navigation, Pagination } from 'swiper'

const swiper = new Swiper('.main-slider', {
    modules: [Navigation, Pagination],
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.main-slider__pagination',
    },
  });