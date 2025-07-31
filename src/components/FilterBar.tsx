interface FilterBarProps {
    filterType: string;
    setFilterType: (type: string) => void;
    filterLocation: string;
    setFilterLocation: (loc: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  export function FilterBar({
    filterType,
    setFilterType,
    filterLocation,
    setFilterLocation,
    searchTerm,
    setSearchTerm,
  }: FilterBarProps) {
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="corte de cabello">Corte de cabello</option>
          <option value="barba">Barba</option>
          <option value="peinados">Peinados</option>
        </select>
  
        <select
          className="border p-2 rounded"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Todas las ubicaciones</option>
          <option value="Centro Histórico">Centro Histórico</option>
          <option value="La Floresta">La Floresta</option>
          <option value="La Mariscal">La Mariscal</option>
          <option value="Guápulo">Guápulo</option>
          <option value="Centro">Centro</option>
        </select>
  
        <input
          type="text"
          placeholder="Buscar salones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-grow min-w-[200px]"
        />
      </div>
    );
  }
  