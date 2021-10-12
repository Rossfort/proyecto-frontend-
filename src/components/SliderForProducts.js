import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

const SliderForProducts = ({images}) => {
  let renderImages = '';

  console.log(images);
  if (images) {
    renderImages = images.map((image) =>
      <img key={image}src={image} alt="productImage" />,
    );
  }
  return (
    <Carousel thumbWidth={50}>
      {renderImages}
    </Carousel>
  );
};

export default SliderForProducts;
