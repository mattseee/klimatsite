// app/lib/products.ts

export async function getProductsByCategoryCode(categoryCode: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const response = await fetch(
      `${baseUrl}/api/products/by-slug/${categoryCode}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Products response not ok:', response.status);
      return [];
    }

    const data = await response.json();
    console.log('API by-slug products:', categoryCode, data.products?.length || 0);

    return data.products || [];
  } catch (error) {
    console.error('Error fetching products (front):', error);
    return [];
  }
}