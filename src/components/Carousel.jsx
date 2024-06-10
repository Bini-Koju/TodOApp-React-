import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
 
} from 'reactstrap';

const items = [
  {
    src: ' https://cdn-klbfn.nitrocdn.com/hxUHRtZqyBIPBoCsJuqPruVoZiyLyaHV/assets/images/optimized/rev-5e89cd7/contenthacker.com/wp-content/uploads/2019/03/quote38-1024x1024.jpg',
    key: 1,
  },
  {
    src: 'https://img.freepik.com/premium-vector/keep-going-keep-growing-positive-inspirational-quote-about-learning-progress-self-support_511660-434.jpg',
    key: 2,
  },
  {
    src: 'https://img.freepik.com/free-vector/inspirational-quote-watercolour-background_1048-18831.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user',
    key: 3,
  },
];

function ImgCarousel(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const cycleCarousel = setInterval(() => {
      next();
    }, 3000); 

    return () => clearInterval(cycleCarousel); 
  }, [activeIndex]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.key}
      >
        <img src={item.src} alt={item.altText} style={{ width: '100%', objectFit: 'cover' }} />
        
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default ImgCarousel;
