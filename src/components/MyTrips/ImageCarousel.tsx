import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Интервал времени в миллисекундах, по умолчанию 10 секунд
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании
  }, [images, interval]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "250px",
    overflow: "hidden",
  };

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1s ease", // Плавная смена прозрачности
    opacity: 0, // По умолчанию изображение скрыто
  };

  const activeImageStyle: React.CSSProperties = {
    ...imageStyle,
    opacity: 1, // Активное изображение видно
  };

  return (
    <div style={containerStyle}>
      {images.map((image, index) => (
        <Card.Img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          style={index === currentImageIndex ? activeImageStyle : imageStyle}
        />
      ))}
    </div>
  );
};
