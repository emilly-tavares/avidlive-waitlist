import React, { useEffect, useRef} from 'react';
import styles from '../styles/bubbles.module.css';


const Bubbles = () => {
  const bubbleCount = 20; 
  const bubblesCreated = useRef(false); 

  useEffect(() => {
    if (bubblesCreated.current) return; 

    const container = document.getElementById('bubble-container');
    const color1 = '#1cf252'; 
    const color2 = '#FFFFFF'; 

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add(styles.bubble);
      container.appendChild(bubble);
      animateBubble(bubble);
    }

    bubblesCreated.current = true; 
    function animateBubble(bubble) {
      const size = Math.random() * 10 + 5; 
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.position = 'absolute';

      
      bubble.style.backgroundColor = Math.random() > 0.5 ? color1 : color2;

      bubble.style.borderRadius = '50%';

      const x = Math.random() * (window.innerWidth - size); 
      const y = Math.random() * (window.innerHeight - size); 
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;

      
      let directionX = Math.random() > 0.5 ? 1 : -1;
      let directionY = Math.random() > 0.5 ? 1 : -1;
      const speed = Math.random() * 3 + 1;

      function moveBubble() {
        let posX = parseFloat(bubble.style.left);
        let posY = parseFloat(bubble.style.top);

        
        if (posX > window.innerWidth - size || posX < 0) {
          directionX *= -1; 
        }
        if (posY > window.innerHeight - size || posY < 0) {
          directionY *= -1; 
        }

        
        bubble.style.left = `${posX + speed * directionX}px`;
        bubble.style.top = `${posY + speed * directionY}px`;

        requestAnimationFrame(moveBubble);
      }

      moveBubble();
    }
  }, []);

  return <div id="bubble-container" className={styles.container}></div>;
};

export default Bubbles;
