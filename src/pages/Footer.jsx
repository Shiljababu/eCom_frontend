import React from 'react'
import logoIcon from "../assets/logo.png"
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <img src= {logoIcon} alt="logo" />
                        <p className="text-gray-600 mb-6 max-w-md">
                            We offer premium quality clothing and accessories for men and
                            women. Our mission is to provide sustainable fashion that lasts.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"> <i className="ri-facebook-fill"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"> <i className="ri-instagram-line"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"> <i className="ri-twitter-x-line"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"> <i className="ri-pinterest-line"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Women</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Men</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Accessories</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Footwear</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >New Arrivals</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Sale</a >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Help</h3>
                        <ul className="space-y-3">
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Customer Service</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >My Account</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Find a Store</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Shipping & Returns</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >FAQs</a >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">About</h3>
                        <ul className="space-y-3">
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >About Us</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Sustainability</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Careers</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Press</a >
                            </li>
                            <li> <a href="#" className="text-gray-600 hover:text-primary transition-colors"   >Contact Us</a >
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            &copy; 2025 ShopEase. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="text-gray-500 text-sm hover:text-gray-700" >Privacy Policy</a>
                            <a href="#" className="text-gray-500 text-sm hover:text-gray-700" >Terms of Service</a>
                            <a href="#" className="text-gray-500 text-sm hover:text-gray-700" >Cookies Settings</a>
                        </div>
                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                            <i className="ri-visa-fill text-2xl text-gray-600"></i>
                            <i className="ri-mastercard-fill text-2xl text-gray-600"></i>
                            <i className="ri-paypal-fill text-2xl text-gray-600"></i>
                            <i className="ri-apple-fill text-2xl text-gray-600"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    //         <section className="py-16 bg-gray-50">
    //   <div className="container mx-auto px-4">
    //     <h2 className="text-3xl font-bold text-center mb-12">
    //       What Our Customers Say
    //     </h2>

    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //       <div className="bg-white p-6 rounded-lg shadow-sm">
    //         <div className="flex text-amber-400 mb-4">
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //         </div>
    //         <p className="text-gray-700 mb-6">
    //           "The quality of the clothes is exceptional. I've ordered multiple
    //           times and have never been disappointed. The customer service is
    //           also top-notch!"
    //         </p>
    //         <div className="flex items-center">
    //           <div
    //             className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
    //           >
    //             <i className="ri-user-3-line text-xl"></i>
    //           </div>
    //           <div>
    //             <h4 className="font-medium text-gray-900">Emily Richardson</h4>
    //             <p className="text-sm text-gray-500">Loyal Customer</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white p-6 rounded-lg shadow-sm">
    //         <div className="flex text-amber-400 mb-4">
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-half-fill"></i>
    //         </div>
    //         <p className="text-gray-700 mb-6">
    //           "Fast shipping and the products look exactly like the pictures.
    //           The sizing guide was very helpful. Will definitely shop here
    //           again!"
    //         </p>
    //         <div className="flex items-center">
    //           <div
    //             className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
    //           >
    //             <i className="ri-user-3-line text-xl"></i>
    //           </div>
    //           <div>
    //             <h4 className="font-medium text-gray-900">Michael Thompson</h4>
    //             <p className="text-sm text-gray-500">Verified Buyer</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white p-6 rounded-lg shadow-sm">
    //         <div className="flex text-amber-400 mb-4">
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //           <i className="ri-star-fill"></i>
    //         </div>
    //         <p className="text-gray-700 mb-6">
    //           "I love the sustainable approach this brand takes. The packaging
    //           is eco-friendly and the clothes are made from high-quality,
    //           sustainable materials."
    //         </p>
    //         <div className="flex items-center">
    //           <div
    //             className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
    //           >
    //             <i className="ri-user-3-line text-xl"></i>
    //           </div>
    //           <div>
    //             <h4 className="font-medium text-gray-900">Sophia Martinez</h4>
    //             <p className="text-sm text-gray-500">Repeat Customer</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    )
}

export default Footer