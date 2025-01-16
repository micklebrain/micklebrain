import './formula.css';

import silverPlay from './images/silver play button.png';
import goldPlay from './images/youtube gold play button.png';
import { Link } from "react-router-dom";

import tiktok from './images/tiktok.png';

import React, { useState, useEffect } from "react";

function toCamelCase(string) {
  return string.replace(/-([a-z])/g, (string) => string[1].toUpperCase());
}

// -----------------------------------------------------------------------------

const XguiBarTemplate = document.createElement("template");
XguiBarTemplate.innerHTML = `
<style>
  :host {

    /* CONFIGURATION - BEGIN ------------------------------------------------ */
    --skew-left: skew( 30deg, 0deg );
    --skew-right: scaleX(-1) skew( 30deg, 0deg );
    --bar-color: var( --hud-color );
    --border-radius: var( --default-border-radius, 0.4rem );
    --border-width: 0.075rem;
    --border-radius-inner: calc( var( --border-radius ) - var( --border-width ) );
    --drop-shadow-size: 0.15rem;
    --element-gap: 1rem;
    --transition-duration: 0.3s;
    /* CONFIGURATION - END -------------------------------------------------- */

    align-items: center;
    box-sizing: border-box;
    display: flex;
    grid-gap: var( --element-gap );
    font-family: sans-serif;
    user-select: none;
  }

  :host([origin=left]) {
    --origin: var( --skew-left );
  }
  :host([origin=left]) .name {
    margin-right: var( --element-gap );
  }
  :host([origin=left]) .value {
    margin-left: var( --element-gap );
  }

  :host([origin=right]) {
    --origin: var( --skew-right );
    flex-direction: row-reverse;
    text-align: right;
  }
  :host([origin=right]) .name {
    margin-left: var( --element-gap );
  }
  :host([origin=right]) .value {
    margin-right: var( --element-gap );
  }

  .host {
    color: rgb( var( --bar-color ) );
    display: contents;
  }

  .name {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  }

  .bar {
    border: var( --border-width ) solid rgba( var( --bar-color ), var( --hud-opacity-primary ) );
    border-radius: var( --border-radius );
    display: flex;
    filter: drop-shadow( 0 0 var( --drop-shadow-size ) rgba( var( --bar-color ), var( --hud-opacity-primary ) ) );
    flex-grow: 1;
    height: 1rem;
    overflow: hidden;
    transform: var( --origin );
    transition: border var( --transition-duration ) linear,
                filter var( --transition-duration ) linear;
  }
  .bar::after,
  .bar::before {
    content: '';
  }
  .bar::after {
    background-color: rgba( var( --bar-color ), var( --hud-opacity-secondary ) );
    border-radius: var( --border-radius-inner );
    box-shadow: calc( var( --border-radius ) * -1 ) 0 0 rgba( var( --bar-color ), var( --hud-opacity-primary ) );
    flex-grow: 1;
    transition: box-shadow var( --transition-duration ) linear;
  }
  .bar::before {
    background-color: rgba( var( --bar-color ), var( --hud-opacity-primary ) );
    border-radius: var( --border-radius-inner ) 0 0 var( --border-radius-inner );
    max-width: 100%;
    transition: background-color var( --transition-duration ) linear,
                width var( --transition-duration ) linear;
    width: calc( 100% / var( --max-value, 100 ) * var( --value, 0 ) );
  }
  .value {
    transition: color var( --transition-duration ) linear;
    width: calc( var( --value-width-in-ch ) * 1ch );
  }

  @media screen and ( max-width: 600px ) {
    .name {
      display: none;
    }
  }
</style>

<span class="host">
  <div class="name"></div>
  <div class="bar"></div>
  <div class="value"></div>
</span>
`;

class XguiBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(XguiBarTemplate.content.cloneNode(true));

    this.$ = (selector) => this._shadowRoot.querySelector(selector);
    this.$host = this.$(".host");
    this.$name = this.$(".name");
    this.$value = this.$(".value");

    this.default = {
      maxValue: 100,
      thresholdAbsoluteValues: false,
      value: 0
    };
    this.thresholdContainer = new Map();
    this.$host.style.setProperty(
      "--value-width-in-ch",
      this.default.maxValue.length
    );
  }

  static get observedAttributes() {
    return [
      "name",
      "max-value",
      "thresholds",
      "threshold-absolute-values",
      "value"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[toCamelCase(name)] = newValue;
    this.$host.style.setProperty(`--${name}`, newValue);

    if (this.value && this.parseThresholds(this.thresholds)) {
      this.setBarColorWithThresholds();
    }

    if (name == "max-value") {
      this.$host.style.setProperty("--value-width-in-ch", this.maxValue.length);
    }

    if (name == "name") {
      this.$name.innerText = newValue;
    }

    if (name == "value") {
      this.$value.innerText = newValue;
    }
  }

  parseThresholds(thresholdsString) {
    this.thresholdContainer.clear();
    if (!thresholdsString) {
      return false;
    }
    let steps = thresholdsString.split("|");

    steps.forEach((step, index) => {
      let [threshold, color] = step.split(":");
      if (Number.isInteger(Number.parseFloat(threshold || 0))) {
        this.thresholdContainer.set(threshold, color);
      }
    });

    return true;
  }

  setBarColorWithThresholds() {
    let maxValue = this.maxValue || this.default.maxValue,
      value = this.value || this.default.value,
      thresholdAbsoluteValues =
        this.hasAttribute("threshold-absolute-values") ||
        this.default.thresholdAbsoluteValues,
      highestMatchingThreshold;

    this.thresholdContainer.forEach((color, threshold) => {
      let t = Number.parseFloat(threshold),
        v = Number.parseFloat(value);
      if (v >= (thresholdAbsoluteValues ? t : (maxValue / 100) * t)) {
        highestMatchingThreshold = threshold;
      }
    });
    highestMatchingThreshold &&
      this.$host.style.setProperty(
        `--bar-color`,
        this.thresholdContainer.get(highestMatchingThreshold)
      );
  }

  setValue(value) {
    let calculatedNewValue =
      Number.parseFloat(this.value) + Number.parseFloat(value);
    let newValue = Math.max(0, Math.min(calculatedNewValue, this.maxValue));
    this.setAttribute("value", newValue);
    return newValue == calculatedNewValue;
  }
}

// -----------------------------------------------------------------------------

window.customElements.define("xgui-bar", XguiBar);

function daysSince(beginningDate) {
  let date1 = beginningDate;
  let date2 = new Date();

  // Calculating the time difference
  // of two dates
  let Difference_In_Time =
    date2.getTime() - date1.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days =
    Math.round
      (Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days
}

function restartTasks() {
  console.log('task completed');

  fetch("https://lostmindsbackend.vercel.app/restartTasks", {
    method: "GET",
  })
    .then((res) => {
      var output = res.json()
      return output
    }).then((res) => {

    })
}

function Formula() {
  const [toDo, settoDo] = useState(null);

  useEffect(() => {
    fetch("https://lostmindsbackend.vercel.app/demo", {
      method: "GET",
    })
      .then((res) => {
        var output = res.json()
        return output
      }).then((res) => {
        var msg = res.doc
        const listItems = res.doc
          .filter((myData) => myData['isCompleted'] == false)
          .filter((myData) => myData['isDaily'] == true)
          .map((myData) =>
            <button type="button" class="tag tag-todo tag-lg" onClick={
              () => {
                fetch("https://lostmindsbackend.vercel.app/completeTask/" + myData['task'], {
                  method: "POST",
                })
                  .then((res) => {
                    var output = res.json()
                    return output
                  }).then((res) => {

                  })
              }
            }>🎯 {myData['task']}</button>
          );
        settoDo(listItems)
      })
  }, [toDo]);

  return (
    <div>
      <ol class="toc" role="list">
        <li>
          <a href="#tasks">
            <span class="tag tag-python tag-lg">tasks</span>
          </a>
        </li>
        <li>
          <a href="#health">
            <span class="tag tag-python tag-lg">health</span>
          </a>
        </li>
        <li>
          <a href="#finance">
            <span class="tag tag-python tag-lg">finance</span>
          </a>
        </li>
        <li>
          <a href="#dangers">
            <span class="tag tag-python tag-lg">dangers</span>
          </a>
        </li>
        <li>
          <a href="#vanity">
            <span class="tag tag-python tag-lg">vanity</span>
          </a>
        </li>
      </ol>

      <h2 id='tasks'>daily tasks</h2>
      <div class='container'>
        <button onClick={restartTasks}>restartTasks</button>
      </div>
      <div>{toDo}</div>
      <h2 id='health'>health ❤️</h2>
      <p><span class='stat-neutral'>29</span> years old</p>
      <progress class='ageProgress' value="29" max="120"> 32% </progress>
      <p><span class='stat-neutral'>5'7“</span> height</p>
      <h2 id='health'>biomarkers</h2>
      <div class="container-heart">
        <img src="http://robozzle.com/igoro/211px-CoeurHumain_svg.gif" class="human-heart" alt="human heart" />
      </div>
      <ul class="tree">
        <li>
          <details open>
            <summary><div class='container'>
              <div class="tooltip"> cholesterol (total)
                <span class="tag tag-python tag-lg">blood</span>
                <span class="tag tag-python tag-lg">cell</span>
                <span class="tooltiptext">protein in red blood cells that carries oxygen from the lungs to the body's tissues and organs, and returns carbon dioxide to the lungs</span>
              </div>
            </div></summary>
            <div class="gui-container">
              <xgui-bar id="health" max-value="250" name="cholesterol (total)" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="179"></xgui-bar>
            </div>
            <div class='container'> mg/dL <br></br>
            </div>
            <ul>
              <li>
                <details>
                  <summary>HDL (good cholesterol)</summary>
                  <div class="gui-container">
                    <xgui-bar id="HDL" max-value="80" name="HDL (good cholesterol)" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="43"></xgui-bar>
                  </div>
                  <div class='container'> mg/dl <br></br>
                  </div>
                </details>
              </li>
              <li>
                <details>
                  <summary>LDL (bad cholesterol)</summary>
                  <div class="gui-container">
                    <xgui-bar id="LDL" max-value="200" name="LDL (bad cholesterol)" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="117"></xgui-bar>
                  </div>
                  <div class='container'> mg/dl <br></br>
                  </div>
                </details>
              </li>
              <li>
                <details>
                  <summary>triglycerides</summary>
                  <div class="gui-container">
                    <xgui-bar id="triglycerides" max-value="600" name="triglycerides" origin="left" thresholds="0:var(--hud-color)|10:var(--hud-color)|20:var(--hud-color)" value="98"></xgui-bar>
                  </div>
                  <div class='container'> mg/dl <br></br>
                  </div>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <div class='container'>
        <div class="tooltip"> creatinine
          <span class="tooltiptext">waste product that comes from the digestion of protein in your food and the normal breakdown of muscle tissue</span>
        </div>
        <span class="tag tag-python tag-lg">kidney</span>
      </div>
      <div class="gui-container">
        <xgui-bar id="creatinine" max-value="1" name="creatinine" origin="left" value="0.83"></xgui-bar>
      </div>
      <div class='container'>
        mg/dL
      </div>

      <div class='container'>
        <div class="tooltip"> hemoglobin
          <span class="tooltiptext">protein in red blood cells that carries oxygen from the lungs to the body's tissues and organs, and returns carbon dioxide to the lungs</span>
        </div>
        <span class="tag tag-python tag-lg">iron</span>
        <span class="tag tag-python tag-lg">red blood cell</span>
      </div>
      <div class="gui-container">
        <xgui-bar id="hemoglobin" max-value="18" name="hemoglobin" origin="left" value="14.8"></xgui-bar>
      </div>
      <div class='container'>g/dL</div>

      <div class='container'>
        <div class="tooltip"> glucose (fasting)
          <span class="tooltiptext">sugar found in blood</span>
        </div>
        <span class="tag tag-python tag-lg">blood</span>
        <span class="tag tag-python tag-lg">carbohydrate</span>
        <span class="tag tag-python tag-lg">insulin</span>
        <span class="tag tag-python tag-lg">sugar</span>
      </div>
      <div class="gui-container">
        <xgui-bar id="glucose" max-value="130" name="glucose (fasting)" origin="left" value="87"></xgui-bar>
      </div>
      <div class='container'>
        mg/dL
      </div>

      <h3>white blood cell count
        <span class="tag tag-python tag-lg">blood</span></h3>
      <div class="gui-container">
        <xgui-bar id="wbc" max-value="12000" name="white blood cell count" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="4780"></xgui-bar>
      </div>
      <div class='container'> mm3
      </div>

      <h3>red blood cell count
        <span class="tag tag-python tag-lg">blood</span>
        <span class="tag tag-python tag-lg">iron</span>
      </h3>
      <div class="gui-container">
        <xgui-bar id="rbc" max-value="7000000" name="red blood cell count" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="5070000"></xgui-bar>
      </div>
      <div class='container'> mm3
      </div>

      <div class='container'>
        <div class="tooltip"> hematocrit
          <span class="tooltiptext">percentage of red blood cells in your blood</span>
        </div>
        <span class="tag tag-python tag-lg">red blood cells</span>
      </div>
      <div class="gui-container">
        <xgui-bar id="hct" max-value="100" name="hematocrit" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="42.2"></xgui-bar>
      </div>
      <div class='container'> %
      </div>

      <p><span class='stat-neutral'>20</span> pound curl</p>

      <h2 id='dangers'>Dangers ⚠️</h2>
      <div class='content'>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
          <strong>critical!</strong> overdue teeth clean | $249 min | 🦷
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
          <strong>critical!</strong> broken left toenail | 🦶
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
          <strong>critical!</strong> burning lips | 👄
        </div>
        <div class="alert alert-danger alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
          <strong>critical!</strong> right foot muscle tear | plantarfascia muscle? | 🦶
        </div>
      </div>

      <section class="accordion">
        <input type="checkbox" name="collapse" id="handle1" ></input>
        <h2 class="handle">
          <label for="handle1">potential dangers 🚨</label>
        </h2>
        <div class="content">
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> lung cancer | 🫀 | 6.7% chance
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> liver cancer | 🫀 | 1.2% chance
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> Huntington’s disease | 🫀 |  0.01%
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> contracted incurable Hepatitis B | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> contracted incurable Herpes | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> contracted incurable HIV | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> contracted incurable HPV | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> Alzheimer's disease | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> diabetes | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> leukemia | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> crippling debt | 💵
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> divorced | 🫂
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> overdue pedicure | 🦶
          </div>
        </div>
      </section>

      <div class="alert alert-success alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">✅</i></div>
        <strong>congrats!</strong> {daysSince(new Date("01/12/2025"))} days of no alcohol streak
      </div>
      <div class="alert alert-success alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">✅</i></div>
        <strong>congrats!</strong> {daysSince(new Date("01/15/2025"))} days of no fap streak
      </div>
      <div class="alert alert-success alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">✅</i></div>
        <strong>congrats!</strong> {daysSince(new Date("01/13/2025"))} days of no League of Legends streak
      </div>

      <h2 id='finance'>finance 🏦</h2>
      <h3>net worth</h3>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">$250,000&nbsp;</h3>
        </div>
        <h3 class="goal">Goal: $300,000</h3>
      </div>
      <p><span class='stat-good'>450</span> # SoLo loans funded</p>
      <p><span class='stat-good'>$200,000 - $210,000</span> $ SoLo loans funded</p>
      <p><span class='stat-good'>$25,000</span> SoLo tips</p>

      <div class="alert alert-info alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
        <strong>locked</strong> purchased mom house 🏡 | $400,000 | $100,000 down payment
      </div>
      <div class="alert alert-info alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
        <strong>locked</strong> Amex black card
      </div>

      <h3>stocks owned</h3>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">341&nbsp;</h3>
        </div>

        <h3 class="goal">Goal: 500</h3>
      </div>

      <h1 id='vanity'>vanity</h1>

      <h2>social 📱</h2>
      <h3>Youtube subscribers</h3>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">13&nbsp;</h3>
        </div>
        <h3 class="goal">Goal: 100</h3>
      </div>

      <h3>Youtube play button</h3>
      <div class="container">
        <ol class="progress-meter">
          <li class="progress-point todo">silver (100,000)</li>
          <li class="progress-point todo">gold (1,000,000)</li>
          <li class="progress-point todo">diamond (10,000,000)</li>
          <li class="progress-point todo">red (100,000,000)</li>
        </ol>
      </div>

      {/* <img class="icon" src={silverPlay} alt="silverPlay"/>
      <img class="icon" src={goldPlay} alt="goldPlay"/> */}

      <h3>Instagram followers <img class="icon" src={tiktok} alt="tikTok" /></h3>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">17,500&nbsp;</h3>
        </div>
        <h3 class="goal">Goal: 50,000</h3>
      </div>

      <div class="alert alert-success alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">✅</i></div>
        <strong>congrats!</strong> Meta verified
      </div>
      <p><span class='stat-bad'>4</span> Twitch followers</p>

      <h3>TikTok followers <img class="icon" src={tiktok} alt="tikTok" /></h3>
      <div class="progress-bg">
        <div class="progress-bar">
          <h3 class="raised">162&nbsp;</h3>
        </div>
        <h3 class="goal">Goal: 500</h3>
      </div>

      <p><span class='stat-neutral'>21st</span> floor home</p>

      <h3>N JLPT level</h3>
      <div class="container">
        <ol class="progress-meter">
          <li class="progress-point done">5</li>
          <li class="progress-point todo">4</li>
          <li class="progress-point todo">3</li>
          <li class="progress-point todo">1</li>
        </ol>
      </div>

      <h3>Japan visa</h3>
      <div class="container">
        <ol class="progress-meter">
          <li class="progress-point done">3 month tourist</li>
          <li class="progress-point todo">6 month digital nomad</li>
          <li class="progress-point todo">2 years student</li>
          <li class="progress-point todo">permanant residency</li>
        </ol>
      </div>

      <h3>TOPIK level</h3>
      <div class="container">
        <ol class="progress-meter">
          <li class="progress-point done">1</li>
          <li class="progress-point todo">2</li>
          <li class="progress-point todo">3</li>
          <li class="progress-point todo">5</li>
        </ol>
      </div>
      <h1>Team</h1>
      <p>PR manager - unfilled</p>
      <p>photographer - unfilled</p>
    </div>
  );
}

export default Formula;