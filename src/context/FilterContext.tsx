import { createContext, useContext, useState } from "react";

interface FilterContextType {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const FilterContext = createContext<FilterContextType>({
    searchKeyword: "",
    setSearchKeyword: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    return (
        <FilterContext.Provider value={{ searchKeyword, setSearchKeyword }}>
    {children}
    </FilterContext.Provider>
);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => useContext(FilterContext);