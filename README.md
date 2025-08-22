# FlowerShop - Full Stack E-commerce Application

A modern, responsive flower shop e-commerce application built with Next.js 15 and Express.js, featuring product browsing, user authentication, and product management capabilities.

## Project Description

FlowerShop is a full-stack web application that provides a complete e-commerce experience for a flower shop business. Users can browse beautiful flower arrangements publicly, view detailed product information, and after authentication, access a personalized dashboard to manage products. The application features a clean, modern design with smooth animations, responsive layout, and intuitive user experience.

## Features

- 🌸 **Beautiful Landing Page** - Hero slider with stunning flower imagery and smooth transitions
- 🔐 **Firebase Authentication** - Secure user authentication with Google OAuth integration
- 📦 **Product Catalog** - Browse flower arrangements with detailed information and high-quality images
- 🔍 **Product Details** - Individual product pages with comprehensive details, pricing, and stock status
- 📊 **User Dashboard** - Protected dashboard with analytics, product management, and user profile
- ➕ **Product Management** - Add new products with image upload and detailed information
- 📱 **Responsive Design** - Mobile-first design that works perfectly on all devices
- 🎨 **Modern UI/UX** - Clean interface with Tailwind CSS and custom animations
- 🚀 **Performance Optimized** - Built with Next.js 15 for optimal performance and SEO

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/React
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **Authentication**: Firebase Auth
- **Image Optimization**: Next.js Image component
- **Animations**: CSS transitions and Swiper.js for sliders

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Admin SDK
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express Validator

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway/Heroku compatible
- **Database**: MongoDB Atlas

## Setup & Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)
- Firebase account (for authentication)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/piyal007/flower_shop.git
   cd flower_shop
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flowershop
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flowershop
   
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env.local` file in the client directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Google provider
   - Add your domain to authorized domains
   - Copy configuration values to your `.env.local`

5. **Database Setup**
   ```bash
   # In the server directory
   npm run seed  # Populate database with sample products
   ```

6. **Start the servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev  # Starts on http://localhost:5000
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev  # Starts on http://localhost:3000
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Route Summary

### Frontend Routes (Next.js)

#### Public Routes (No Authentication Required)

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Landing Page | Hero slider, featured products, responsive navbar, footer |
| `/products` | Product Catalog | Browse all products, responsive grid layout, product cards |
| `/products/[id]` | Product Details | Individual product page with images, pricing, stock status, features |
| `/login` | Authentication | Firebase Google OAuth login, redirect after authentication |
| `/not-found` | 404 Page | Custom 404 page with navigation back to home |

#### Protected Routes (Authentication Required)

| Route | Description | Features |
|-------|-------------|----------|
| `/dashboard` | Dashboard Home | Analytics overview, product statistics, recent activity, quick actions |
| `/dashboard/add-product` | Add Product | Product creation form with image upload, validation, success feedback |
| `/dashboard/products` | Manage Products | View and manage user-added products, delete functionality |

### Backend API Routes (Express.js)

#### Product Management

| Route | Method | Description | Authentication |
|-------|--------|-------------|---------------|
| `/api/products` | GET | Fetch all products with pagination | Public |
| `/api/products` | POST | Create new product | Required |
| `/api/products/:id` | GET | Fetch single product by ID | Public |
| `/api/products/:id` | PUT | Update product by ID | Required |
| `/api/products/:id` | DELETE | Delete product by ID | Required |

#### Frontend API Routes (Next.js API)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/products` | GET | Fetch products from mock data |
| `/api/products/[id]` | GET | Fetch individual product details |

## Project Structure

```
flower_shop/
├── client/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── api/               # Frontend API routes
│   │   │   │   └── products/      # Product API endpoints
│   │   │   ├── dashboard/         # Protected dashboard pages
│   │   │   │   ├── add-product/   # Add product page
│   │   │   │   └── products/      # Manage products page
│   │   │   ├── login/            # Authentication page
│   │   │   ├── products/         # Product catalog pages
│   │   │   │   └── [id]/         # Dynamic product detail pages
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── layout.js         # Root layout
│   │   │   ├── not-found.js      # 404 page
│   │   │   └── page.js           # Home page
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/              # Base UI components (Button, etc.)
│   │   │   ├── navbar.js        # Navigation component
│   │   │   ├── hero.js          # Hero slider component
│   │   │   ├── footer.js        # Footer component
│   │   │   ├── featured-section.js # Featured products section
│   │   │   └── ProtectedRoute.js # Route protection wrapper
│   │   ├── contexts/            # React contexts
│   │   │   └── AuthContext.js   # Firebase authentication context
│   │   ├── firebase/            # Firebase configuration
│   │   │   └── firebase.config.js
│   │   └── lib/                 # Utility functions
│   │       └── utils.js         # Helper utilities
│   ├── public/                  # Static assets (images, icons)
│   ├── .env.local              # Environment variables
│   └── package.json            # Frontend dependencies
│
├── server/                          # Backend (Express.js)
│   ├── middleware/             # Express middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API route handlers
│   │   └── products.js        # Product routes
│   ├── .env                   # Server environment variables
│   ├── server.js              # Express server setup
│   ├── seed-data.js           # Database seeding script
│   └── package.json           # Backend dependencies
│
└── assignments_requirements.md     # Project requirements
```

## Development

### Available Scripts

#### Frontend (client/)
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Backend (server/)
```bash
npm run dev          # Start development server with nodemon (http://localhost:5000)
npm start            # Start production server
npm run seed         # Populate database with sample data
```

### Adding New Products

1. **Via Dashboard (Recommended)**:
   - Navigate to `/login` and authenticate with Google
   - Go to `/dashboard/add-product`
   - Fill out the product form with details and image URL
   - Submit to add the product (stored locally in browser)

2. **Via API**:
   - Send POST request to `/api/products` with product data
   - Requires authentication headers

### Key Features Implementation

- **Authentication**: Firebase Auth with Google OAuth
- **Product Storage**: Hybrid approach - API products + localStorage for user additions
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Image Optimization**: Next.js Image component with proper sizing
- **Route Protection**: Custom ProtectedRoute component
- **State Management**: React Context for authentication
- **Form Validation**: Client-side validation with user feedback

### Customization

- **Styling**: Modify Tailwind classes in components or update `globals.css`
- **Products**: Update mock data in `src/app/api/products/data.js`
- **Authentication**: Configure Firebase in `src/firebase/firebase.config.js`
- **Database**: Modify MongoDB models in `server/models/`
- **API**: Add new routes in `server/routes/`

## Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Prepare for deployment**:
   ```bash
   cd client
   npm run build  # Test production build locally
   ```

2. **Deploy to Vercel**:
   - Push your code to GitHub
   - Connect repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - Deploy automatically on push

### Backend Deployment Options

1. **Railway**:
   - Connect GitHub repository
   - Add environment variables
   - Deploy automatically

2. **Heroku**:
   ```bash
   cd server
   heroku create your-app-name
   heroku config:set MONGODB_URI=your-mongodb-uri
   git push heroku main
   ```

3. **DigitalOcean App Platform**:
   - Connect repository
   - Configure build and run commands
   - Add environment variables

### Database Deployment

- **MongoDB Atlas** (Recommended for production)
- **Railway MongoDB** (Simple setup)
- **DigitalOcean Managed MongoDB**

### Environment Variables for Production

Update your production environment variables:
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure CORS for your frontend domain
- Set up proper Firebase security rules

## Live Demo

- **Frontend**: [https://flower-shop-client.vercel.app](https://flower-shop-client.vercel.app)
- **API**: [https://flower-shop-api.railway.app](https://flower-shop-api.railway.app)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email@example.com] or create an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, Express.js, and MongoDB**