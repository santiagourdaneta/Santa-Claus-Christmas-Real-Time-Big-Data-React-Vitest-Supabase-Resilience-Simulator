import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Santa({ visible }: { visible: boolean }) {
  useEffect(() => {
    if (visible) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffffff', '#00ff00']
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="santa-fly fade-in">
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/225.png" 
        alt="Santa Delibird"
        className="santa-img"
      />
    </div>
  );
}