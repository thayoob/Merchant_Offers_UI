# 🖥️ Merchant Offers Management System - UI

This is the **frontend application** for the **Merchant Offers Management System**, built using **React + Vite**. The system provides an intuitive and responsive dashboard to manage **merchants**, **offers**, and **voucher codes**, connecting to the Laravel backend API via **Axios**.

 Backend Repository: [Merchant Offers API (Laravel)](https://github.com/thayoob/merchant-offers-api)

---

##  Features

-  Built with **React + Vite** for lightning-fast performance
-  Fully **responsive design** — works seamlessly across all devices
-  **Secure authentication** with token-based login (Passport-compatible)
-  Integrated **Axios** for smooth API communication
-  Dashboard with dedicated modules to manage:
  - Merchants  
  - Offers  
  - Voucher Codes  
-  Clean, modern, and user-friendly UI

---

##  Project Structure

```
Merchant_Offers_UI/
├── public/
├── src/
│   ├── api/
│   ├── services/
│   ├── assets/
│   │   └── style/
│   ├── components/
│   │   ├── layout/
│   │   ├── merchants/
│   │   ├── offers/
│   │   ├── ui/
│   │   └── voucher-code/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

##  Requirements

Ensure you have the following installed:

- Node.js >= 16.x  
- npm (or yarn)

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thayoob/Merchant_Offers_UI.git
cd Merchant_Offers_UI
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Replace `http://localhost:8000/api` with your actual backend API URL.

### 4. Run the Development Server

```bash
npm run dev
```

Your app will be running at:  
 `http://localhost:5173`

---

##  API Integration (Axios)

All API calls are managed using **Axios**, located in the `services/` folder. Ensure your Laravel API is running and has proper CORS configuration.

Authentication tokens are securely handled and passed via headers for protected routes using Axios interceptors.

---

##  Dashboard Functionality

###  Auth Module
- Login with backend credentials  
- Store and manage the auth token securely

###  Merchant Management
- List, add, edit, and delete merchant records

### Offer Management
- Create, update, and manage offers  
- Link offers to specific merchants

### Voucher Code Management
- Generate, validate, and manage voucher codes  
- Filter vouchers by offer or merchant

---

##  Thank You!
