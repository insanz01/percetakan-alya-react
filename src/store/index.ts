import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartItemConfig, Product, Toast, User } from '../types';

// Cart Store
interface CartState {
    items: CartItem[];
    addItem: (product: Product, config: CartItemConfig, unitPrice: number, totalPrice: number) => void;
    removeItem: (itemId: string) => void;
    updateItemQuantity: (itemId: string, quantity: number) => void;
    updateItemFile: (itemId: string, file: CartItem['uploadedFile']) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getTotalWeight: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, config, unitPrice, totalPrice) => {
                const newItem: CartItem = {
                    id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    productId: product.id,
                    product,
                    config,
                    unitPrice,
                    totalPrice,
                    createdAt: new Date(),
                };
                set((state) => ({ items: [...state.items, newItem] }));
            },

            removeItem: (itemId) => {
                set((state) => ({ items: state.items.filter((item) => item.id !== itemId) }));
            },

            updateItemQuantity: (itemId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.id === itemId) {
                            const newTotalPrice = item.unitPrice * quantity;
                            return { ...item, config: { ...item.config, quantity }, totalPrice: newTotalPrice };
                        }
                        return item;
                    }),
                }));
            },

            updateItemFile: (itemId, file) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === itemId ? { ...item, uploadedFile: file } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.config.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.totalPrice, 0);
            },

            getTotalWeight: () => {
                return get().items.reduce((total, item) => {
                    return total + item.product.weightPerPiece * item.config.quantity;
                }, 0);
            },
        }),
        {
            name: 'printmaster-cart',
        }
    )
);

// UI Store
interface UIState {
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    isCartOpen: boolean;
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
    toasts: Toast[];
    setMobileMenuOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setCartOpen: (open: boolean) => void;
    setLoginModalOpen: (open: boolean) => void;
    setRegisterModalOpen: (open: boolean) => void;
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isCartOpen: false,
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    toasts: [],

    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    setSearchOpen: (open) => set({ isSearchOpen: open }),
    setCartOpen: (open) => set({ isCartOpen: open }),
    setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
    setRegisterModalOpen: (open) => set({ isRegisterModalOpen: open }),

    addToast: (toast) => {
        const id = `toast-${Date.now()}`;
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

        // Auto remove after duration
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, toast.duration || 5000);
    },

    removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    },
}));

// Auth Store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
    clearError: () => void;
    setUser: (user: User | null) => void;
}

// Import authService for API calls
import { authService, ApiError } from '../lib';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authService.login({ email, password });

                    if (response.success) {
                        set({
                            user: response.data.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null
                        });
                        return true;
                    }

                    set({ isLoading: false, error: response.message });
                    return false;
                } catch (error) {
                    const message = error instanceof ApiError ? error.message : 'Login gagal. Silakan coba lagi.';
                    set({ isLoading: false, error: message });
                    return false;
                }
            },

            register: async (name, email, password, phone) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authService.register({
                        name,
                        email,
                        password,
                        password_confirmation: password,
                        phone
                    });

                    if (response.success) {
                        set({
                            user: response.data.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null
                        });
                        return true;
                    }

                    set({ isLoading: false, error: response.message });
                    return false;
                } catch (error) {
                    const message = error instanceof ApiError ? error.message : 'Registrasi gagal. Silakan coba lagi.';
                    set({ isLoading: false, error: message });
                    return false;
                }
            },

            logout: async () => {
                try {
                    await authService.logout();
                } finally {
                    set({ user: null, isAuthenticated: false, error: null });
                }
            },

            fetchProfile: async () => {
                if (!authService.isAuthenticated()) {
                    set({ user: null, isAuthenticated: false });
                    return;
                }

                try {
                    const response = await authService.getProfile();
                    if (response.success) {
                        set({ user: response.data, isAuthenticated: true });
                    } else {
                        set({ user: null, isAuthenticated: false });
                    }
                } catch {
                    set({ user: null, isAuthenticated: false });
                }
            },

            clearError: () => set({ error: null }),

            setUser: (user) => set({ user, isAuthenticated: !!user }),
        }),
        {
            name: 'printmaster-auth',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);


// Product Configuration Store (for product detail page)
interface ProductConfigState {
    selectedSizeId: string | null;
    selectedMaterialId: string | null;
    selectedPrintSideId: string | null;
    selectedFinishingIds: string[];
    quantity: number;
    customWidth: number | null;
    customHeight: number | null;

    setSize: (sizeId: string) => void;
    setMaterial: (materialId: string) => void;
    setPrintSide: (printSideId: string) => void;
    toggleFinishing: (finishingId: string) => void;
    setQuantity: (quantity: number) => void;
    setCustomDimensions: (width: number, height: number) => void;
    resetConfig: () => void;
}

export const useProductConfigStore = create<ProductConfigState>((set) => ({
    selectedSizeId: null,
    selectedMaterialId: null,
    selectedPrintSideId: null,
    selectedFinishingIds: [],
    quantity: 100,
    customWidth: null,
    customHeight: null,

    setSize: (sizeId) => set({ selectedSizeId: sizeId }),
    setMaterial: (materialId) => set({ selectedMaterialId: materialId }),
    setPrintSide: (printSideId) => set({ selectedPrintSideId: printSideId }),

    toggleFinishing: (finishingId) => {
        set((state) => {
            const isSelected = state.selectedFinishingIds.includes(finishingId);
            return {
                selectedFinishingIds: isSelected
                    ? state.selectedFinishingIds.filter((id) => id !== finishingId)
                    : [...state.selectedFinishingIds, finishingId],
            };
        });
    },

    setQuantity: (quantity) => set({ quantity }),
    setCustomDimensions: (width, height) => set({ customWidth: width, customHeight: height }),

    resetConfig: () => set({
        selectedSizeId: null,
        selectedMaterialId: null,
        selectedPrintSideId: null,
        selectedFinishingIds: [],
        quantity: 100,
        customWidth: null,
        customHeight: null,
    }),
}));
