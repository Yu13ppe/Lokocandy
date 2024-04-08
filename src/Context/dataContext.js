import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import axios from 'axios';

export const DataContext = createContext();

export function DataContextProvider(props) {
    const [logged, setLogged] = useLocalStorage('lokoLog', false);
    const [access_token, setAccessAdminToken] = useLocalStorage('13030606', '');
    const [search, setSearch] = useState('');
    const url = 'https://lokocandy.up.railway.app';
    const [products, setProducts] = useState([]);
    const [categoriesList, setCategories] = useState([]);
    const [brandsList, setBrands] = useState([]);

    const filteredSearch = products.filter((prod) => {
        const fullName = `${prod.prod_name} ${prod.brand && prod.brand.bra_name} ${prod.category && prod.category.cat_name}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
    });

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [url])

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/category`);
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [url])

    const fetchBrands = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/brand`);
            setBrands(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [url])

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
    }, [fetchProducts, fetchCategories, fetchBrands])

    const value = {
        logged, setLogged,
        search, setSearch,
        url,
        filteredSearch,
        fetchProducts,
        categoriesList,
        brandsList,
        access_token, setAccessAdminToken
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
}