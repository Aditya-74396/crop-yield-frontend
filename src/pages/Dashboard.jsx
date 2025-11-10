import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    area: '',
    cropType: '',
    season: '',
    rainfall: '',
    temperature: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  })
  const [predictedYield, setPredictedYield] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Sample historical data for visualization
  const historicalData = [
    { year: '2019', yield: 45.2 },
    { year: '2020', yield: 48.5 },
    { year: '2021', yield: 52.3 },
    { year: '2022', yield: 49.8 },
    { year: '2023', yield: 55.1 },
    { year: '2024', yield: 53.7 }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);
  setPredictedYield(null);

  console.log("Submitting form:", formData);

  try {
    const response = await fetch("https://crop-yield-backend-1-epnh.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        average_rainfall: parseFloat(formData.rainfall),
        pesticides_tonnes: parseFloat(formData.nitrogen),
        avg_temp: parseFloat(formData.temperature),
        area: parseFloat(formData.area),
        crop: formData.cropType, // ✅ FIXED
        season: formData.season,
        state: formData.state,
        district: formData.district,
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
      }),
    });

    if (!response.ok) throw new Error("Backend error");
    const data = await response.json();

    if (data.predicted_yield > 500)
      setPredictedYield("Unrealistic result — check input values or model.");
    else
      setPredictedYield(Number(data.predicted_yield).toFixed(2));
    
  } catch (err) {
    console.error("Prediction error:", err);
    setError("Failed to get prediction. Check backend connection or input values.");
  } finally {
    setIsLoading(false);
  }
};



  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    navigate('/signin')
  }

  const states = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'Karnataka', 'Tamil Nadu']
  const crops = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Sugarcane', 'Potato', 'Tomato']
  const seasons = ['Kharif', 'Rabi', 'Zaid', 'Whole Year']

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-logo">Yield<span className="logo-red">Vision</span></h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Data Input Section */}
          <section className="input-section">
            <h2 className="section-title">Crop Yield Prediction</h2>
            <p className="section-subtitle">Enter the details below to predict crop yield</p>
            
            <form onSubmit={handleSubmit} className="prediction-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="district">District</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    placeholder="Enter district name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="area">Area (Hectares)</label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    placeholder="Enter area in hectares"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cropType">Crop Type</label>
                  <select
                    id="cropType"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Crop</option>
                    {crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="season">Season</label>
                  <select
                    id="season"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Season</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rainfall">Rainfall (mm)</label>
                  <input
                    type="number"
                    id="rainfall"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                    placeholder="Enter rainfall in mm"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="temperature">Temperature (°C)</label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                    placeholder="Enter temperature"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nitrogen">Nitrogen (N) - kg/hectare</label>
                  <input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    required
                    placeholder="Enter N level"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phosphorus">Phosphorus (P) - kg/hectare</label>
                  <input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    required
                    placeholder="Enter P level"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="potassium">Potassium (K) - kg/hectare</label>
                  <input
                    type="number"
                    id="potassium"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    required
                    placeholder="Enter K level"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
                {/* your input fields */}
                <button type="submit" className="predict-button" disabled={isLoading}>
                  {isLoading ? 'Predicting...' : 'Predict Yield'}
                </button>
                  
              </form>  
          </section>

          {/* Prediction Result Section */}
          {predictedYield && (
            <section className="prediction-section">
              <h2 className="section-title">Predicted Yield</h2>
              <div className="prediction-card">
                <div className="yield-value">{predictedYield}</div>
                <div className="yield-unit">Quintals/Hectare</div>
                <div className="prediction-details">
                  <p><strong>Crop:</strong> {formData.cropType}</p>
                  <p><strong>Location:</strong> {formData.district}, {formData.state}</p>
                  <p><strong>Season:</strong> {formData.season}</p>
                </div>
              </div>
            </section>
          )}

          {/* Historical Data Section */}
          <section className="historical-section">
            <h2 className="section-title">Historical Yield Data</h2>
            <p className="section-subtitle">Yield trends over the years</p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Yield (Quintals/Hectare)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#11998e" 
                    strokeWidth={3}
                    name="Yield (Q/Ha)"
                    dot={{ fill: '#38ef7d', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>

      {/* Contact Us Section */}
      <footer className="contact-footer">
        <div className="footer-content">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-info">
            <p><strong>Name:</strong> Alpha</p>
            <p><strong>Email:</strong> <a href="mailto:alphanit4@gmail.com">alphanit4@gmail.com</a></p>
          </div>
          <p className="footer-copyright">© 2024 YieldVision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard

