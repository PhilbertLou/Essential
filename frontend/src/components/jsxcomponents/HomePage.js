import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function HomePage(props){
    const [waterperc, setwaterperc] = useState(0);
    const [sugarperc, setsugarperc] = useState(0);

    useEffect(()=>{
        console.log(props.wGoal);
        console.log(props.suGoal);
        setwaterperc(props.wGoal?((100*props.water/props.wGoal).toFixed(2)):100);
        setsugarperc(props.suGoal?((100*props.sugar/props.suGoal).toFixed(2)):100);
    }, [])
    return(
        <div>
            <div className="jumbotron jumbotron-fluid bg-dark text-white jumbotronsize">
                <div className="container">
                    <h1 className="display-4">Welcome back {props.name}</h1>
                    <p className="lead">Today is: {props.date}</p>
                    <p className="lead">Your water goal today is: {props.wGoal} mL</p>
                    <p className="lead">Your sugar limit today is: {props.suGoal} g</p>
                    <small className="text-muted"> Tip: Pressing either submit button will register both entries. So you can click any for either or both!</small>
                </div>
            </div>
            <div className="row m-0 centerdiv">
                <div className="col-md-4 righthomepagetextbox centerdiv">
                    <div className="card border-secondary mb-3">
                        <div className="card-header bg-dark text-white">Water: Currently consumed {props.water} mL today!</div>
                        <div className="card-body text-secondary circlesize">
                            <CircularProgressbarWithChildren
                                value={waterperc} 
                                text={`${waterperc}%`} 
                                styles={buildStyles({
                                    // Text size
                                    textSize: '16px',
                                 
                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Colors 62, 152, 199,
                                    pathColor: `rgba(62, 152, 199, ${waterperc / 100 + 0.15})`,
                                    textColor: `rgba(62, 152, 199, ${waterperc / 100 + 0.15})`,
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                  })}>
                                 </CircularProgressbarWithChildren>
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 lefthomepagetextbox centerdiv">
                    <div className="card border-secondary mb-3">
                        <div className="card-header bg-dark text-white">Sugar: Currently consumed {props.sugar} g today!</div>
                        <div className="card-body text-secondary circlesize">
                        <CircularProgressbarWithChildren
                                value={sugarperc} 
                                text={`${sugarperc}%`} 
                                styles={buildStyles({
                                    // Text size
                                    textSize: '16px',
                                 
                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Colors 62, 152, 199,
                                    pathColor: `rgba(255,136,136, ${sugarperc / 100 + 0.15})`,
                                    textColor: `rgba(255,136,136, ${sugarperc / 100 + 0.15})`,
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                  })}
                             />
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <p>{props.name}</p> W
            <br/ >
            <p>{props.date}</p> W
            <br/ >
            <p>{props.water}</p>
            <br/ >
            <p>{props.sugar}</p>
            <br/ >
            <p>{props.wGoal}</p>
            <br/ >
            <p>{props.suGoal}</p>
            <br/ >
            <button onClick={props.water10}>10</button>
            <button onClick={props.water50}>50</button>
            <button onClick={props.water100}>100</button>
            <input type="number" name="directwater" value={props.directwater} placeholder="Custom Value" onChange={props.handleWChange} />
            <button onClick={props.sugar1}>1</button>
            <button onClick={props.sugar5}>5</button>
            <button onClick={props.sugar10}>10</button>
            <input type="number" name="directsugar" value={props.directsugar} placeholder="Custom Value" onChange={props.handleSUChange} />
            <br />
            <button onClick={props.incrementwater}>+</button>
            <button onClick={props.deincrementwater}>-</button>
            <button onClick={props.incrementsugar}>+</button>
            <button onClick={props.deincrementsugar}>-</button>
            <br />
            <button onClick={props.handleTrack}>Save Update</button>
            <button onClick={props.handleLogout}>Logout</button>
            <button onClick={props.handleUpdates}>See Updates</button>
            <button onClick={props.handleChanges}>Change Info</button>
            <button onClick={props.handlePrevious}>See previous Days</button>
            {props.message} */}
        </div>
    )
}

export default HomePage;