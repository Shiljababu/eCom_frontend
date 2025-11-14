import React from 'react'

const Testimonial = () => {
  return (
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex text-amber-400 mb-4">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <p className="text-gray-700 mb-6">
              "The quality of the clothes is exceptional. I've ordered multiple
              times and have never been disappointed. The customer service is
              also top-notch!"
            </p>
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
              >
                <i className="ri-user-3-line text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Emily Richardson</h4>
                <p className="text-sm text-gray-500">Loyal Customer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex text-amber-400 mb-4">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
            <p className="text-gray-700 mb-6">
              "Fast shipping and the products look exactly like the pictures.
              The sizing guide was very helpful. Will definitely shop here
              again!"
            </p>
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
              >
                <i className="ri-user-3-line text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Michael Thompson</h4>
                <p className="text-sm text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex text-amber-400 mb-4">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <p className="text-gray-700 mb-6">
              "I love the sustainable approach this brand takes. The packaging
              is eco-friendly and the clothes are made from high-quality,
              sustainable materials."
            </p>
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4"
              >
                <i className="ri-user-3-line text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Sophia Martinez</h4>
                <p className="text-sm text-gray-500">Repeat Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Testimonial