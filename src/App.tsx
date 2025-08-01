import { useState, useMemo } from "react";
import { salons, type Salon } from "./data/salons";
import { CreditDisplay } from "./components/CreditDisplay";
import { FilterBar } from "./components/FilterBar";
import { SalonCard } from "./components/SalonCard";
import { SalonDetails } from "./components/SalonDetails";
import { Alert } from "./components/Alerts";
import { Pagination } from "./components/Pagination";
import { CreditsProvider, useCredits } from "./context/CreditsContext";

function AppContent() {
  const { credits, reserve } = useCredits();

  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const salonsPerPage = 6;

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      const matchesType =
        !filterType || salon.type.toLowerCase() === filterType.toLowerCase();
      const matchesLocation =
        !filterLocation || salon.location.toLowerCase() === filterLocation.toLowerCase();
      const matchesSearch =
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesLocation && matchesSearch;
    });
  }, [filterType, filterLocation, searchTerm]);

  const totalPages = Math.ceil(filteredSalons.length / salonsPerPage);
  const paginatedSalons = filteredSalons.slice(
    (currentPage - 1) * salonsPerPage,
    currentPage * salonsPerPage
  );

  function handleReserve(salon: Salon) {
    if (reserve(salon)) {
      setToastMessage(`Reserva exitosa en ${salon.name}!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      setToastMessage("Créditos insuficientes");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <header className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">
          HairBook - Créditos: <CreditDisplay credits={credits} />
        </h1>
        <FilterBar
          filterType={filterType}
          setFilterType={setFilterType}
          filterLocation={filterLocation}
          setFilterLocation={setFilterLocation}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>

      <main>
        {paginatedSalons.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron salones</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedSalons.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                onReserve={handleReserve}
                onDetails={() => setSelectedSalon(salon)}
              />
            ))}
          </div>
        )}
      </main>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SalonDetails salon={selectedSalon} onClose={() => setSelectedSalon(null)} />

      <Alert message={toastMessage} show={showToast} />
    </div>
  );
}

function App() {
  return (
    <CreditsProvider>
      <AppContent />
    </CreditsProvider>
  );
}

export default App;
