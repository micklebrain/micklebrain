import { Link } from "react-router-dom";

import github from './images/github.png';
import linkedin from './images/linkedin.png';
import opensea from './images/opensea.png';
import patreon from './images/patreon.png';
import poshmark from './images/poshmark.png';
import tiktok from './images/tiktok.png';
import tumblr from './images/tumblr.png';
import twitter from './images/twitter.png';

function Home() {
  return (
    <div className="App">
      <h1> Links </h1>
      <div class='link'> <h1> <a href="https://github.com/micklebrain" target="_blank"><img class="icon" src={github} alt="github"/>Github repositories</a></h1></div>
      <div class='link'> <h1> <a href="https://www.linkedin.com/in/nathanthainguyen/" target="_blank"><img class="icon" src={linkedin} alt="linkedin"/>Linkedin</a> </h1> </div>
      <div class='link'> <h1> <a href="https://opensea.io/collection/micklebrain" target="_blank"><img class="icon" src={opensea} alt="opensea"/>Opensea NFT Collection</a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.patreon.com/micklebrain" target="_blank"><img class="icon" src={patreon} alt="patreon"/>Patreon</a> </h1> </div>
      <div class='link'> <h1> <a href="https://poshmark.com/closet/micklebrain" target="_blank"><img class="icon" src={poshmark} alt="poshmark"/>Poshmark closet</a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.tiktok.com/@micklebrain" target="_blank"><img class="icon" src={tiktok} alt="tikTok"/>TikTok</a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.tumblr.com/blog/micklebrain" target="_blank"><img class="icon" src={tumblr} alt="tumbler"/>Tumblr</a> </h1> </div>      
      <div class='link'> <h1> <a href="https://twitter.com/micklebrain" target="_blank"><img class="icon" src={twitter} alt="twitter"/>Twitter</a> </h1> </div>
    </div>
  );
}

export default Home;