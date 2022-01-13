import logo from './logo.svg';

import Restaurant from './Restaurant';

function Home() {

  var itinerary = ['Park', 'Club', 'Skydeck'];

  return (
    <div className="App">
      <h1> Micklebrain </h1>
      <h2> Find amazing travel itineraries catered to every city </h2>
      <h2> Food delivery promo codes </h2>
            <ul>
                <li> Uber eats promo code: eats-sxnvv </li>
                <li> Grubhub invite link: https://www.grubhub.com/referral/3c840580-6470-11e8-b9ea-43abd66f1334?utm_source=grubhub.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_</li>
                <li> Seamless: https://www.seamless.com/referral/f170c1e0-4e7d-11ec-9f09-d3949d14d0dd?utm_source=seamless.com&utm_medium=content_owned&utm_campaign=growth_refer-a-friend_share-link&utm_content=promo_ </li>
            </ul>
      {/* {itinerary.join(', ')} */}
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default Home;