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
import AddQuestion from './components/MarkCollege/Assesment/AddQuestion';
import AddAssesment from './components/MarkCollege/Assesment/AddAssesment';
import Pricing from './components/MarkPublic/Pricing';
import Navbar3 from './components/MarkPublic/Navbar3';
import Navbar4 from './components/MarkPublic/Navbar4';
import UnitCard from './components/MarkPublic/UnitCard';
import AddUnit from './components/MarkPublic/AddUnit';
import AddUnit2 from './components/MarkPublic/AddUnit2';
import AddSubject2 from './components/MarkPublic/AddSubject2';




function App() {

  // The Below Data is fetched from /unit an conatins units collection
  // start 

  //end



  return (
    <>
      <Router>
        <Routes>

          <Route path='/' exact element={<>
            <Navbarbefore />
            <Home></Home>
            {/* <Carousel /> */}
            {/* <HomeCaro /> */}
            <Footer /></>}
          />
          <Route path='/home' exact element={<>
            <Navbar4 />
            <LogHome></LogHome>
            <HomeCaro />
            <Footer /></>}
          />
          <Route path='/pricing' exact element={<>
            <Navbar3></Navbar3>
            <Pricing></Pricing>
            <Footer /></>}
          />

          <Route path='/resources' exact element={<>
            <Navbar />
            <Resources></Resources>
            <Footer />
          </>} />

          <Route path='/unit' exact element={<>
            <Navbar />
            <UnitCard></UnitCard>
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
            <Navbar4 />
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



          <Route path='/Modify' exact element={<>
            <Navbar />
            <AddResouce></AddResouce>
            <Footer />
          </>} />
          <Route path='/about' element={<>
            <Navbar />
            <About></About>

            <Footer />
          </>} />

          <Route path='/Modify/Video' exact element={<>
            <Navbar />
            <AddVideo></AddVideo>
            <Footer />
          </>} />
          <Route path='/Modify/Subject' exact element={<>
            <Navbar />
            <AddSubject></AddSubject>
            <Footer />
          </>} />
          <Route path='/Modify/Subject/Add' exact element={<>
            <Navbar />
            <AddSubject2></AddSubject2>
            <Footer />
          </>} />
          <Route path='/Modify/Branch' exact element={<>
            <Navbar />
            <AddBranch></AddBranch>
            <Footer />
          </>} />
          <Route path='/Modify/Unit' exact element={<>
            <Navbar />
            <AddUnit></AddUnit>
            <Footer />
          </>} />
          <Route path='/Modify/Unit/Add' exact element={<>
            <Navbar />
            <AddUnit2></AddUnit2>
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



