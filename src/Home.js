import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <h1> Links </h1>
      <div class='link'> <h1> <a href="https://github.com/micklebrain" target="_blank"> Github repositories </a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.linkedin.com/in/nathanthainguyen/" target="_blank"> Linkedin </a> </h1> </div> 
      <div class='link'>  <h1> <a href="https://opensea.io/collection/micklebrain" target="_blank"> Opensea NFT Collection </a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.patreon.com/micklebrain" target="_blank"> Patreon </a> </h1> </div>
      <div class='link'> <h1> <a href="https://poshmark.com/closet/micklebrain" target="_blank"> Poshmark closet </a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.tiktok.com/@micklebrain" target="_blank"> TikTok </a> </h1> </div>      
      <div class='link'> <h1> <a href="https://twitter.com/micklebrain" target="_blank"> Twitter </a> </h1> </div>
    </div>
  );
}

export default Home;