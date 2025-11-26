
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-300 flex items-center justify-center px-6">
      <div className="text-center max-w-lg bg-white p-10 rounded-2xl shadow-xl border border-gray-200 animate-fadeIn">
        
        <div className="mb-6">
          <i className="ri-emotion-sad-line text-7xl text-red-500 animate-bounce"></i>
        </div>

        <h1 className="text-8xl font-extrabold text-gray-900 tracking-wider drop-shadow-lg">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
