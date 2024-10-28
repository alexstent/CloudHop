import { Destination } from '../types';

function generateDestinations(count: number): Destination[] {
  const cities = [
    { city: 'Paris', country: 'France', type: 'city', lat: 48.8566, lng: 2.3522 },
    { city: 'Zermatt', country: 'Switzerland', type: 'snow', lat: 46.0207, lng: 7.7491 },
    { city: 'Santorini', country: 'Greece', type: 'beach', lat: 36.3932, lng: 25.4615 },
    { city: 'Tokyo', country: 'Japan', type: 'city', lat: 35.6762, lng: 139.6503 },
    { city: 'Bali', country: 'Indonesia', type: 'beach', lat: -8.3405, lng: 115.0920 },
    { city: 'Aspen', country: 'USA', type: 'snow', lat: 39.1911, lng: -106.8175 },
    { city: 'Barcelona', country: 'Spain', type: 'city', lat: 41.3851, lng: 2.1734 },
    { city: 'Maldives', country: 'Maldives', type: 'beach', lat: 3.2028, lng: 73.2207 },
    { city: 'Whistler', country: 'Canada', type: 'snow', lat: 50.1163, lng: -122.9574 },
    { city: 'Rome', country: 'Italy', type: 'city', lat: 41.9028, lng: 12.4964 }
  ];

  const images = {
    city: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017'
    ],
    beach: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
      'https://images.unsplash.com/photo-1520454974749-611b7248ffdb',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21'
    ],
    snow: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1605540436563-5bca919ae766',
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22'
    ]
  };

  return Array.from({ length: count }, (_, i) => {
    const template = cities[i % cities.length];
    const typeImages = images[template.type as keyof typeof images];
    const randomImage = typeImages[Math.floor(Math.random() * typeImages.length)];
    
    return {
      id: `dest-${i + 1}`,
      city: i < cities.length ? template.city : `${template.city} ${Math.floor(i / cities.length) + 1}`,
      country: template.country,
      type: template.type as 'city' | 'beach' | 'snow',
      image: `${randomImage}?auto=format&fit=crop&q=80&w=800`,
      coordinates: {
        lat: template.lat + (Math.random() - 0.5) * 2,
        lng: template.lng + (Math.random() - 0.5) * 2
      },
      averageTemp: template.type === 'snow' 
        ? Math.floor(Math.random() * 5) - 5 
        : template.type === 'beach'
        ? Math.floor(Math.random() * 15) + 20
        : Math.floor(Math.random() * 20) + 10,
      hasSnow: template.type === 'snow',
      flightTime: Math.floor(Math.random() * 12) + 1
    };
  });
}

export const destinations = generateDestinations(1000);