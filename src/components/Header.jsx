import bg_image from "../assets/background_image.jpg"
const Header = () => {
    return (
        <>

            <section className="relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bg_image})` }}
            >
                <div className="container mx-auto px-4 py-24 md:py-32 w-full">
                    <div className="max-w-lg">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Summer Collection 2025
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Discover our latest arrivals designed for comfort and style. Premium
                            quality that lasts.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#"
                                className="py-3 px-6 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
                            >
                                Shop Now
                            </a>
                            <a
                                href="#"
                                className="py-3 px-6 bg-white text-gray-800 font-medium rounded-button border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
                            >
                                Explore Collection
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>


    )
}

export default Header