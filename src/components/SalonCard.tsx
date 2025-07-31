import type { Salon } from "../data/salons";

interface SalonCardProps {
    salon: Salon;
    onReserve: (salon: Salon) => void;
    onDetails: (salon: Salon) => void;
  }
  
  export function SalonCard({ salon, onReserve, onDetails }: SalonCardProps) {
    return (
      <div
        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
        onClick={() => onDetails(salon)}
      >
        <img
          src={salon.image}
          alt={salon.name}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold">{salon.name}</h2>
          <p className="text-sm text-gray-500">{salon.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm">
              {salon.creditCost} créditos
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita abrir detalles al click en botón
                onReserve(salon);
              }}
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  }
  