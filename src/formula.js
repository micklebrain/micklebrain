import './formula.css';

import silverPlay from './images/silver play button.png';
import goldPlay from './images/youtube gold play button.png';
import { Link } from "react-router-dom";

function Formula() {
  return (
    <div>
      <h2>health biomarkers ❤️</h2>
      <p><span class='stat-neutral'>29</span> years old</p>
      <progress class='ageProgress' value="29" max="120"> 32% </progress>
      <p><span class='stat-neutral'>5'7“</span> height</p>
      <ul class="tree">
        <li>
          <details open>
            <summary>179 mg/dL total cholesterol - a waxy, fat-like substance that's found in the blood and cells of the body. cholesterol is essential for good health and is needed to make cell walls, tissues, hormones, vitamin D, and bile acid</summary>
            <ul>
              <li>
                <details>
                  <summary>43 mg/dl HDL (good cholesterol)</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>117 mg/dl LDL (bad cholesterol)</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>98 mg/dl triglycerides</summary>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>14.8 g/dL hemoglobin</summary>
          </details>
        </li>
        <li>
          <details>
            <summary>5.07 * 10^6/mm3 red blood cell count</summary>
          </details>
        </li>
        <li>
          <details>
            <summary>4.78 * 10^3/mm3 white blood cell count</summary>
          </details>
        </li>
      </ul>

      <h2>avoid</h2>
      <div class='content'>
        <div class="alert alert-danger alert-white rounded">

          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable Hepatitis B
        </div>
        <div class="alert alert-danger alert-white rounded">

          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable Herpes
        </div>
        <div class="alert alert-danger alert-white rounded">

          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable HIV
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable HPV
        </div>
      </div>

      <p><span class='stat-neutral'>20</span> pound curl</p>
      <h2>finance 🏦</h2>
      <h2>net worth</h2>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">$250,000&nbsp;</h3>
        </div>

        <h3 class="goal">Goal: $500,000</h3>
      </div>
      <p><span class='stat-good'>450</span> # SoLo loans funded</p>
      <p><span class='stat-good'>$200,000 - $210,000</span> $ SoLo loans funded</p>
      <p><span class='stat-good'>$25,000</span> SoLo tips</p>
      {/* <p><span class='stat-bad'>341</span> <span class='small'>/ 3000</span> stocks owned</p> */}
      <h2>stocks owned</h2>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">341&nbsp;</h3>
        </div>

        <h3 class="goal">Goal: 3,000</h3>
      </div>
      <h2>social 📱</h2>
      <p><span class='stat-bad'>12</span> Youtube subscribers</p>
      {/* <img class="icon" src={silverPlay} alt="silverPlay"/>
      <img class="icon" src={goldPlay} alt="goldPlay"/> */}
      <p><span class='stat-bad'>17,500</span> Instagram followers | next goal: 50,000</p>
      <p><span class='stat-bad'>4</span> Twitch followers</p>
      <p><span class='stat-bad'>162</span> TikTok followers | next goal: 1,000</p>
      <h2>vanity</h2>
      <p><span class='stat-neutral'>21st</span> floor home</p>
      <p><span class='stat-bad'>5</span> <span class='small'>4 3 2 1</span> N JLPT level</p>
      <p><span class='stat-bad'>3 month tourist</span> <span class='small'>6 month digital nomad 2 years student permanant residency</span> Japan visa</p>
      <p><span class='stat-bad'>1</span> <span class='small'>2 3 4 5</span> TOPIK level</p>
    </div>
  );
}

export default Formula;