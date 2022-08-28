import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Container} from '@mui/material';
import { Navbar } from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
    return (
      <BrowserRouter>
        <GoogleOAuthProvider clientId='253121259899-mj39pvs69rtb2m9robbgsied68260t2v.apps.googleusercontent.com'>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" exact element={ <Navigate to ="/posts"/>} />
              <Route path="/posts" exact element={<Home/>}/>
              <Route path="/posts/search" exact element={<Home/>}/>
              <Route path="/posts/:id"  element={<PostDetails/>}/>
              <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to = "/posts"/>} />
            </Routes>
          </Container>
        </GoogleOAuthProvider>
      </BrowserRouter>
    );
}

export default App;