import React, { PureComponent } from 'react'
import Controleur from '../Contoleur'
import Parametreur from '../Parametreur'

const initValue = {
    minSet: 25,
    secSet: 0,
    minutes: 25,
    secondes: 0,
    breakLength: 5,
    canChange: true,
    intervalId: 0,
    canPlay: false,
    isSession: true
}

class Afficheur extends PureComponent {

    state = initValue;

    myref = React.createRef();

    changerMinutes = value => {
        if (this.state.canChange && (this.state.minutes + value) > 0) {
            this.setState(prevState => ({
                minSet: prevState.minutes + value,
                secSet: 0,
                minutes: prevState.minutes + value,
                secondes: 0
            }))
        }
    };

    changeBreak = value => {
        if (this.state.canChange && (this.state.breakLength + value) > 0) {
            this.setState(prevState => ({
                breakLength: prevState.breakLength + value
            }))
        }
    }

    play = () => {
        clearTimeout(this.state.intervalId);
        this.setState({ canPlay: true});
    }

    pause = () => {
        clearTimeout(this.state.intervalId);
        this.setState({ canChange: true, canPlay: false });
    }

    initialise = () => {
        this.setState(initValue);
        clearInterval(this.state.intervalId);
    }

    componentDidUpdate(prevProps, prevState) {
        const {canPlay, minutes, secondes} = this.state;

        if (canPlay) {

            const id = setTimeout(() => {

                if ((minutes + secondes) !== 0) {
                    this.setState(
                        { 
                            minutes: secondes ? minutes : (minutes - 1), 
                            secondes: secondes ? secondes - 1 : 59
                        })
                } else {
                    if(this.state.isSession) {
                        this.setState(
                            {
                                isSession: false,
                                secondes: 0,
                                minutes: prevState.breakLength
                            }
                        )
                    } else {
                        this.setState(
                            {
                                isSession: true,
                                secondes: 0,
                                minutes: prevState.minSet
                            }
                        )
                    }
                }

            }, 1000);
            (prevState.canPlay !== canPlay) && this.setState({canChange: false, intervalId: id})
        }
    }

    render() {
        const {minutes, minSet, secondes, breakLength} = this.state;
        return (
            <>
                <Parametreur
                    m={minSet}
                    cm={this.changerMinutes}
                    b={breakLength}
                    cb={this.changeBreak}
                />

                <div className='afficheur-contenaire'>
                    <p> { this.state.isSession ? 'Session' : 'Break'} </p>
                    <div>
                        {minutes > 9 ? (minutes) : (`0${minutes}`)}
                        :
                        {secondes > 9 ? (secondes) : (`0${secondes}`)}
                    </div>
                </div>

                <Controleur
                    initi={this.initialise}
                    play={this.play}
                    pause={this.pause}
                />
            </>
        )
    }
    
}

export default Afficheur