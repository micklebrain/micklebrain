import './formula.css';

import silverPlay from './images/silver play button.png';
import goldPlay from './images/youtube gold play button.png';
import { Link } from "react-router-dom";

function Formula() {
  return (
    <div>
      <h1>health biomarkers ❤️</h1>
      <p><span class='stat-neutral'>29</span> years old</p>
      <progress class='ageProgress' value="29" max="120"> 32% </progress>
      <p><span class='stat-neutral'>5'7“</span> height</p>
      <p><span class='stat-good'>179 mg/dL</span> total cholesterol</p>
      <p><span class='stat-good'>14.8 g/dL</span> hemoglobin</p>
      <p><span class='stat-good'>5.07 * 10^6/mm3</span> red blood cell count</p>
      <p><span class='stat-good'>4.78 * 10^3/mm3</span> white blood cell count</p>
      <p><span class='stat-good'>98 mg/dl</span> triglycerides</p>
      <p><span class='stat-good'>0</span> times contracted incurable Hepatitis B</p>
      <p><span class='stat-good'>0</span> times contracted incurable Herpes</p>
      <p><span class='stat-good'>0</span> times contracted incurable HIV</p>
      <p><span class='stat-good'>0</span> times contracted incurable HPV</p>
      <p><span class='stat-neutral'>20</span> pound curl</p>
      <h1>finance 💵</h1>
      <p><span class='stat-good'>$250,000 </span> net worth | next goal: $300,000</p>
      <p><span class='stat-good'>450</span> # SoLo loans funded</p>
      <p><span class='stat-good'>$200,000 - $210,000</span> $ SoLo loans funded</p>
      <p><span class='stat-good'>$25,000</span> SoLo tips</p>
      <p><span class='stat-bad'>341</span> <span class='small'>/ 3000</span> stocks owned</p>
      <h1>social 📱</h1>
      <p><span class='stat-bad'>12</span> Youtube subscribers</p>
      {/* <img class="icon" src={silverPlay} alt="silverPlay"/>
      <img class="icon" src={goldPlay} alt="goldPlay"/> */}
      <p><span class='stat-bad'>17,500</span> Instagram followers | next goal: 50,000</p>
      <p><span class='stat-bad'>4</span> Twitch followers</p>
      <p><span class='stat-bad'>162</span> TikTok followers | next goal: 1,000</p>
      <h1>vanity</h1>
      <p><span class='stat-neutral'>21st</span> floor home</p>
      <p><span class='stat-bad'>5</span> <span class='small'>4 3 2 1</span> N JLPT level</p>
      <p><span class='stat-bad'>3 month tourist</span> <span class='small'>6 month digital nomad 2 years student permanant residency</span> Japan visa</p>
      <p><span class='stat-bad'>1</span> <span class='small'>2 3 4 5</span> TOPIK level</p>
    </div>
  );
}

export default Formula;