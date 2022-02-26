import { Link } from "react-router-dom";

import atlanta from './images/atlanta.jpeg';
import chicago from './images/chicago.jpeg';
import denver from './images/denver.jpeg';
import lasvegas from './images/lasvegas.jpeg';
import philadelphia from './images/philadelphia.jpeg';
import sanfrancisco from './images/sanfrancisco.jpeg';
import seattle from './images/seattle.jpeg';
import toronto from './images/toronto.jpeg';
import newyorkcity from './images/newyorkcity.jpeg';
import washingtonDC from './images/washingtonDC.jpg';

function Home() {

  var itinerary = ['Park', 'Club', 'Skydeck'];

  return (
    <div className="App">
      <h1> Borders gone </h1>
      <div class="column-main">        
        <Link to="/atlanta" class="articlePreview"> <img class="articleImage" src={atlanta} alt="Atlanta" /> </Link> <div> <div class="articleTitle"> Atlanta </div> </div>
        <Link to="/denver" class="articlePreview"> <img class="articleImage" src={denver} alt="Denver" /> </Link> <div> <div class="articleTitle"> Denver </div> </div>
        <Link to="/newyorkcity" class="articlePreview"> <img class="articleImage" src={newyorkcity} alt="New York City" /> </Link> <div> <div class="articleTitle"> New York City </div> </div>
        <Link to="/sanfrancisco" class="articlePreview"> <img class="articleImage" src={sanfrancisco} alt="San Francisco" /> </Link> <div> <div class="articleTitle"> San Francisco </div> </div>
        <Link to="/toronto" class="articlePreview"> <img class="articleImage" src={toronto} alt="Toronto" /> </Link> <div> <div class="articleTitle"> Toronto </div> </div>
      </div>
      <div class="column-main">
        <Link to="/chicago" class="articlePreview"> <img class="articleImage" src={chicago} alt="Chicago" /> </Link> <div> <div class="articleTitle"> Chicago </div> </div>
        <Link to="/lasvegas" class="articlePreview"> <img class="articleImage" src={lasvegas} alt="Las Vegas" /> </Link> <div> <div class="articleTitle"> Las Vegas </div> </div>
        <Link to="/philadelphia" class="articlePreview"> <img class="articleImage" src={philadelphia} alt="Philadelphia" /> </Link> <div> <div class="articleTitle"> Philadelphia </div> </div>
        <Link to="/seattle" class="articlePreview"> <img class="articleImage" src={seattle} alt="Seattle" /> </Link> <div> <div class="articleTitle"> Seattle </div> </div>
        <Link to="/washingtonDC" class="articlePreview"> <img class="articleImage" src={washingtonDC} alt="Washington DC" /> </Link> <div> <div class="articleTitle"> Washington DC </div> </div>
      </div>

      {/* <h2> Food delivery promo codes </h2>
      <ul>
        <li> Uber eats promo code: eats-sxnvv </li>
        <li> Grubhub invite link: https://www.grubhub.com/referral/3c840580-6470-11e8-b9ea-43abd66f1334?utm_source=grubhub.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_</li>
        <li> Seamless: https://www.seamless.com/referral/f170c1e0-4e7d-11ec-9f09-d3949d14d0dd?utm_source=seamless.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_ </li>
      </ul> */}
      
      {/* {itinerary.join(', ')} */}
      
    </div>
  );
}

export default Home;