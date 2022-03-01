import { Link } from "react-router-dom";

function Home() {

  var itinerary = ['Park', 'Club', 'Skydeck'];

  return (
    <div className="App">
      <h1> Links </h1>
      <div class='link'> <h1> <a href="https://github.com/micklebrain"> Github repositories </a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.linkedin.com/in/nathanthainguyen/"> Linkedin </a> </h1> </div> 
      <div class='link'>  <h1> <a href="https://opensea.io/collection/micklebrain"> Opensea NFT Collection </a> </h1> </div>
      <div class='link'> <h1> <a href="https://www.patreon.com/micklebrain"> Patreon </a> </h1> </div>
      <div class='link'> <h1> <a href="https://poshmark.com/closet/micklebrain"> Poshmark closet </a> </h1> </div>
      <div class='link'> <h1> <a href="https://twitter.com/micklebrain"> Twitter </a> </h1> </div>
    </div>
  );
}

export default Home;