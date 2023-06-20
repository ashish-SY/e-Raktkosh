
import rajneesh from './images/Rajneesh.jpeg'
import shivanshu from './images/Shivanshu.jpg';
import harshit from './images/Harshit.jpeg';
import './Team.css';


function Team() {
    
    return (
        <div>
            <h1 className='team'>Our Team</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className="card">
                            {/* <img src={shivanshu} alt='' className="card-img-top"></img> */}
                            <div className="card-body">
                            <h3 className='card-text'>Shivanshu Sagar</h3>                               
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="card">
                            {/* /<img src={rajneesh} alt='' className="card-img-top"></img> */}
                            <div className="card-body">
                            <h3 className='card-text'>Rajneesh Gangwar</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="card">
                            {/* <img src={harshit} alt='' className="card-img-top"></img> */}
                            <div className="card-body">
                               <h3 className='card-text'>Divyanshu Patel</h3>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        
    );
}

export default Team
