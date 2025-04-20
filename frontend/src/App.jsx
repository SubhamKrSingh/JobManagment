import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import JobForm from "./components/JobForm"
import JobList from "./pages/JobList"
import Home from "./pages/Home"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}>
        <Route path="/create-job" element = {<JobForm/>}/>
        </Route>
        <Route path="/joblist" element={<JobList/>}/>
      </Routes>
    </Router>
  )
}

export default App
