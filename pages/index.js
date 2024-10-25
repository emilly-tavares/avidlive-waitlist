import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/home.module.css';
import logoDiscord from '../images/discord-logo.png';
import logoTelegram from '../images/telegram-logo.png';
import logoInstagram from '../images/instagram-logo.png';
import card1 from '../images/avidlive-card-1.png';
import card2 from '../images/avidlive-card-2.png';
import card3 from '../images/avidlive-card-3.png';
import Bubbles from '../components/bubbles.js';

function Home(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [scrollPos, setScrollPos] = useState(0);
    const [isFixed, setIsFixed] = useState(false); 

    const cardsRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/submit', { name, email });
            alert('Dados enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Houve um erro ao enviar os dados.');
        }
    };

    useEffect(() => {
        if (cardsRef.current) { 

            const handleScroll = () => {
                const scrollY = window.scrollY;
                setScrollPos(scrollY);

                if (scrollY > 200) { 
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
        

            };
    
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);

            

        }
    }, []);

    const card1_style = {
        position: 'absolute',
        top: isFixed ? '1100px' : `${Math.min(scrollPos * 0.4 + 100, 500)}px`, 
        transform: `rotate(${Math.max(0, 20 - scrollPos * 0.5)}deg)`,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    const card2_style = {

        position: 'absolute',
        top: isFixed ? '1200px' : `${Math.min(scrollPos * 0.4 + 100, 300)}px`, 
        transform: `rotate(${Math.max(0, -10 - scrollPos * 0.1)}deg)`,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    const card3_style = {

        position: 'absolute',
        top: isFixed ? '1300px' : `${Math.min(scrollPos * 0.4 + 100, 300)}px`, 
        transform: `rotate(${Math.max(0, 10 - scrollPos * 0.1)}deg)`,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    
  

    return <div className={styles.body}>

            <Bubbles />

            <div className={styles.head}>

                <div className={styles.head_div_1}>
                 <h1 className={styles.name}>Avidlive</h1>
                </div>

                <div className={styles.head_div_2}>
                    <button className={styles.head_btn_1}>
                     <Image src={logoDiscord} alt="logo discord" className={styles.logo_discord} />
                    </button>

                    <button className={styles.head_btn_2}>
                     <Image src={logoTelegram} alt="logo telegram" className={styles.logo_telegram} />
                    </button>

                    <button className={styles.head_btn_3}>
                     <Image src={logoInstagram} alt="logo instagram" className={styles.logo_instagram} />
                    </button>
                </div>
                
            </div>

            <div className={styles.space_between}>
            </div>

            <div className={styles.form_div}>

                <h1 className={styles.form_title}> MAKE THE DIFFERENCE </h1>
                <h3 className={styles.form_subtitle}> JOIN OUR WAITLIST </h3>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.form_name}
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className={styles.form_email}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className={styles.submit_btn} type="submit"> Join the waitlist </button>
                </form>


            </div>

            <div ref={cardsRef} className={styles.cards_div} >
                <Image src={card1} alt="card1" className={styles.card1_} style={card1_style}/>
                <Image src={card2} alt="card2" className={styles.card2_} style={card2_style} />
                <Image src={card3} alt="card3" className={styles.card3_} style={card3_style} />
            </div>

            
    </div>
}

export default Home