import React, { useState } from "react";
import { ApiProduct } from "../../interfaces/products";

interface FeaturedProps {
  product: ApiProduct;
}
function Featured({ product }: FeaturedProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between h-full">
      <div className="flex gap-3 flex-col md:w-2/4 h-full justify-center items-center">
        <div className="flex grow overflow-hidden">
          <img
            src={product.images[currentPhotoIndex]}
            alt=""
            className="flex h-full object-cover"
          />
        </div>
        <div className="flex gap-5 shrink">
          {product.images.map((img, idx) => {
            return (
              <button key={idx} onClick={() => setCurrentPhotoIndex(idx)}>
                <img
                  className={`w-11 p-1 rounded-sm ${
                    idx === currentPhotoIndex
                      ? "outline outline-black"
                      : "outline-none"
                  } aspect-square object-cover cursor-pointer`}
                  src={img}
                  alt=""
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-3/4 pl-10 flex flex-col">
        <div className="flex flex-col grow">
          <h3 className="font-semibold text-2xl mb-7">{product.title}</h3>
          <p>{product.description}</p>
        </div>
        <div className="flex shrink pb-8">
          <button className="px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-md text-white">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
