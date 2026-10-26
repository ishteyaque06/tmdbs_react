
import './App.css'
import { Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ActorDetail from './pages/ActorDetail';

function MovieDetailsPage() {
  const { id } = useParams();
  return <MovieDetails key={id} id={id} />;
}

function ActorDetailPage() {
  const { id } = useParams();
  return <ActorDetail key={id} id={id} />;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home />
        }
      />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/cast/:id" element={<ActorDetailPage />} />
    </Routes>
  );
}

export default App
