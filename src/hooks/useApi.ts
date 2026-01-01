import { useState, useEffect, useCallback } from 'react';
import { productService, ProductFilters, PopularProduct } from '../lib/productService';
import { categoryService, CategoryFilters } from '../lib/categoryService';
import { orderService, OrderFilters, RecentOrder } from '../lib/orderService';
import { customerService, CustomerFilters } from '../lib/customerService';
import { promoService, PromoFilters, Promo } from '../lib/promoService';
import type { Product, ProductCategory, Order, User } from '../types';
import { ApiError } from '../lib/api';

// Generic fetch hook
interface UseFetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// ==================== PRODUCTS ====================

export function useProducts(filters?: ProductFilters): UseFetchState<Product[]> {
    const [data, setData] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await productService.getProducts(filters);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function useProduct(idOrSlug: string, isSlug = false): UseFetchState<Product> {
    const [data, setData] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!idOrSlug) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = isSlug
                ? await productService.getProductBySlug(idOrSlug)
                : await productService.getProductById(idOrSlug);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch product');
        } finally {
            setIsLoading(false);
        }
    }, [idOrSlug, isSlug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function useProductsByCategory(categorySlug: string): UseFetchState<Product[]> {
    const [data, setData] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!categorySlug) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await productService.getProductsByCategory(categorySlug);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, [categorySlug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

// ==================== CATEGORIES ====================

export function useCategories(filters?: CategoryFilters): UseFetchState<ProductCategory[]> {
    const [data, setData] = useState<ProductCategory[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await categoryService.getCategories(filters);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function useCategory(idOrSlug: string, isSlug = false): UseFetchState<ProductCategory> {
    const [data, setData] = useState<ProductCategory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!idOrSlug) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = isSlug
                ? await categoryService.getCategoryBySlug(idOrSlug)
                : await categoryService.getCategoryById(idOrSlug);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch category');
        } finally {
            setIsLoading(false);
        }
    }, [idOrSlug, isSlug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

// ==================== ORDERS ====================

export function useOrders(filters?: OrderFilters): UseFetchState<Order[]> & { meta: { total: number; lastPage: number } | null } {
    const [data, setData] = useState<Order[] | null>(null);
    const [meta, setMeta] = useState<{ total: number; lastPage: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderService.getOrders(filters);
            if (response.success) {
                setData(response.data);
                setMeta({ total: response.meta.total, lastPage: response.meta.last_page });
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, meta, refetch: fetchData };
}

export function useMyOrders(): UseFetchState<Order[]> {
    const [data, setData] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderService.getMyOrders();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function useOrder(idOrNumber: string, isNumber = false): UseFetchState<Order> {
    const [data, setData] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!idOrNumber) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = isNumber
                ? await orderService.getOrderByNumber(idOrNumber)
                : await orderService.getOrderById(idOrNumber);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch order');
        } finally {
            setIsLoading(false);
        }
    }, [idOrNumber, isNumber]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

// ==================== CUSTOMERS ====================

export function useCustomers(filters?: CustomerFilters): UseFetchState<User[]> & { meta: { total: number; lastPage: number } | null } {
    const [data, setData] = useState<User[] | null>(null);
    const [meta, setMeta] = useState<{ total: number; lastPage: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await customerService.getCustomers(filters);
            if (response.success) {
                setData(response.data);
                setMeta({ total: response.meta.total, lastPage: response.meta.last_page });
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch customers');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, meta, refetch: fetchData };
}

// ==================== PROMOS ====================

export function usePromos(filters?: PromoFilters): UseFetchState<Promo[]> {
    const [data, setData] = useState<Promo[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await promoService.getPromos(filters);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch promos');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

// ==================== SEARCH ====================

export function useProductSearch(query: string) {
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (searchQuery: string) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await productService.searchProducts(searchQuery);
            if (response.success) {
                setResults(response.data.products);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Search failed');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            search(query);
        }, 300); // Debounce

        return () => clearTimeout(timer);
    }, [query, search]);

    return { results, isLoading, error };
}

// ==================== DASHBOARD STATS ====================

export function useOrderStatistics() {
    const [data, setData] = useState<{
        total_orders: number;
        orders_today: number;
        orders_this_month: number;
        pending_orders: number;
        processing_orders: number;
        completed_orders: number;
        total_revenue: number;
        revenue_today: number;
        revenue_this_month: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderService.getStatistics();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch statistics');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function useCustomerStatistics() {
    const [data, setData] = useState<{
        total_customers: number;
        active_customers: number;
        new_customers_this_month: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await customerService.getStatistics();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch statistics');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

// ==================== DASHBOARD ADDITIONAL ====================

export function useRecentOrders(limit: number = 10) {
    const [data, setData] = useState<RecentOrder[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await orderService.getRecentOrders(limit);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch recent orders');
        } finally {
            setIsLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export function usePopularProducts(limit: number = 5) {
    const [data, setData] = useState<PopularProduct[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await productService.getPopularProducts(limit);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to fetch popular products');
        } finally {
            setIsLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}
