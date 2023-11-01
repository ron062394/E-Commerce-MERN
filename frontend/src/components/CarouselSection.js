import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MyCarousel() {
  return (
    <div className="carousel-container">
        <div className='section-title'>
        <span className='span-divider'></span>
          What's trending
        <span className='span-divider'></span>
      </div>
      <Carousel>
        <div>
          <img className='carousel-banner-image' src="https://floranext.com/wp-content/uploads/2016/12/ChristmasBanner.1.2016-3.jpg" alt="Image 1" />
        </div>
        <div>
        <img className='carousel-banner-image' src="https://kidsindia.in/wp-content/uploads/2021/02/final-banner-1.jpg" alt="Image 2" />
        </div>
        <div>
          <img className='carousel-banner-image' src="https://i.pinimg.com/originals/d7/3f/8c/d73f8c9c1073585858a0a4abb519d1b5.jpg" alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
}

export default MyCarousel;
