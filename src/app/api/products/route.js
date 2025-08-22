import { NextResponse } from 'next/server';
import { getAllProducts, addProduct } from './data.js';

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product
export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.description || !body.price) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }

    const newProduct = addProduct({
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      image: body.image || '/flowers-product-1.jpg',
      category: body.category || 'General',
      features: body.features || []
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}