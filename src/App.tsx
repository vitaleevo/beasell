
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { BlogProvider } from "@/context/BlogContext";
import { AdminProvider } from "@/context/AdminContext";
import { StudentProvider } from "@/context/StudentContext";
import { useAuth } from "@/hooks/useAuth";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { useAnalytics } from "@/hooks/useAnalytics";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogArchive from "./pages/BlogArchive";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManager from "./pages/admin/BlogManager";
import PriceManager from "./pages/admin/PriceManager";

// Student Pages
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import CourseDetail from "./pages/student/CourseDetail";
import StudentProfile from "./pages/student/StudentProfile";

// Blog Post Page
import BlogPost from "./pages/BlogPost";

// Enhanced Components
import WhatsAppEnhanced from "./components/ui/whatsapp-enhanced";
import PageLoader from "./components/ui/page-loader";
import ScrollToTop from "./components/ui/scroll-to-top";
import { usePageTransition } from "./hooks/usePageTransition";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

// Protected Route Component for Students
const StudentProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useStudentAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/aluno/login" />;
};

// Page Wrapper with Transition and Analytics
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = usePageTransition();
  useAnalytics(); // Track page views
  
  return (
    <>
      {isLoading && <PageLoader />}
      {children}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BlogProvider>
          <AdminProvider>
            <StudentProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <PageWrapper>
                      <Index />
                    </PageWrapper>
                  } />
                  <Route path="/sobre" element={
                    <PageWrapper>
                      <About />
                    </PageWrapper>
                  } />
                  <Route path="/servicos" element={
                    <PageWrapper>
                      <Services />
                    </PageWrapper>
                  } />
                  <Route path="/testemunhos" element={
                    <PageWrapper>
                      <Testimonials />
                    </PageWrapper>
                  } />
                  <Route path="/blog" element={
                    <PageWrapper>
                      <Blog />
                    </PageWrapper>
                  } />
                  <Route path="/blog/:slug" element={
                    <PageWrapper>
                      <BlogPost />
                    </PageWrapper>
                  } />
                  <Route path="/contacto" element={
                    <PageWrapper>
                      <Contact />
                    </PageWrapper>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/blog" element={
                    <ProtectedRoute>
                      <BlogManager />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/precos" element={
                    <ProtectedRoute>
                      <PriceManager />
                    </ProtectedRoute>
                  } />
                  
                  {/* Student Routes */}
                  <Route path="/aluno/login" element={<StudentLogin />} />
                  <Route path="/aluno" element={
                    <StudentProtectedRoute>
                      <StudentDashboard />
                    </StudentProtectedRoute>
                  } />
                  <Route path="/aluno/cursos" element={
                    <StudentProtectedRoute>
                      <StudentCourses />
                    </StudentProtectedRoute>
                  } />
                  <Route path="/aluno/curso/:courseId" element={
                    <StudentProtectedRoute>
                      <CourseDetail />
                    </StudentProtectedRoute>
                  } />
                  <Route path="/aluno/perfil" element={
                    <StudentProtectedRoute>
                      <StudentProfile />
                    </StudentProtectedRoute>
                  } />
                  
                  {/* 404 */}
                  <Route path="*" element={
                    <PageWrapper>
                      <NotFound />
                    </PageWrapper>
                  } />
                </Routes>
                
                {/* Enhanced Widgets */}
                <WhatsAppEnhanced />
                <ScrollToTop />
              </BrowserRouter>
            </StudentProvider>
          </AdminProvider>
        </BlogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
