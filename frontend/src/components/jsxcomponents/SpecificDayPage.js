import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function SpecificDayPage(props){
    const waterperc = props.waterperc
    const sugarperc = props.sugarperc
    return(
        <div className="googlefont">
            <div className="jumbotron jumbotron-fluid bg-dark text-white jumbotronsize">
                <div className="container">
                    <h1 className="display-4">Date: {props.date}</h1>
                    <p className="lead">Your water goal was: {props.wGoal} mL</p>
                    <p className="lead">Your sugar limit was: {props.suGoal} g</p>
                    <button className="btn btn-outline-light buttonmargin" onClick={props.handleBack}>Go back</button>
                </div>
            </div>
            <div className="row m-0 centerdiv">
                <div className="col-md-4 righthomepagetextbox centerdiv">
                    <div className="card border-secondary mb-3">
                        <div className="card-header bg-dark text-white">Water consumed: {props.water} mL</div>
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
                        </div>
                    </div>
                </div>
                <div className="col-md-4 lefthomepagetextbox centerdiv">
                    <div className="card border-secondary mb-3">
                        <div className="card-header bg-dark text-white">Sugar consumed: {props.sugar} g</div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificDayPage;