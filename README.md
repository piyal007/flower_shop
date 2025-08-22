# Next.js Product Management App

A modern e-commerce application built with Next.js 15 featuring product browsing, authentication, and product management capabilities.

## Project Description

This is a full-stack web application that allows users to browse products publicly and manage products after authentication. The app features a clean, responsive design with both public and protected routes. Users can view product listings, detailed product pages, and after logging in, access a dashboard to add new products.

## Features

- 🏠 **Landing Page** - Hero section with product highlights
- 🔐 **Authentication** - Social login with NextAuth.js
- 📦 **Product Browsing** - Public product listing with search and filtering
- 🔍 **Product Details** - Detailed product pages with ratings and reviews
- ➕ **Product Management** - Protected dashboard for adding new products
- 📱 **Responsive Design** - Mobile-first responsive layout
- 🌙 **Theme Support** - Light/dark theme toggle (optional enhancement)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Authentication**: NextAuth.js
- **Backend**: Next.js API Routes
- **Database**: Firebase (for product storage)
- **Deployment**: Vercel-ready

## Setup & Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Firebase account (for authentication and database)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the client directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   
   # Google OAuth (if using Google login)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore Database
   - Add your domain to authorized domains
   - Copy configuration values to your `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Route Summary

### Public Routes (No Authentication Required)

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Landing Page | Hero section, navbar, product highlights, footer |
| `/products` | Product List | Browse all products, search, filter by category, pagination |
| `/products/[id]` | Product Details | Individual product page with full details, ratings, stock status |
| `/login` | Authentication | Social login with NextAuth.js, redirects to /products after login |

### Protected Routes (Authentication Required)

| Route | Description | Features |
|-------|-------------|----------|
| `/dashboard` | Dashboard Home | Protected dashboard landing page |
| `/dashboard/add-product` | Add Product | Form to create new products, stores in Firebase |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication endpoints |
| `/api/products` | GET/POST | Fetch products list / Create new product |
| `/api/products/[id]` | GET | Fetch individual product details |

## Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── login/            # Authentication page
│   │   ├── products/         # Product pages
│   │   └── layout.js         # Root layout
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── navbar.js        # Navigation component
│   │   ├── hero.js          # Hero section
│   │   └── footer.js        # Footer component
│   ├── contexts/            # React contexts
│   ├── firebase/            # Firebase configuration
│   └── lib/                 # Utility functions and mock data
├── public/                  # Static assets
└── package.json
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Products

1. Navigate to `/login` and authenticate
2. Go to `/dashboard/add-product`
3. Fill out the product form
4. Submit to add the product to Firebase

### Customization

- **Styling**: Modify Tailwind classes in components
- **Products**: Update mock data in `src/lib/mock-products.js`
- **Authentication**: Configure providers in `src/app/api/auth/[...nextauth]/route.js`
- **Database**: Modify Firebase collections in `src/firebase/firebase.config.js`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.