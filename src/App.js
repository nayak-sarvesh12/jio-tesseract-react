import Routes from "./route";
import { BrowserRouter as Router } from "react-router-dom";
import studentJson from "./data/student_data.json";
function App() {
  localStorage.setItem("jsonData", JSON.stringify(studentJson));
  return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
