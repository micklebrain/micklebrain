import './formula.css';

import silverPlay from './images/silver play button.png';
import goldPlay from './images/youtube gold play button.png';
import { Link } from "react-router-dom";

import tiktok from './images/tiktok.png';
import Instagram from './images/instagram-logo.png';

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

// Set the date we're counting down to
var countDownDate = new Date("Jul 4, 2025 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

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

function EmojiDisplay({ count, emoji }) {
  const emojiArray = Array.from({ length: count }, () => emoji);
  return (
    <span>{emojiArray.join('')}</span>
  );
}

function Formula() {
  const [toDo, settoDo] = useState(true);
  const [streaks, setstreaks] = useState(true);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

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

    fetch("https://lostmindsbackend.vercel.app/streaks", {
      method: "GET",
    })
      .then((res) => {
        var output = res.json()
        return output
      }).then((res) => {
        var msg = res.doc;
        var heartsGained = 0;
        res.doc.forEach((myData) => {
          var hearts = Number(myData['hearts']);
          var totalHearts = 0;
          const lastFailed = new Date(myData['lastFailed']);
          console.log('name: ' + myData['name'])
          if (hearts < 3) {
            if (daysSince(lastFailed) > 15) {
              console.log('15 days since');
              heartsGained += 3;
            } else if (daysSince(lastFailed) > 10) {
              console.log('10 days since');
              heartsGained += 2;
            } else if (daysSince(lastFailed) > 5) {
              console.log('5 days since');
              heartsGained += 1;
            }
            console.log("hearts gained: " + heartsGained);
            totalHearts = heartsGained + hearts
            if (totalHearts > 3) {
              totalHearts = 3;
            }
            console.log("total hearts: " + totalHearts);
            fetch("https://lostmindsbackend.vercel.app/refillHearts/" + myData['name'] + '/' + totalHearts, {
              method: "POST",
            })
              .then((res) => {
                var output = res.json()
              })
          }
        })
      })

    fetch("https://lostmindsbackend.vercel.app/streaks", {
      method: "GET",
    })
      .then((res) => {
        var output = res.json()
        return output
      }).then((res) => {
        var msg = res.doc
        const streaks = res.doc
          .sort((firstStreak, secondStreak) => firstStreak.lastFailed > secondStreak.lastFailed ? 1 : -1)
          .map((myData) =>
            <section class="personal-bests__best personal-bests__best--plank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.8 6.91 4.82 7A6 6 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09A6 6 0 0 0 17.18 15c3-.1 4.82-2.7 4.82-7V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.22 12.08 4 9.3 4 8zm14 4.83V6h2v2c0 1.3-.22 4.08-2 4.83z" /></svg>
              <h2>{myData['name']}</h2>
              <p>{new Date(myData['lastFailed']).toLocaleString('en-US', dateOptions)}</p>
              <p>{myData['lastIndulged']}</p>
              <EmojiDisplay count={myData['hearts']} emoji="❤️"></EmojiDisplay>
              {/* <button type="button" onClick={
                () => {
                  fetch("https://lostmindsbackend.vercel.app/restartStreak/" + myData['name'], {
                    method: "POST",
                  })
                    .then((res) => {
                      var output = res.json()
                      return output
                    }).then((res) => {
                    })
                }
              }>🔁</button> */}
            </section>
          );
        setstreaks(streaks)
      })

  }, []);

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
          <a href="#reputation">
            <span class="tag tag-python tag-lg">reputation</span>
          </a>
        </li>
        <li>
          <a href="#vanity">
            <span class="tag tag-python tag-lg">vanity</span>
          </a>
        </li>
        <li>
          <a href="#streaks">
            <span class="tag tag-python tag-lg">streaks</span>
          </a>
        </li>
        <li>
          <a href="#blessings">
            <span class="tag tag-python tag-lg">blessings</span>
          </a>
        </li>
      </ol>

      <h2 id='tasks'>daily tasks</h2>
      <div class='container'>
        <button onClick={restartTasks}>restartTasks</button>
      </div>
      <div>{toDo}</div>

      <div class='health-container'>
        <h2 id='health'>health ❤️</h2>
        <h2>score: 79%</h2>
        <p><span class='stat-neutral'>29</span> years old</p>
        <progress class='ageProgress' value="29" max="120"> 32% </progress>
        <p><span class='stat-neutral'>5'7“</span> height</p>        
        <h2 id='health'>biomarkers</h2>
        {/* <div class="container-heart">
          <img src="http://robozzle.com/igoro/211px-CoeurHumain_svg.gif" class="human-heart" alt="human heart" />
        </div> */}

        <div class='container'>
          <div class="tooltip">Albumin/Globulin Ratio
            <span class="tooltiptext">Albumin/Globulin Ratio</span>
          </div>
          <span class="tag tag-python tag-lg">protein</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="AlbuminGlobulin" max-value="4" name="Albumin/Globulin" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="1.8"></xgui-bar>
        </div>

        <div class='container'>
          <div class="tooltip">Albumin
            <span class="tooltiptext">the largest portion of total blood protein. It transports various metals, drugs, and metabolites throughout the body, including hormones.</span>
          </div>
          <span class="tag tag-python tag-lg">enzyme</span>
          <span class="tag tag-python tag-lg">heart</span>
          <span class="tag tag-python tag-lg">liver</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="Albumin" max-value="7" name="Albumin" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="4.6"></xgui-bar>
        </div>
        <div class='container'>g/dL
        </div>

        <div class='container'>
          <div class="tooltip"> Alkaline Phosphatase
            <span class="tooltiptext">enzyme found primarily in bone and the liver</span>
          </div>
          <span class="tag tag-python tag-lg">enzyme</span>
          <span class="tag tag-python tag-lg">heart</span>
          <span class="tag tag-python tag-lg">liver</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="AlkalinePhosphatase" max-value="5" name="Alkaline Phosphatase" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="2.6"></xgui-bar>
        </div>
        <div class='container'>g/dL
        </div>

        <div class='container'>
          <div class="tooltip"> Aspartate Aminotransferase
            <span class="tooltiptext">enzyme found in the liver and in cardiac and skeletal muscle</span>
          </div>
          <span class="tag tag-python tag-lg">enzyme</span>
          <span class="tag tag-python tag-lg">liver</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="AspartateAminotransferase" max-value="50" name="Aspartate Aminotransferase" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="21"></xgui-bar>
        </div>
        <div class='container'> U/L
        </div>

        <div class='container'>
          <div class="tooltip"> Aspartate Aminotransferase
            <span class="tooltiptext"> enzyme produced primarily in the liver, skeletal and heart muscle</span>
          </div>
          <span class="tag tag-python tag-lg">enzyme</span>
          <span class="tag tag-python tag-lg">heart</span>
          <span class="tag tag-python tag-lg">liver</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="AspartateAminotransferase" max-value="50" name="Aspartate Aminotransferase" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="18"></xgui-bar>
        </div>
        <div class='container'> U/L
        </div>

        <div class='container'>
          <div class="tooltip"> bilirubin
            <span class="tooltiptext">main pigment in bile and a major product of normal red cell breakdown</span>
          </div>
          <span class="tag tag-python tag-lg">liver</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="bilirubin" max-value="1.5" name="bilirubin" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="1.3"></xgui-bar>
        </div>
        <div class='container'> uL
        </div>

        <ul class="tree">
          <li>
            <details open>
              <summary><div class='container'>
                <div class="tooltip"> cholesterol (total)
                  <span class="tooltiptext">protein in red blood cells that carries oxygen from the lungs to the body's tissues and organs, and returns carbon dioxide to the lungs</span>
                  <span class="tag tag-python tag-lg">liver</span>
                  <span class="tag tag-python tag-lg">blood</span>
                  <span class="tag tag-python tag-lg">cell</span>
                </div>
              </div></summary>
              <div class="gui-container">
                <xgui-bar id="health" max-value="250" name="cholesterol (total)" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="180"></xgui-bar>
              </div>
              <div class='container'> mg/dL <br></br>
              </div>
              <ul>
                <li>
                  <details>
                    <summary>HDL (good cholesterol)</summary>
                    <div class="gui-container">
                      <xgui-bar id="HDL" max-value="80" name="HDL (good cholesterol)" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="50"></xgui-bar>
                    </div>
                    <div class='container'> mg/dL <br></br>
                    </div>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>LDL (bad cholesterol)</summary>
                    <div class="gui-container">
                      <xgui-bar id="LDL" max-value="200" name="LDL (bad cholesterol)" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="110"></xgui-bar>
                    </div>
                    <div class='container'> mg/dL <br></br>
                    </div>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>triglycerides</summary>
                    <div class="gui-container">
                      <xgui-bar id="triglycerides" max-value="600" name="triglycerides" origin="left" thresholds="0:var(--hud-color)|10:var(--hud-color)|20:var(--hud-color)" value="101"></xgui-bar>
                    </div>
                    <div class='container'> mg/dL <br></br>
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
          <xgui-bar id="creatinine" max-value="1" name="creatinine" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="0.79"></xgui-bar>
        </div>
        <div class='container'>
          mg/dL
        </div>

        <div class='container'>
          <div class="tooltip">globulin
            <span class="tooltiptext">The globulins are a group of about 60 different proteins that are part of the immune system, which helps to fight and prevent infections</span>
          </div>
          <span class="tag tag-python tag-lg">immune system</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="globulin" max-value="5" name="globulin" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="2.6"></xgui-bar>
        </div>
        <div class='container'>
          mg/dL
        </div>

        <div class='container'>
          <div class="tooltip"> glucose (fasting)
            <span class="tooltiptext">sugar found in blood</span>
          </div>
          <span class="tag tag-python tag-lg">sugar</span>
          <span class="tag tag-python tag-lg">insulin</span>
          <span class="tag tag-python tag-lg">carbohydrate</span>
          <span class="tag tag-python tag-lg">blood</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="glucose" max-value="130" name="glucose (fasting)" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="81"></xgui-bar>
        </div>
        <div class='container'>
          mg/dL
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

        <div class='container'>
          <div class="tooltip"> hemoglobin A1c
            <span class="tooltiptext">measures the average amount of blood sugar (glucose) level</span>
          </div>
          <span class="tag tag-python tag-lg">iron</span>
          <span class="tag tag-python tag-lg">red blood cell</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="hemoglobin" max-value="8" name="hemoglobin" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="5.3"></xgui-bar>
        </div>
        <div class='container'>%</div>

        <div class='container'>
          <div class="tooltip"> hs-CRP
            <span class="tooltiptext">C-reactive protein is made by the liver in response to infection, tissue injury or inflammation.</span>
          </div>
          <span class="tag tag-python tag-lg">liver</span>
          <span class="tag tag-python tag-lg">inflammation</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="hs-CRP" max-value="1" name="hs-CRP" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="0.2"></xgui-bar>
        </div>
        <div class='container'>mg/L</div>

        <div class='container'>
          <div class="tooltip"> protein (Total)
            <span class="tooltiptext">has two main components—albumin and globulin</span>
          </div>
          <span class="tag tag-python tag-lg">liver</span>
          <span class="tag tag-python tag-lg">kidney</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="protein" max-value="10" name="protein" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="7.2"></xgui-bar>
        </div>
        <div class='container'>g/dL</div>

        <div class='container'>
          <div class="tooltip"> red blood cell count
            <span class="tooltiptext">cells in the blood that carry oxygen from the lungs to the body's tissues</span>
          </div>
          <span class="tag tag-python tag-lg">blood</span>
          <span class="tag tag-python tag-lg">iron</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="rbc" max-value="7000000" name="red blood cell count" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="5070000"></xgui-bar>
        </div>
        <div class='container'> mm3
        </div>

        <div class='container'>
          <div class="tooltip"> specific gravity
            <span class="tooltiptext">amount of substances in the urine.</span>
          </div>
          <span class="tag tag-python tag-lg">kidney</span>
          <span class="tag tag-python tag-lg">hydration</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="hspecificgravity" max-value="5" name="specific gravity" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="1.015"></xgui-bar>
        </div>

        <div class='container'>
          <div class="tooltip"> urine pH
            <span class="tooltiptext">acidity or alkalinity of urine</span>
          </div>
          <span class="tag tag-python tag-lg">kidney</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="protein" max-value="10" name="protein" origin="left" thresholds="0:255,0,0|10:255,165,0|20:var(--hud-color)" value="6"></xgui-bar>
        </div>
        <div class='container'>pH</div>

        <div class='container'>
          <div class="tooltip"> white blood cell count
            <span class="tooltiptext">cells in the body's immune system that help fight infections and disease</span>
          </div>
          <span class="tag tag-python tag-lg">immunity</span>
          <span class="tag tag-python tag-lg">blood</span>
        </div>
        <div class="gui-container">
          <xgui-bar id="wbc" max-value="12000" name="white blood cell count" origin="left" thresholds="0:255,165,0|10:255,165,0|20:255,165,0" value="3300"></xgui-bar>
        </div>
        <div class='container'> uL
        </div>

        <h2 id='routines'>Routines 🔁</h2>
        <div class='content'>
          {/* <div class="alert alert-danger alert-white rounded">
              <div class="icon"><i class="fa fa-times-circle">🚨</i></div> */}
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue blood test | $150 min | 🩸 | last - March 18, 2025
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue urine test | last - March 18, 2025
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue STI / STD test | 🦠 | last - April 17, 2024
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue pedicure | 🦶 | last - March 10, 2025
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> teeth cleaned | 🦷 | last - Febuary 7, 2025
          </div>
        </div>

        <h2 id='dangers'>Dangers ⚠️</h2>
        <div class='content'>
          <div class="alert alert-danger alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> runners right knee | 🦵
          </div>          
          <div class="alert alert-danger alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> broken left & right toenail | 🦶
          </div>
          <div class="alert alert-danger alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🚨</i></div>
            <strong>critical!</strong> right foot muscle tear | plantarfascia muscle? | 🦶
          </div>
        </div>
        <p><span class='stat-neutral'>20</span> pound curl</p>
      </div>

      <div class='finance-container'>
        <h2 id='finance'>finance 🏦</h2>
        <h2>score: 42%</h2>
        
        <p> net worth <span class="free-space">287k of 300k</span></p>
        <meter value="287" min="0" max="300" title="DOLLAR">
          {/* <div class="meter-gauge">
            <span style="width: 46.42%;">Disk Usage - 55.93GB out of 120GB</span>
          </div> */}
        </meter>

        <ul class="swatch">
          <li class="swatch__elem">loans <span class="used-space">210 k</span></li>
          <li class="swatch__elem">stocks <span class="used-space">50 k</span></li>
          <li class="swatch__elem">crypto <span class="used-space">5 k</span></li>
          <li class="swatch__elem">real estate <span class="used-space">20 k</span></li>
          <li class="swatch__elem">forex <span class="used-space">2 k</span></li>
        </ul>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div class="box">
          <div class="box__header">
            <h3 class="box__header-title">SoLo Funds</h3>
          </div>
          <div class="box__body">
            <div class="stats stats--main">
              <div class="stats__amount">$25,000</div>
              <div class="stats__caption">tips</div>
              <div class="stats__change">
                <div class="stats__value stats__value--positive">+11%</div>
                <div class="stats__period">biweekly</div>
              </div>
            </div>
            <div class="stats">
              <div class="stats__amount">500</div>
              <div class="stats__caption">funded</div>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="box__header">
            <h3 class="box__header-title">Stocks</h3>
          </div>
          <div class="box__body">
            <div class="stats stats--main">
              <div class="stats__amount">$4,713.68</div>
              <div class="stats__caption">realized P&L</div>
            </div>
            <div class="stats">
              <div class="stats__amount">-$3,259.13</div>
              <div class="stats__caption">open P&L</div>
            </div>
            <div class="stats">
              <div class="stats__amount">383</div>
              <div class="stats__caption">positions</div>
            </div>
          </div>
        </div>

        <h3>crypto coins owned</h3>
        <div class="progress-bg">
          <div class="progress-bar">
            <h3 class="raised">75&nbsp;</h3>
          </div>

          <h3 class="goal">Goal: 100</h3>
        </div>

        <br></br>

        <div class="alert alert-info alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
          <strong>locked</strong> purchased mom house 🏡 | $400,000 | $60,000 down payment
        </div>
        <div class="alert alert-info alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
          <strong>locked</strong> purchased LA home 🏡 | $1,000,000 | $150,000 down payment
        </div>
        <div class="alert alert-info alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
          <strong>locked</strong> purchased Tokyo home 🏡 | $500,000 | $75,000 down payment
        </div>
        <div class="alert alert-info alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
          <strong>locked</strong> Amex black card
        </div>

      </div>

      <div class='reputation-container'>
        <h2 id='reputation'>reputation</h2>
          
        <h2>score: 0%</h2>

        <h3>social 📱</h3>
        <h4>Youtube subscribers</h4>
        <div class="progress-bg">
          <div class="progress-bar">
            <h3 class="raised">14&nbsp;</h3>
          </div>
          <h3 class="goal">Goal: 100</h3>
        </div>

        <h4>Youtube play button</h4>
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

        <h4>Instagram followers <img class="icon" src={Instagram} alt="Instagram" /></h4>
        <div class="progress-bg">
          <div class="progress-bar">
            <h3 class="raised">20,500&nbsp;</h3>
          </div>
          <h3 class="goal">Goal: 50,000</h3>
        </div>

        {/* <div class="alert alert-success alert-white rounded">
        <div class="icon"><i class="fa fa-times-circle">✅</i></div>
        <strong>congrats!</strong> Meta verified
      </div> */}

        {/* <div class="grid-area-3">
          <div class="personal-bests">
            <section class="personal-bests__best personal-bests__best--run">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.8 6.91 4.82 7A6 6 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09A6 6 0 0 0 17.18 15c3-.1 4.82-2.7 4.82-7V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.22 12.08 4 9.3 4 8zm14 4.83V6h2v2c0 1.3-.22 4.08-2 4.83z" /></svg>
              <h2>Meta</h2>
              <p>verified</p>
            </section>
          </div>
        </div> */}


        <h4>Twitch followers <img class="icon" src={tiktok} alt="Twitch" /></h4>
        <div class="progress-bg">
          <div class="progress-bar">
            <h3 class="raised">3&nbsp;</h3>
          </div>
          <h3 class="goal">Goal: 100</h3>
        </div>

        <h4>TikTok followers <img class="icon" src={tiktok} alt="tikTok" /></h4>
        <div class="progress-bg">
          <div class="progress-bar">
            <h3 class="raised">162&nbsp;</h3>
          </div>
          <h3 class="goal">Goal: 500</h3>
        </div>
      </div>

      <div class='vanity-container'>
        <h2 id='vanity'>vanity</h2>

        <h2>score: 0%</h2>

        <div class="alert alert-info alert-white rounded">
          <div class="icon"><i class="fa fa-times-circle">🔘</i></div>
          <strong>locked</strong> obtained hot abg girlfriend 👯‍♀️
        </div>

        <h4>N JLPT level</h4>
        <div class="container">
          <ol class="progress-meter">
            <li class="progress-point done">5</li>
            <li class="progress-point todo">4</li>
            <li class="progress-point todo">3</li>
            <li class="progress-point todo">1</li>
          </ol>
        </div>

        <h4>Japan visa</h4>
        <div class="container">
          <ol class="progress-meter">
            <li class="progress-point done">3 month tourist</li>
            <li class="progress-point todo">1 yr designated activities</li>
            <li class="progress-point todo">2 years student</li>
            <li class="progress-point todo">permanant residency</li>
          </ol>
        </div>

        <h4>TOPIK level</h4>
        <div class="container">
          <ol class="progress-meter">
            <li class="progress-point done">1</li>
            <li class="progress-point todo">2</li>
            <li class="progress-point todo">3</li>
            <li class="progress-point todo">5</li>
          </ol>
        </div>

        <h4>Korea visa</h4>
        <div class="container">
          <ol class="progress-meter">
            <li class="progress-point done">3 month tourist</li>
            <li class="progress-point todo">F-2 resident</li>
            <li class="progress-point todo">F-5 permanant resident</li>
            <li class="progress-point todo">F-6 marriage</li>
          </ol>
        </div>

        <p><span class='stat-neutral'>21st</span> floor home</p>
      </div>

      <h2 id='streaks'>streaks 🔥</h2>
      <div class="grid-area-3">
        <div class="personal-bests">
          {streaks}
        </div>
      </div>

      <h2 id='blessings'>blessings 🙏🏻</h2>
      <div class="accordion">
        <input type="checkbox" name="collapse" id="handle1" ></input>
        <h2 class="handle">
          <label for="handle1">blessings 🙏🏻</label>
        </h2>
        <div class="content">
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> alive
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !lung cancer | 🫀 | 6.7% chance
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !liver cancer | 🫀 | 1.2% chance
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !tumor found | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !Huntington’s disease | 🫀 |  0.01%
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !incurable Hepatitis B | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !incurable Herpes | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !incurable HIV | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !incurable HPV | STI | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !Alzheimer's disease | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !diabetes | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !leukemia | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !obese | 🫀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !bald | 👱‍♂️
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue eyebrows wax | last - March 12, 2024 🤨
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !overdue haircut | last - April 10, 2024 💈
          </div>

          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !paying child support | 💵
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !loans | 💵
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !crippling debt | 💵
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !homeless | 🏡
          </div>

          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !divorced | 🫂
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !lawsuits | 👮
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !incarcerated | 👮
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !banned from countries | 🌎
          </div>

          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> !amputee 🦿
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> can walk 🦵
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> can see 👀
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> can hear 👂
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> can talk 🗣️
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> American | 🇺🇸
          </div>
          <div class="alert alert-danger-avoided alert-white rounded">
            <div class="icon"><i class="fa fa-times-circle">🙏🏻</i></div>
            <strong>blessed!</strong> living Los Angeles | 🇺🇸
          </div>

        </div>
      </div>

      <h2>until 30</h2>
      <h3 id="demo"></h3>

      <h1>Team</h1>
      <p>PR manager - vacant</p>
      <p>dating coach - vacant</p>
      <p>photographer - vacant</p>

    </div>
  );
}

export default Formula;