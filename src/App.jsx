
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SearchBar from './components/Searchbar'
import MovieDetail from './components/Moviedetails'
import Favourites from './components/Favoutritelist'


function App() {
 

  return (
    <>
  
    <BrowserRouter>
    <Navbar />
    
    <Routes>
       <Route path="/" element={<SearchBar />} />
       <Route path="/movie/:id" element={<MovieDetail />} />
       <Route path="/favourites" element={<Favourites />} />
    </Routes>
      
    </BrowserRouter>
    
    </>


      
    
  )
}

export default App