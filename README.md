# YieldVision - Crop Yield Prediction System

A modern, professional web application for predicting crop yields using machine learning. Built with React and featuring a beautiful green gradient theme with red branding.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Crop Yield Prediction**: Input-based prediction system with:
  - State/District/Area selection
  - Crop type selection
  - Season selection
  - Environmental factors (Rainfall, Temperature)
  - Soil nutrients (Nitrogen, Phosphorus, Potassium)
- **Historical Data Visualization**: Interactive charts showing yield trends over years
- **Professional UI**: Modern, user-friendly interface with green gradient theme
- **Contact Information**: Easy access to support contact details

## Tech Stack

- **React 18**: Modern React with hooks
- **React Router DOM 6**: Client-side routing
- **Recharts**: Data visualization library
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with gradients and animations

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
YieldVision/
├── src/
│   ├── pages/
│   │   ├── SignUp.jsx          # User registration page
│   │   ├── SignIn.jsx           # User login page
│   │   ├── Dashboard.jsx        # Main dashboard with prediction form
│   │   ├── Auth.css             # Authentication page styles
│   │   └── Dashboard.css        # Dashboard page styles
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # App-level styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Sign In**: Login with your credentials
3. **Predict Yield**: Fill in the form with:
   - Location details (State, District, Area)
   - Crop information (Type, Season)
   - Environmental data (Rainfall, Temperature)
   - Soil nutrients (N, P, K levels)
4. **View Results**: See the predicted yield in quintals/hectare
5. **Historical Data**: Check the historical yield trends chart

## Contact

- **Name**: Alpha
- **Email**: alphanit4@gmail.com

## License

© 2024 YieldVision. All rights reserved.

