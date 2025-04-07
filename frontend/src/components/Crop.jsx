import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Crop = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorous: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    PH: "",
    Rainfall: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Check immediately on mount
    checkAuthStatus();

    // Listen for storage changes (like when token is removed during logout)
    window.addEventListener("storage", checkAuthStatus);

    // Also set up interval to check periodically (in case storage event doesn't fire)
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please enter a value for ${key}`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to get crop recommendation"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      Nitrogen: "",
      Phosphorous: "",
      Potassium: "",
      Temperature: "",
      Humidity: "",
      PH: "",
      Rainfall: "",
    });
    setResult(null);
    setError(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Crop Recommendation System
          </h1>
          <div className="py-12">
            <div className="text-6xl mb-6">🔒</div>
            <p className="text-xl text-gray-700 mb-6">
              Please log in to access the crop recommendation system.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Crop Recommendation System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700 border-b pb-2">
                Soil Nutrients (mg/kg)
              </h2>

              <div>
                <label className="block text-gray-700 mb-1">Nitrogen (N)</label>
                <input
                  type="number"
                  name="Nitrogen"
                  value={formData.Nitrogen}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 90"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Phosphorous (P)
                </label>
                <input
                  type="number"
                  name="Phosphorous"
                  value={formData.Phosphorous}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 42"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Potassium (K)
                </label>
                <input
                  type="number"
                  name="Potassium"
                  value={formData.Potassium}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 43"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Soil pH</label>
                <input
                  type="number"
                  name="PH"
                  value={formData.PH}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="14"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 6.5"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700 border-b pb-2">
                Climate Factors
              </h2>

              <div>
                <label className="block text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="Temperature"
                  value={formData.Temperature}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 25.5"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Humidity (%)</label>
                <input
                  type="number"
                  name="Humidity"
                  value={formData.Humidity}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 80"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="Rainfall"
                  value={formData.Rainfall}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block mr-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Processing...
                </>
              ) : (
                "Get Recommendation"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
              Recommended Crop
            </h2>
            <div className="text-center mb-6">
              <div className="inline-block bg-white p-6 rounded-full shadow-md">
                <span className="text-5xl">🌾</span>
              </div>
              <h3 className="text-3xl font-bold text-green-700 mt-4">
                {result.cropName}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crop;
