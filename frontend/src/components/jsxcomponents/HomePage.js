import React from "react";
import '../../App.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function HomePage(props){
    const waterperc = props.waterperc;
    const sugarperc = props.sugarperc;
    return(
        <div className="googlefont">
            <div className="jumbotron jumbotron-fluid bg-dark text-white jumbotronsize">
                <div className="container">
                    <h1 className="display-4">Welcome back, {props.name}!</h1>
                    <p className="lead">Today is: {props.date}</p>
                    <p className="lead">Your water goal today is {props.wGoal} mL</p>
                    <p className="lead">Your sugar limit today is {props.suGoal} g</p>
                    <small className="text-muted"> Tip: Pressing either submit button will register both entries. So you can click any for either or both!</small>
                    {props.message === "Tracked!"?<div><br/><div className="alert alert-success" style={{textAlign:"center"}}role="alert">
                        <div className="formbuttondiv">{props.message}</div>
                    </div></div>: null}
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
                                 <br />
                                 <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.water10}>10</button>
                                <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.water50}>50</button>
                                <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.water100}>100</button>
                                <br />
                                Currently going up/down by: 
                                <input className="form-control" type="number" name="directwater" value={props.waternum} placeholder="Custom Value" onChange={props.handleWChange} />
                                <button className="btn btn-outline-dark wsbuttonmargins" onClick={props.incrementwater}>+</button>
                                <button className="btn btn-outline-dark wsbuttonmargins" onClick={props.deincrementwater}>-</button>
                                <button className="btn btn-outline-info wsbuttonmargins" onClick={props.handleTrack}>Save Update</button>
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
                             <br />
                            <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.sugar1}>1</button>
                            <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.sugar5}>5</button>
                            <button className="btn btn-outline-secondary wsbuttonmargins" onClick={props.sugar10}>10</button>
                            <br />
                            Currently going up/down by: 
                            <input className="form-control" type="number" name="directsugar" value={props.sugarnum} placeholder="Custom Value" onChange={props.handleSUChange} />
                            <button className="btn btn-outline-dark wsbuttonmargins" onClick={props.incrementsugar}>+</button>
                            <button className="btn btn-outline-dark wsbuttonmargins" onClick={props.deincrementsugar}>-</button>
                            <button className="btn btn-outline-danger wsbuttonmargins" onClick={props.handleTrack}>Save Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;