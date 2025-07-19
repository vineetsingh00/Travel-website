import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImages";

const MasonaryImages = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }}>
      <Masonry gutter="16px">
        {galleryImages.map((item, index) => (
          <img
            className="masonry-img"
            src={item}
            key={index}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              display: "block",
              borderRadius: "10px",
            }}
            alt=""
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonaryImages;
