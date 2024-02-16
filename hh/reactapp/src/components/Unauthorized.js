import { useState, useEffect } from 'react';
import '../styles/Unauthorized.css';
import NuhUh from '../images/nuhuh.gif';
import Twerking from '../images/twerking.gif';
import Mewing from '../images/mewing.gif';
import Disabled from '../images/disabled.gif';
import GuitarRiff from '../images/guitarriff.gif';
import BreakItDown from '../images/breakitdown.gif';
import BadBone from '../sounds/badbone.mp3';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const [audio] = useState(new Audio(BadBone));

    const playAudio = () => {
        audio.play();
        setTimeout(() => {
            navigate('/home');
        }, 2000);
    }

    return (
        <>
            <div className='skeleton-container'>
                <h1 className='unauthorized'>Нямаш право да достъпиш тази страница!</h1>

                <div className='the-rattler' onClick={playAudio}>
                    <div className='left-container'>
                        <img src={Twerking} className='twerking-wrapper' alt="" />
                        <img src={Disabled} className='long-gif' alt="" />
                    </div>
                    <div className='nuh-uh-container'>
                        <img src={NuhUh} className='nuh-uh-wrapper' alt="" />
                        <div className="mewing-riff-container">
                            <img src={Mewing} className='mewing-riff-wrapper' alt="" />
                            <img src={GuitarRiff} className='mewing-riff-wrapper' alt="" />
                        </div>
                    </div>
                    <div className="right-container">
                        <img src={Twerking} className='twerking-wrapper' alt="" />
                        <img src={BreakItDown} className='long-gif' alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Unauthorized;