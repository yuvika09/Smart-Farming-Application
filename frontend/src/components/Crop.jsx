import { useState } from "react";
import axios from "axios";

const Crop = () => {
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

    // Check for missing values
    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please enter a value for ${key}`);
        setLoading(false);
        return;
      }
    }

    try {
      console.log("FormData before sending:", formData);
      const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Server Response:", response.data);

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to get crop recommendation");
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

  // Helper functions to match your backend classification
  const getLevel = (value, type) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    switch (type) {
      case "N":
        if (num <= 50) return "Less";
        if (num <= 100) return "Not too less and Not too High";
        return "High";
      case "P":
        if (num <= 50) return "Less";
        if (num <= 100) return "Not too less and Not too High";
        return "High";
      case "K":
        if (num <= 50) return "Less";
        if (num <= 100) return "Not too less and Not too High";
        return "High";
      case "humidity":
        if (num <= 33) return "Low Humid";
        if (num <= 66) return "Medium Humid";
        return "High Humid";
      case "temperature":
        if (num <= 6) return "Cool";
        if (num <= 25) return "Warm";
        return "Hot";
      case "rainfall":
        if (num <= 100) return "Less";
        if (num <= 200) return "Moderate";
        return "Heavy Rain";
      case "ph":
        if (num <= 5) return "Acidic";
        if (num <= 8) return "Neutral";
        return "Alkaline";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Crop Recommendation System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soil Nutrients Column */}
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
                {formData.Nitrogen && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Nitrogen, "N")}
                  </p>
                )}
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
                {formData.Phosphorous && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Phosphorous, "P")}
                  </p>
                )}
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
                {formData.Potassium && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Potassium, "K")}
                  </p>
                )}
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
                {formData.PH && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.PH, "ph")}
                  </p>
                )}
              </div>
            </div>

            {/* Climate Factors Column */}
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
                {formData.Temperature && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Temperature, "temperature")}
                  </p>
                )}
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
                {formData.Humidity && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Humidity, "humidity")}
                  </p>
                )}
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
                {formData.Rainfall && (
                  <p className="text-sm text-gray-500 mt-1">
                    Level: {getLevel(formData.Rainfall, "rainfall")}
                  </p>
                )}
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