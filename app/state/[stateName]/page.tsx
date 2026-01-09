import { notFound } from 'next/navigation';
import StatePageClient from './StatePageClient';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'Washington D.C.', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export async function generateStaticParams() {
  return US_STATES.map((state) => ({
    stateName: state,
  }));
}

export const dynamicParams = true;

export default function StatePage({ params }: { params: { stateName: string } }) {
  const stateName = decodeURIComponent(params.stateName);
  
  // Validate state exists (optional, for better UX)
  if (!US_STATES.includes(stateName)) {
    notFound();
  }
  
  return <StatePageClient stateName={stateName} />;
}
