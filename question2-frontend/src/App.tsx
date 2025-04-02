import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
       <CssBaseline /> {/* Normalize CSS */}
       <Router>
         <Layout>
           <Routes>
             <Route path="/" element={<TopUsersPage />} />
             <Route path="/trending" element={<TrendingPostsPage />} />
             <Route path="/feed" element={<FeedPage />} />
             
           </Routes>
         </Layout>
       </Router>
    </ThemeProvider>
  );
}

export default App;