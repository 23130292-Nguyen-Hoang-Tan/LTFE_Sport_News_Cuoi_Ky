import { createContext, useContext, useState } from "react";

export type SortOption = 'default' | 'newest' | 'oldest' | 'popular';

interface FilterContextType {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    //sắp xếp
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    clearFilters: () => void;
    //người dùng có đang mở ô tìm kiếm không
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;
    //danh mục
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const FilterContext = createContext<FilterContextType>({
    searchKeyword: "",
    setSearchKeyword: () => {},
    //giá trị mặc định default
    sortBy: "default",
    isSearchOpen: false,
    setIsSearchOpen: () => {},
    setSortBy: () => {},
    selectedCategory: "",
    setSelectedCategory: () => {},
    clearFilters: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("default");
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const clearFilters = () => {
        setSearchKeyword("");
        setSortBy("default");
        setIsSearchOpen(false);
        setSelectedCategory("");
    };
    return (
        <FilterContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                sortBy,
                isSearchOpen,
                setIsSearchOpen,
                setSortBy,
                selectedCategory,
                setSelectedCategory,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => useContext(FilterContext);