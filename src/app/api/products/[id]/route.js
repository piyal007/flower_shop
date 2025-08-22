import { NextResponse } from 'next/server';
import { getProductById } from '../data.js';

// GET /api/products/[id] - Get a single product by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}