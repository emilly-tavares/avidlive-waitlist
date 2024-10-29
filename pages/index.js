import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/home.module.css';
import logoDiscord from '../images/discord-logo.png';
import logoTelegram from '../images/telegram-logo.png';
import logoInstagram from '../images/instagram-logo.png';
import card1 from '../images/card1.png';
import card2 from '../images/card2.png';
import card3 from '../images/card3.png';
import card4 from '../images/card4.png';
import Bubbles from '../components/bubbles.js';
import bottom_img from '../images/bottom-img.png';

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
            alert('Good job! You’ll receive our news soon!');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('There was an error sending the data. Try again');
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
        top: isFixed ? '1600px' : `${Math.min(scrollPos * 0.4 + 100, 500)}px`, 
        transform: `
        rotate(${Math.max(-20, -20 - scrollPos * 0.5)}deg) 
        scaleX(${Math.max(0.85, 1 - scrollPos * 0.001)}) 
        scaleY(${Math.max(0.85, 1 - scrollPos * 0.001)})
        translateX(${Math.min(scrollPos * -0.2, 100)}px)
        
        `,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    const card2_style = {

        position: 'absolute',
        top: isFixed ? '1600px' : `${Math.min(scrollPos * 0.4 + 100, 300)}px`, 
        transform: `
        rotate(${Math.max(0, -10 - scrollPos * 0.1)}deg)
        scaleX(${Math.max(0.7, 1 - scrollPos * 0.001)}) 
        scaleY(${Math.max(0.7, 1 - scrollPos * 0.001)})
        translateX(${Math.min(scrollPos * -0.3, 200)}px)
        
        `,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    const card3_style = {

        position: 'absolute',
        top: isFixed ? '1600px' : `${Math.min(scrollPos * 0.4 + 100, 300)}px`, 
        transform: `
        rotate(${Math.max(-15, -12 - scrollPos * 0.1)}deg)
        scaleX(${Math.max(0.7, 1 - scrollPos * 0.001)}) 
        scaleY(${Math.max(0.7, 1 - scrollPos * 0.001)})
        translateX(${Math.min((scrollPos -300) * -0.4, 100)}px)
        `,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    const card4_style = {

        position: 'absolute',
        top: isFixed ? '1700px' : `${Math.min(scrollPos * 0.4 + 100, 300)}px`, 
        transform: `
        rotate(${Math.max(5, 10 - scrollPos * 0.1)}deg)
        scaleX(${Math.max(0.9, 1 - scrollPos * 0.001)}) 
        scaleY(${Math.max(0.9, 1 - scrollPos * 0.001)})
        translateX(${Math.min(scrollPos * -0.35, 500)}px)
        
        `,
        transition: 'transform 0.2s ease-out, top 0.2s ease-out',

    };

    
  

    return <div className={styles.container}>

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
                <div className={styles.form_texts_div}>
                    <h1 className={styles.form_title}> Skip the FOMO <br></br> GET ON THE LIST! </h1>
                    <h3 className={styles.form_subtitle}> YOUR FEED’S NEVER SEEN THIS BEFORE. <br></br> DROP YOUR EMAIL TO BE PART OF THE NEXT <br></br> BIG THING, NO CAP. </h3>

                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.form_name}
                        type="text"
                        placeholder=" Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className={styles.form_email}
                        type="email"
                        placeholder=" E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className={styles.submit_btn} type="submit"> Join the waitlist  → </button>
                </form>


            </div>

            <div ref={cardsRef} className={styles.cards_div} >
                <Image src={card1} alt="card1" className={styles.card1_} style={card1_style}/>
                <Image src={card2} alt="card2" className={styles.card2_} style={card2_style} />
                <Image src={card3} alt="card3" className={styles.card3_} style={card3_style} />
                <Image src={card4} alt="card4" className={styles.card4_} style={card4_style} />
            </div>

            <div className={styles.info_div}>
                <div className={styles.info1}>
                    <h1>Capture Moments of Kindness</h1>
                    <h2>Share the impact of your help through photos that inspire others</h2>
                </div>
                <div className={styles.info2}>
                    <h1>Build a Community of Care</h1>
                    <h2>Post your experiences and connect with people making a difference</h2>
                </div>
                <div className={styles.info3}>
                    <h1>Inspire Through Your Actions</h1>
                    <h2>Your photos can motivate others to take that first step toward helping</h2>
                </div>
            </div>

            
                
            <div className={styles.bottom_img_div}>
                <Image src={bottom_img} alt="bottom_img" className={styles.bottom_img}/>
            </div>

            
    </div>
}

export default Home