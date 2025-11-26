import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategoryApi } from "../service/allAPI";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      const res = await getProductsByCategoryApi(id);
      if (res.status === 200) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
  {products.map((product) => (
    <Link to={`/getproduct/${product._id}`} key={product._id}>
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          
          {product.tag && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
              {product.tag}
            </span>
          )}

          <img
            src={
              product.image?.[0]
                ? `${window.location.origin}${product.image[0]}`
                : "https://via.placeholder.com/300x300.png?text=No+Image"
            }
            alt={product.name}
            className="w-full h-80 object-cover object-top"
          />

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
              <i className="ri-eye-line"></i>
            </button>
            <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
              <i className="ri-heart-line"></i>
            </button>
            <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-primary/90 transition">
              <i className="ri-shopping-bag-line"></i>
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
            <span className="text-xs text-gray-500 ml-1">(42)</span>
          </div>
          <p className="text-gray-900 font-medium">${product.price}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

  );
};

export default CategoryPage;
