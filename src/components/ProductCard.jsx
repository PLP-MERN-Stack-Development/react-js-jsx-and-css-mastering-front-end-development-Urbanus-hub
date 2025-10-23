import React, { useState } from "react";
import { ShoppingCart, Heart, Star, Package } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    alert(`Added "${product.title}" to cart!`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
     
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full backdrop-blur-sm">
          <Package className="w-3 h-3 text-sky-600 dark:text-sky-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {product.category.name}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
            ${product.price}
          </span>
          <div className="flex items-center gap-1">
            {/* Static rating for demonstration */}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(4.0)</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;