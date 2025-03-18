import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Animviz = () => {
  return (
    <div style={{ width: "100%", height: "auto" }}>
  <DotLottieReact
    src="/assets/animchar.lottie"
    style={{ width: '100%', height: '100%' }}
    loop
    autoplay
  />
</div>
  );
};
export default Animviz;