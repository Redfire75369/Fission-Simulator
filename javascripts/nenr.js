const nenrArray = [
	["News brought to you by Nuclear Experimental News Array, in partnership with Hevipelle.", true],
	["Don't worry, you'll cause more :.|:; eventually", true],
	["Colonel Rhdmskyh looked over the horizon.            There was nothing abnormal happening. There were no nuclear explosions, no radioactive waste leaking out, only the beautiful skyline of the city of Yhwisirk.        He did not expect for it to change so suddenly, as an experiment was interfered. “Colonel! The nuclear lab-” The messenger’s voice was quickly drowned out by a shattering just a few miles away. The silhouette of a mushroom cloud could be seen in the distance. “Colonel, you know the experiment with the nucleosynthesis thing?  It was sabotaged.” The colonel froze. Sabotaged? It was the first time in millennia that the Universal Nucleosynthesis Experiment had been sabotaged. More distant explosions could be heard. “I shall attend a meeting with the council members on this matter immediately,” he proclaimed. And it was done. “Colonel Rhdmskyh Swasikova of legion 8e4 at celestial body 478-X3E, report on the situation at 478-X3E immediately.” “Instructions clear, O8-CXVI. The Universal Nucleosynthesis Experiment has been sabotaged. Current situation 58,976 dead, 890,578 injured. 5 facilities were destroyed.” An awkward silence followed. O8-LIV could be heard typing vigorously. “I have compiled a list of civilizations that don’t have the best relationship with us humans. The most likely suspect would be the zalgans. Colonel, I expect you to have your army on your way to celestial body  580-Z8L immediately.”", true]
];

var s = document.getElementById('nenr');
document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextNENR();}}, false);
var scrollTimeouts = [];
var nextMsgIndex;

function scrollNextNENR() {
  //select a message at random
  try {
    do {nextMsgIndex = Math.floor(Math.random() * nenrArray.length)} while (!eval(nenrArray[nextMsgIndex][1]))
  } catch(e) {
      console.log("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  //set the text
  s.textContent = nenrArray[nextMsgIndex][0];

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
    let rate = 100; //change this value to change the scroll speed
    let transformDuration = dist / rate;


    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextNENR, Math.ceil(transformDuration * 1000)));
  }, 100));
}