import { Link } from "react-router-dom";
import "../App.css"
const Home = () => {
    return ( 
       <>
        <div className="home-cont">
            <div className="top-cont"></div>
            <div className="btm-cont"></div>
            <div className="home-items-cont">
                <h1>Quiziccal</h1>
                <p className="home-text">Some description if needed</p>
                <Link to="/start-quiz" className="home-link"><button className="home-btn">Start Quiz</button></Link>
            </div>
        </div>
        </>
     );
}
 
export default Home;