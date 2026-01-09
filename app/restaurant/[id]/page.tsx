import RestaurantPageClient from './RestaurantPageClient';

// For static export, we return empty array and use dynamicParams for client-side routing
export async function generateStaticParams() {
  // Restaurant IDs are dynamic from database, so return empty and use client-side routing
  return [];
}

export const dynamicParams = true;

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return <RestaurantPageClient restaurantId={params.id} />;
}
