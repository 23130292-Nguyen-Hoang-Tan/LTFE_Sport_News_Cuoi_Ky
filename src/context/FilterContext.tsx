import { createContext, useContext, useState } from "react";

export type SortOption = 'default' | 'newest' | 'oldest' | 'popular';

interface FilterContextType {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    //sắp xếp
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType>({
    searchKeyword: "",
    setSearchKeyword: () => {},
    //giá trị mặc định default
    sortBy: "default",
    setSortBy: () => {},
    clearFilters: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("default");
    const clearFilters = () => {
        setSearchKeyword("");
        setSortBy("default");
    };
    return (
        <FilterContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                //truyền xuống provider
                sortBy,
                setSortBy,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => useContext(FilterContext);