import { Routes, Route, Outlet } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from './pages/RecipeDetail';
import Favourites from './pages/Favourites';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="favorites" element={<Favourites />} />
      </Route>
    </Routes>
  );
}

export default App;
