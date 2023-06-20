import Dashheader from "./Dashheader/index";
import Dashsidebar from "./Dashsidebar/index";
import Dashcontent from "./Dashcontent/index";
import './Dashboard.css';


function Dashboard(){
   

    return (
        <>

    <div className="App">
    <Dashheader/>
      <div className='dashmain'>
      <Dashsidebar />
      <div className='temp'><Dashcontent /></div>
      </div>
    
    </div>
        </>
    )
}

export default Dashboard;