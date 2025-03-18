import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const Animocr = () => {
    return (
         <div style={{ width: "100%", height: "auto" }}>
          <DotLottieReact
            src="/assets/animocr.lottie"
            style={{ width: '100%', height: '100%' }}
            loop
            autoplay
          />
        </div>
      );
}

export default Animocr