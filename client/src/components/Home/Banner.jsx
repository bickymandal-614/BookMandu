import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../../assets/image.png";
import banner3 from "../../assets/banner31.png";

const Banner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000} 
        transitionDuration={900}
        showDots={true}
        arrows={false}
      >
        <div><img src={banner1} alt="Banner 1" className="rounded-xl h-[200px] md:h-full"/></div>
        <div><img src={banner3} alt="Banner 3" className="rounded-xl h-[200px] md:h-full"/></div>
      </Carousel>
    </>
  );
};

export default Banner;
