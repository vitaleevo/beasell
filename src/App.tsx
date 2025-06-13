
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CustomerExperience from "./pages/CustomerExperience";
import Training from "./pages/Training";
import Content from "./pages/Content";
import ContentPost from "./pages/ContentPost";
import ContentCategory from "./pages/ContentCategory";
import ContentCategories from "./pages/ContentCategories";
import ContentArchive from "./pages/ContentArchive";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourseManager from "./pages/admin/CourseManager";
import StudentManager from "./pages/admin/StudentManager";
import ContentManager from "./pages/admin/ContentManager";
import PriceManager from "./pages/admin/PriceManager";
import Analytics from "./pages/admin/Analytics";
import SubscriptionManager from "./pages/admin/SubscriptionManager";

// Student pages
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import CourseDetail from "./pages/student/CourseDetail";
import StudentProfile from "./pages/student/StudentProfile";

// Providers
import { AdminProvider } from "./context/AdminContext";
import { StudentProvider } from "./context/StudentContext";
import { BlogProvider } from "./context/BlogContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AdminProvider>
            <StudentProvider>
              <BlogProvider>
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/experiencia-cliente" element={<CustomerExperience />} />
                    <Route path="/testemunhos" element={<CustomerExperience />} />
                    <Route path="/treinamento" element={<Training />} />
                    
                    {/* Content Routes (formerly Blog) */}
                    <Route path="/conteudos" element={<Content />} />
                    <Route path="/blog" element={<Content />} />
                    <Route path="/conteudos/categorias" element={<ContentCategories />} />
                    <Route path="/blog/categorias" element={<ContentCategories />} />
                    <Route path="/conteudos/categoria/:slug" element={<ContentCategory />} />
                    <Route path="/blog/categoria/:slug" element={<ContentCategory />} />
                    <Route path="/conteudos/arquivo" element={<ContentArchive />} />
                    <Route path="/blog/arquivo" element={<ContentArchive />} />
                    <Route path="/conteudos/:slug" element={<ContentPost />} />
                    <Route path="/blog/:slug" element={<ContentPost />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/cursos" element={<CourseManager />} />
                    <Route path="/admin/alunos" element={<StudentManager />} />
                    <Route path="/admin/conteudos" element={<ContentManager />} />
                    <Route path="/admin/blog" element={<ContentManager />} />
                    <Route path="/admin/precos" element={<PriceManager />} />
                    <Route path="/admin/analytics" element={<Analytics />} />
                    <Route path="/admin/subscricoes" element={<SubscriptionManager />} />

                    {/* Student Routes */}
                    <Route path="/aluno/login" element={<StudentLogin />} />
                    <Route path="/aluno/dashboard" element={<StudentDashboard />} />
                    <Route path="/aluno/cursos" element={<StudentCourses />} />
                    <Route path="/aluno/curso/:id" element={<CourseDetail />} />
                    <Route path="/aluno/perfil" element={<StudentProfile />} />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </BlogProvider>
            </StudentProvider>
          </AdminProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
