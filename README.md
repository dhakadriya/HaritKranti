# 🌾 HaritKranti - Smart Agriculture & Farmer Marketplace

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A comprehensive platform connecting farmers directly with customers, eliminating intermediaries and ensuring fair prices for both parties.

## 🌟 Features

### For Farmers
- 📦 **Product Management** - Add, edit, and manage products with categories
- 🖼️ **Image Upload** - Upload up to 5 images per product
- 📊 **Dashboard** - Track orders, sales, and inventory
- 🏷️ **Category System** - Organize products (Fruits, Vegetables, Grains, Pulses, Spices, Oilseeds)
- 💰 **Direct Sales** - Sell directly to customers without intermediaries
- 📱 **Order Management** - Track and manage customer orders

### For Customers
- 🛒 **Shopping Cart** - Add products and checkout seamlessly
- 🔍 **Search & Filter** - Find products by name, category, or farmer
- 📍 **Location-based** - Find nearby farmers and products
- 💳 **Order Tracking** - Track order status and history
- ⭐ **Product Reviews** - Rate and review products
- 🌐 **Multi-language** - Support for multiple languages

### For Admin
- 👥 **User Management** - Manage farmers, customers, and admins
- 📦 **Product Approval** - Review and approve farmer products
- 📊 **Analytics** - View sales, orders, and platform statistics
- 🏷️ **Category Management** - Add and manage product categories
- 💼 **Inventory Control** - Manage marketplace inventory
- 📈 **Reports** - Generate sales and performance reports

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload
- **Cloudinary** - Image storage (optional)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/haritkranti.git
cd haritkranti
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/haritkranti

# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Expiration
JWT_EXPIRE=7d
```

### 4. Database Setup

#### Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

#### Seed Categories
```bash
cd backend
node scripts/seedCategories.js
```

This will create 7 default categories:
- 🌾 Grains
- 🥬 Vegetables
- 🍎 Fruits
- 🫘 Pulses
- 🌶️ Spices
- 🌻 Oilseeds
- 📦 Other

### 5. Start the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎯 Usage

### Creating an Admin Account
```bash
cd backend
node scripts/createAdmin.js
```

### Adding Test Products
```bash
cd backend
node scripts/addTestProducts.js
```

### Listing All Products in Marketplace
```bash
cd backend
node scripts/listAllProducts.js
```

## 🗂️ Project Structure

```
haritkranti/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   ├── scripts/            # Database scripts
│   └── package.json
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── redux/             # Redux store & slices
│   ├── utils/             # Utility functions
│   └── context/           # React context
├── public/                # Static assets
└── package.json
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Farmer, Customer, Admin)
- Input validation and sanitization
- Secure HTTP headers
- Environment variable protection

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Farmer)
- `PUT /api/products/:id` - Update product (Farmer/Admin)
- `DELETE /api/products/:id` - Delete product (Farmer/Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

For complete API documentation, see `backend/API_ENDPOINTS.md`

## 🔍 Checking Your Database

### Using MongoDB Compass (Recommended)
1. Download from: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse the `haritkranti` database visually

### Using MongoDB Shell
```bash
# Navigate to MongoDB bin directory
cd "C:\Program Files\MongoDB\Server\8.3\bin"

# Start MongoDB shell
mongosh

# List databases
show dbs

# Use your database
use haritkranti

# List collections
show collections

# View categories
db.categories.find()

# View products
db.products.find()

# Exit
exit
```

### Using Browser (Quick Check)
Visit these URLs while the backend is running:
- Categories: http://localhost:5000/api/categories
- Products: http://localhost:5000/api/products

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables if needed

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new web service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `CLOUDINARY_*` (if using)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Riyad Dhakad** - [GitHub](https://github.com/dhakadriya)

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React for the frontend library
- Tailwind CSS for styling
- All contributors and supporters

## 📧 Contact

For questions or support, please contact:
- Email: riyadhakad613@gmail.com
- GitHub: [@dhakadriya](https://github.com/dhakadriya)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running: `Get-Service -Name MongoDB`
- Check connection string in `.env` file
- Verify MongoDB is listening on port 27017

### Frontend Not Loading
- Clear browser cache
- Check if backend is running on port 5000
- Verify proxy settings in `vite.config.js`

### Products Not Showing
- Run: `node backend/scripts/listAllProducts.js`
- Check if categories are seeded: `node backend/scripts/seedCategories.js`
- Verify products are marked as `isListed: true`

### Order Details Page Blank
- Check browser console for errors
- Verify order exists in database
- Ensure user has permission to view the order

---

**Made with ❤️ for farmers and customers**
