import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load storefront pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsAdmin = lazy(() => import('./pages/admin/ProductsAdmin'));
const ProductEditAdmin = lazy(() => import('./pages/admin/ProductEditAdmin'));
const OrdersAdmin = lazy(() => import('./pages/admin/OrdersAdmin'));
const OrderDetailAdmin = lazy(() => import('./pages/admin/OrderDetailAdmin'));
const GalleryAdmin = lazy(() => import('./pages/admin/GalleryAdmin'));
const TestimonialsAdmin = lazy(() => import('./pages/admin/TestimonialsAdmin'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Storefront */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders/:orderNumber" element={<OrderConfirmationPage />} />

                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Panel (Protected) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<ProductsAdmin />} />
                  <Route path="products/new" element={<ProductEditAdmin />} />
                  <Route path="products/:id" element={<ProductEditAdmin />} />
                  <Route path="orders" element={<OrdersAdmin />} />
                  <Route path="orders/:id" element={<OrderDetailAdmin />} />
                  <Route path="gallery" element={<GalleryAdmin />} />
                  <Route path="testimonials" element={<TestimonialsAdmin />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
