import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/MarkPublic/Navbar';
import HomeCaro from './components/MarkPublic/HomeCaro';
import Footer from './components/MarkPublic/Footer';
import Video from './components/MarkPublic/Video';
import Resources from './components/MarkPublic/Resouces';
import Resources2 from './components/MarkPublic/Resouces2';
import AddResouce from './components/MarkPublic/AddResouce';
import AddVideo from './components/MarkPublic/AddVideo';
import AddSubject from './components/MarkPublic/AddSubject';
import AddBranch from './components/MarkPublic/AddBranch';
import Home from './components/MarkPublic/Home';
import Login from './components/MarkPublic/Login';
import Navbarbefore from './components/MarkPublic/NavbarBefore';
import About from './components/MarkPublic/About';
import Signup from './components/MarkPublic/Signup';
import LogHome from './components/MarkPublic/LogHome';
import Profile from './components/MarkPublic/Profile';
import Asses from './components/MarkCollege/Assesment/Asses';
import Result from './components/MarkCollege/Assesment/Result';
import AddQuestion from './components/MarkCollege/Assesment/AddQuestion';
import AddAssesment from './components/MarkCollege/Assesment/AddAssesment';





function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' exact element={<>
            <Navbarbefore />

            <Home></Home>
            {/* <Carousel /> */}
            <HomeCaro />
            <Footer /></>}
          />
          <Route path='/home' exact element={<>
            <Navbar />
            <LogHome></LogHome>
            <HomeCaro />
            <Footer /></>}
          />

          <Route path='/resources' exact element={<>
            <Navbar />
            <Resources></Resources>
            <Footer />
          </>} />

          <Route path='/semester' exact element={<>
            <Navbar />
            <Resources2></Resources2>
            <Footer />
          </>} />


          <Route path='/video' exact element={<>
            <Navbar />
            <Video></Video>
            <Footer />
          </>} />

          <Route path='/profile' exact element={<>
            <Navbar />
            <Profile></Profile>
            <Footer />
          </>} />


          <Route path='/login' exact element={<>
            <Navbarbefore />
            <Login />
            <Footer />
          </>} />
          <Route path='/signup' exact element={<>
            <Navbarbefore />
            <Signup />
            <Footer />
          </>} />



          <Route path='/addResource' exact element={<>
            <Navbar />
            <AddResouce></AddResouce>
            <Footer />
          </>} />
          <Route path='/about' element={<>
            <Navbar />
            <About></About>

            <Footer />
          </>} />



          <Route path='/addResource/addVideo' exact element={<>
            <Navbar />
            <AddVideo></AddVideo>
            <Footer />
          </>} />
          <Route path='/addResource/AddSubject' exact element={<>
            <Navbar />
            <AddSubject></AddSubject>
            <Footer />
          </>} />
          <Route path='/addResource/AddBranch' exact element={<>
            <Navbar />
            <AddBranch></AddBranch>
            <Footer />
          </>} />


          {/* Mark College */}

          <Route path='/Assesment' element={<>
            <Navbar />
            <Asses></Asses>

          </>} />
          <Route path='/assesment/addQuestion' element={<>
            <Navbar />
            <AddQuestion></AddQuestion>
            <Footer />
          </>} />
          <Route path='/assesment/addAssesment' element={<>
            <Navbar />
            <AddAssesment></AddAssesment>
            <Footer />
          </>} />


        </Routes>
      </Router>
    </>
  );
}

export default App;



