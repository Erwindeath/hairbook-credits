import type { Salon } from "../data/salons";

interface SalonDetailsProps {
    salon: Salon | null;
    onClose: () => void;
  }
  
  export function SalonDetails({ salon, onClose }: SalonDetailsProps) {
    if (!salon) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl max-w-lg w-full shadow-lg transform transition-all scale-100 animate-fadeIn">
          <div className="relative">
            <img src={salon.image} alt={salon.name} className="w-full h-60 object-cover rounded-t-xl" />
            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-black text-white rounded-full px-2 py-1"
            >
              ✕
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold">{salon.name}</h2>
            <p className="text-gray-500">{salon.description}</p>
            <p className="mt-2"><strong>Ubicación:</strong> {salon.location}</p>
            <p className="mt-1"><strong>Tipo:</strong> {salon.type}</p>
            <p className="mt-1"><strong>Costo:</strong> {salon.creditCost} créditos</p>
  
            <div className="mt-4">
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  salon.location
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="200"
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
  