import { motion, AnimatePresence } from "framer-motion";
import type { Salon } from "../data/salons";
import { useEffect } from "react";

interface SalonDetailsProps {
  salon: Salon | null;
  onClose: () => void;
}

export function SalonDetails({ salon, onClose }: SalonDetailsProps) {
  useEffect(() => {
    document.body.style.overflow = salon ? "hidden" : "";
  }, [salon]);

  if (!salon) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg max-w-3xl w-full relative shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold z-10"
            aria-label="Cerrar detalles"
          >
            &times;
          </button>

          {/* Imagen principal */}1
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-56 object-cover"
          />

          {/* Contenido */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{salon.name}</h2>
            <p className="text-gray-600 mb-4">{salon.description}</p>
            <p><strong>Tipo de servicio:</strong> {salon.type}</p>
            <p><strong>Ubicación:</strong> {salon.location}</p>
            <p><strong>Costo en créditos:</strong> {salon.creditCost}</p>

            {/* Mapa */}
            <div className="mt-4 h-64 w-full rounded overflow-hidden border">
              <iframe
                title="Mapa ubicación salón"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  salon.location
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
