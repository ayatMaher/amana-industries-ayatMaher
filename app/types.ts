// app/types.ts
export type MonthPoint = { month: string; value: number };

export interface Factory {
  id: number;
  name: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    address: string;
  };
  status: string;
  established: string;
  employees: number;
  specialization: string[];
  production_capacity_monthly: number;
  production_level_2024?: MonthPoint[];   // optional in raw data
  inventory_level_2024?: MonthPoint[];    // optional in raw data
  contact: { manager: string; phone: string; email: string };
}

// This is the *narrowed* shape your chart needs: both arrays are definitely present.
export type FactoryWithChartData =
  Factory &
  Required<Pick<Factory, 'production_level_2024' | 'inventory_level_2024'>>;

// Proper user-defined type guard (uses a type predicate)
export function hasChartData(f: Factory): f is FactoryWithChartData {
  return Array.isArray(f.production_level_2024) && Array.isArray(f.inventory_level_2024);
}
