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
            <summary>
              <span class='stat'>
                <div class="tooltip">cholesterol (total)
                  <span class="tag tag-python tag-lg">blood</span>
                  <span class="tag tag-python tag-lg">cell</span>
                  <span class="tooltiptext">a waxy, fat-like substance that's found in the blood and cells of the body, needed to make cell walls, tissues, hormones, vitamin D, and bile acid</span>
                </div>
              </span>
            </summary>
            <div class="gauge-wrapper">
              <div class="gauge four rischio3">
                <div class="slice-colors">
                  <div class="st slice-item"></div>
                  <div class="st slice-item"></div>
                  <div class="st slice-item"></div>
                  <div class="st slice-item"></div>
                </div>
                <div class="needle"></div>
                <div class="gauge-center">
                  <div class="label">mg/dL</div>
                  <div class="number">179</div>
                </div>
              </div>
            </div>
            <span class='gauge-legend-good'><br></br>≤200 mg/dL</span>
            <span class='gauge-legend-bad'>≥200 mg/dL</span>
            <ul>
              <li>
                <details>
                  <summary>43 mg/dl <span class='stat'>HDL</span> (good cholesterol)</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>117 mg/dl <span class='stat'>LDL</span> (bad cholesterol)</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>98 mg/dl <span class='stat'>triglycerides</span></summary>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              <span class='stat'>
                <div class="tooltip">hemoglobin
                  <span class="tag tag-python tag-lg">iron</span>
                  <span class="tag tag-python tag-lg">red blood cell</span>
                  <span class="tooltiptext">a <u>protein</u> in red blood cells that carries oxygen from the lungs to the body's tissues and organs, and returns carbon dioxide to the lungs</span>
                </div> </span>
            </summary>
          </details>
        </li>
        <div class="gauge-wrapper">
          <div class="gauge four rischio3">
            <div class="slice-colors">
              <div class="st slice-item"></div>
              <div class="st slice-item"></div>
              <div class="st slice-item"></div>
              <div class="st slice-item"></div>
            </div>
            <div class="needle"></div>
            <div class="gauge-center">
              <div class="label">g/dL</div>
              <div class="number">14.8</div>
            </div>
          </div>
        </div>
        <span class='gauge-legend-good'><br></br>11.6 - 15 mg/dL</span>
        <span class='gauge-legend-bad'>≤11.6 mg/dL</span>
        <li>
          <details>
            <summary>4.78 * 10^3/mm3 <span class='stat'>white blood cell count</span></summary>
          </details>
        </li>
        <li>
          <details>
            <summary>
              97 mg/dL
              <span class='stat'>
                <div class="tooltip">glucose fasting
                  <span class="tag tag-python tag-lg">sugar</span>
                  <span class="tag tag-python tag-lg">carbohydrate</span>
                  <span class="tag tag-python tag-lg">blood</span>
                  <span class="tag tag-python tag-lg">insulin</span>
                  <span class="tooltiptext">blood sugar after you fast for at least eight hours</span>
                </div> </span>
            </summary>
          </details>
        </li>
      </ul>

      <h2>red blood cell count <span class="tag tag-python tag-lg">blood</span></h2>
      <h3>per microliter</h3>
      <div class="container">
        <input type="radio" class="radio" name="progress2" value="five" id="five"></input>
        <label for="five" class="label">2,000,000</label>

        <input type="radio" class="radio" name="progress2" value="twentyfive" id="twentyfive" ></input>
        <label for="twentyfive" class="label">3,000,000</label>

        <input type="radio" class="radio" name="progress2" value="fifty" id="fifty" ></input>
        <label for="fifty" class="label">4,000,000</label>

        <input type="radio" class="radio" name="progress2" value="seventyfive" id="seventyfive" checked></input>
        <label for="seventyfive" class="label">5,070,000</label>

        <input type="radio" class="radio" name="progress2" value="onehundred" id="onehundred" ></input>
        <label for="onehundred" class="label">6,000,000</label>

        <div class="progress2">
          <div class="progress-bar-2"></div>
        </div>
      </div>

      <h2>avoid</h2>
      <div class='content'>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable Hepatitis B | STI
        </div>
        <div class="alert alert-danger alert-white rounded">

          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable Herpes | STI
        </div>
        <div class="alert alert-danger alert-white rounded">

          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable HIV | STI
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> contracted incurable HPV | STI
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> lung cancer
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> liver cancer
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> Alzheimer's disease
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">ⓧ</i></div>
          <strong>scary!</strong> Huntington’s disease
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