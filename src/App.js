import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/MarkPublic/Navbar';
import HomeCaro from './components/MarkPublic/HomeCaro';
import Footer from './components/MarkPublic/Footer';
import Video from './components/MarkPublic/Video';
import Resources from './components/MarkPublic/Resouces';
import Resources2 from './components/MarkPublic/Resouces2';
import AddResouce from './components/MarkPublic/AddResouce';
import AddVideo from './components/MarkPublic/AddVideo';
import AddVideo2 from './components/MarkPublic/AddVideo2';
import AddSubject from './components/MarkPublic/AddSubject';
import AddBranch from './components/MarkPublic/AddBranch';
import Home from './components/MarkPublic/Home';
import Login from './components/MarkPublic/Login';
import Navbarbefore from './components/MarkPublic/NavbarBefore';
import About from './components/MarkPublic/About';
import Signup from './components/MarkPublic/Signup';
import LogHome from './components/MarkPublic/LogHome';
import Profile from './components/MarkPublic/Profile';
import ViewResult from './components/MarkCollege/Assesment/ViewResult';
import AddQuestion from './components/MarkCollege/Assesment/AddQuestion';
import AddAssesment from './components/MarkCollege/Assesment/AddAssesment';
import Pricing from './components/MarkPublic/Pricing';
import Navbar3 from './components/MarkPublic/Navbar3';
import Navbar4 from './components/MarkPublic/Navbar4';
import UnitCard from './components/MarkPublic/UnitCard';
import AddUnit from './components/MarkPublic/AddUnit';
import AddUnit2 from './components/MarkPublic/AddUnit2';
import AddSubject2 from './components/MarkPublic/AddSubject2';
import AddAssesment2 from './components/MarkCollege/Assesment/AddAssesment2';
import LogResources from './components/MarkPublic/LogResources';
import LogResources2 from './components/MarkPublic/LogResources2';
import LogAssessment from './components/MarkCollege/Assesment/LogAssessment';
import Queries from './components/MarkPublic/Queries';
import Payment from './components/MarkPublic/Payment';
import PaymentSuccess from './components/MarkPublic/PaymentSuccess';
import LogPricing from './components/MarkPublic/LogPricing';
import AdminHome from './components/MarkAdmin/AdminHome';
import ViewUsers from './components/MarkAdmin/ViewUsers';
import SideBar from './components/MarkAdmin/SideBar';
import AdminProfile from './components/MarkAdmin/AdminProfile';
import Inbox from './components/MarkAdmin/Inbox';
import AssessmentHome from './components/MarkCollege/Assesment/AssessmentHome';
import CHome from './components/MarkCommunity/CHome';
import ChooseCommunity from './components/MarkCommunity/ChooseCommunity';
import CommingSoon from './components/MarkPublic/CommingSoon';
import LogBranches from './components/MarkPublic/LogBranches';
import Branches from './components/MarkPublic/Branches';
import AddResources from './components/MarkPublic/AddResources';





function App() {

  // The Below Data is fetched from /unit an conatins units collection
  // start 
  //declaring all the variables  
  const [inbox, setInbox] = useState([])
  const [user, setUser] = useState([])
  const [subject, setSubject] = useState([])
  const [branch, setBranch] = useState([])
  const [video, setVideo] = useState([])
  const [assessmentResult, setAssessmentResult] = useState([])


  // fetching the user
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
      .then(response => setUser(response.data))
      .catch(err => console.error(err));
  }, []);
  // fetching the inbox
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/Queries`)
      .then(response => setInbox(response.data))
      .catch(err => console.error(err));
  }, []);
  // fetch subject
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
      .then(response => setSubject(response.data))
      .catch(err => console.error(err));
  }, []);
  // fetching the branch
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setBranch(response.data))
      .catch(err => console.error(err));
  }, []);
  // fetching the video
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getData`)
      .then(response => setVideo(response.data))
      .catch(err => console.error(err));
  }, []);
  // fetching the assessmentResult
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/AssessmentResult`)
      .then(response => setAssessmentResult(response.data))
      .catch(err => console.error(err));
  }, []);

  // fetching the communities
  // const [community, setCommunity] = useState([])
  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_BASE_URL}/communities`)
  //     .then(response => setCommunity(response.data))
  //     .catch(err => console.log(err));
  // }, [community]);
  // // messages
  // const [communityMessage, setCommunityMessage] = useState([])
  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_BASE_URL}/communities/messages`)
  //     .then(response => setCommunityMessage(response.data))
  //     .catch(err => console.log(err));
  // }, [communityMessage]);

  //fetching data of currentCommunity



  //end



  return (
    <>
      <Router>
        <Routes>
          {/* Community Page  */}
          <Route path='/community' exact element={<>
            {/* <Navbar4></Navbar4>
            <ChooseCommunity community={community}></ChooseCommunity>
            <Footer></Footer> */}
            <CommingSoon></CommingSoon>
          </>}>
          </Route>
          <Route path='/community/Dashboard' exact element={<>
            {/* <Navbar4></Navbar4>
            <CHome community={community} users={user} communityMessage={communityMessage}></CHome>
            <Footer></Footer> */}
            <CommingSoon></CommingSoon>
          </>}>
          </Route>
          <Route path='/' exact element={<>
            <Navbarbefore />
            <Home></Home>
            <Footer /></>}
          />
          <Route path='/soon' exact element={<>
            <CommingSoon></CommingSoon></>}
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
          <Route path='/LogPricing' exact element={<>


            <LogPricing></LogPricing>

            <Footer />
          </>}
          />

          <Route path='/resources' exact element={<>
            <Navbar />
            <Resources></Resources>
            <Footer />
          </>} />
          <Route path='/LogResources' exact element={<>
            <Navbar4 />
            <LogResources></LogResources>
            <Footer />
          </>} />
          <Route path='/Branches' exact element={<>
            <Navbar />
            <Branches></Branches>
            <Footer />
          </>} />
          <Route path='/LogBranches' exact element={<>
            <Navbar4 />
            <LogBranches></LogBranches>
            <Footer />
          </>} />
          <Route path='/semester2' exact element={<>
            <Navbar4 />
            <LogResources2 branch={branch}></LogResources2>
            <Footer />
          </>} />

          <Route path='/unit' exact element={<>
            <UnitCard></UnitCard>
            <Footer />
          </>} />
          <Route path='/category' exact element={<>
            <Navbar />
            <Resources2 branch={branch}></Resources2>
            <Footer />
          </>} />
          <Route path='/video' exact element={<>
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

          <Route path='/about' element={<>
            <Navbar />
            <About></About>
            <Footer />
          </>} />


          <Route path='/Queries' exact element={<>
            <Navbar />
            <Queries></Queries>
            <Footer />
          </>} />
          <Route path='/Payment' exact element={<>
            <Navbar4></Navbar4>
            <Payment></Payment>

          </>} />
          <Route path='/pSuccess' exact element={<>
            <Navbar4 />
            <PaymentSuccess></PaymentSuccess>
            <Footer />
          </>} />

          {/* Mark College */}

          <Route path='/LogAssessment' element={<>
            <Navbar4 />
            <AssessmentHome></AssessmentHome>
            {/* <LogAssessment></LogAssessment> */}
          </>} />
          <Route path='/LogAssessment/AttemptAssessment' element={<>
            <Navbar4 />

            <LogAssessment></LogAssessment>
          </>} />
          <Route path='/LogAssessment/viewResult' element={<>
            <Navbar4 />
            <ViewResult></ViewResult>
          </>} />
          <Route path='/assesment/addQuestion' element={<>
            <Navbar />
            <AddQuestion></AddQuestion>
            <Footer />
          </>} />



          {/* Admin */}

          <Route path='/Admin/Home' element={<>
            <AdminHome user={user} subject={subject} branch={branch} assessmentResult={assessmentResult} video={video} ></AdminHome>
          </>} />
          <Route path='/Admin/Inbox' element={<>
            <div className="flex">
              <SideBar ></SideBar>
              <div className="main w-screen">
                <Inbox inbox={inbox} ></Inbox>
              </div>
            </div>
          </>} />
          <Route path='/Admin/ViewUsers' element={<>
            <ViewUsers inbox={inbox} users={user}></ViewUsers>

          </>} />
          <Route path='/Admin/Pricing' element={<>
            <div className="flex">
              <SideBar></SideBar>
              <div className="main">
                <Pricing ></Pricing>
              </div>
            </div>

          </>} />
          <Route path='/Admin/Modify' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <div className="main">
                <AddResouce></AddResouce>
              </div>

            </div>
          </>} />
          <Route path='/Admin/Profile' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <div className="main">
                <AdminProfile></AdminProfile>
              </div>

            </div>
          </>} />

          {/* Modification */}

          <Route path='/Modify/Video' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddVideo></AddVideo>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Video/Add' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddVideo2></AddVideo2>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Subject' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddSubject></AddSubject>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Resource' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>
                <AddResources></AddResources>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Subject/Add' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddSubject2></AddSubject2>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Branch' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddBranch></AddBranch>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Unit' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>
                <AddUnit></AddUnit>
              </center>
            </div>

          </>} />
          <Route path='/Modify/Unit/Add' exact element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>
                <AddUnit2></AddUnit2>
              </center>
            </div>

          </>} />

          <Route path='/Modify/Assessment' element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddAssesment></AddAssesment>
              </center>
            </div>
          </>} />
          <Route path='/Modify/Assesment/Add' element={<>
            <div className="flex">
              <SideBar></SideBar>
              <center className='mx-auto'>

                <AddAssesment2></AddAssesment2>
              </center>
            </div>
          </>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;



