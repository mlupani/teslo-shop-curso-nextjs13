'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({images, title, className}: Props) => {

  return (
    <div className={className}>
        <Swiper
        pagination={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
        style={{
          width: '100vw',
          height: '500px'
        }}
      >
          {
            images.map((image, index) => (
                <SwiperSlide key={image}>
                    <Image
                        key={index}
                        alt={title}
                        src={`/products/${image}`}
                        width={800}
                        height={600}
                    />
                </SwiperSlide>
            ))
          }
      </Swiper>
    </div>
  );
};
