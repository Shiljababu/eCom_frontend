import { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from "react-router-dom"
import { getAllCategoriesApi, getAllProductsUsersApi } from '../service/allAPI'

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts()
        getCategories();

    }, [])
    const getCategories = async () => {
        try {
            const res = await getAllCategoriesApi();
            if (res.status === 200) {
                setCategories(res.data.categories);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getProducts = async () => {
        try {
            const response = await getAllProductsUsersApi()
            if (response.status === 200) {
                setProducts(response.data.products)
                console.log(response.data.products);

            } else {
                console.log("Failed to fetch products");

            }
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <>
            <Header />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex gap-3 overflow-x-auto py-4">
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <Link
                                    key={cat._id}
                                    to={`/category/${cat._id}`}
                                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium hover:bg-primary hover:text-white transition"
                                >
                                    {cat.name}
                                </Link>
                            ))
                        ) : (
                            <p>No categories found</p>
                        )}
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (


                                <Link to={`/getproduct/${product._id}`}>
                                    <div className="group" key={product._id}>
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            {product.stock === 0 && (
                                                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                                    Out of Stock
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
                                                <button
                                                    disabled={product.stock === 0}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 transition
                                                        ${product.stock === 0
                                                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                                            : "bg-primary text-white hover:bg-primary/90"
                                                        }
  `}
                                                >
                                                    <i className="ri-shopping-bag-line"></i>
                                                </button>

                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1">
                                                {product.name}
                                            </h3>
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
                            )
                            )) : (
                            <p className="text-gray-600">No products available.</p>

                        )}
                    </div>
                    <div className="text-center mt-12">
                        <a
                            href="#"
                            className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                            View All Products
                        </a>
                    </div>

                </div>
            </section>
        </>

    )
}

export default Home