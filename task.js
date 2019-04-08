//*****************************************
//----------variable declaration-----------
//*****************************************

//get references to btns
const yes_consent_btn = document.getElementById('yes-consent-btn');
const no_consent_btn = document.getElementById('no-consent-btn');
const inst_next_btn = document.getElementById('inst-next-btn');
const inst_back_btn = document.getElementById('inst-back-btn');
const save_resp_btn = document.getElementById('save-resp-btn');
const test_sound_btn = document.getElementById('test-sound-btn');

//get references to sliders
const mw_probe_rad_checked = document.querySelector('input[name="mw-probe-rad"]:checked');
const guidance_probe_rad_checked = document.querySelector('input[name="guidance-probe-rad"]:checked');

//get references to slider outputs

//get references to pages
const uw_header = document.getElementById('uw-header');
const uw_logo = document.getElementById('uw-logo');
const info_consent_letter = document.getElementById('info-consent-letter');
const task_inst = document.getElementById('task-inst');
const thought_probe_1 = document.getElementById('thought-probe-1');
const thought_probe_2 = document.getElementById('thought-probe-2');
const decline_to_participate = document.getElementById('decline-to-participate');
const practice_over = document.getElementById('practice-over');
const do_not_refresh = document.getElementById('do-not-refresh');

//get references to stim
const stim = document.getElementById('stim-container');
const the_metronome = document.getElementById('metronome');

//set participant values
const studyid = 'PS-MIG';
const ss_code = getRandomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const condition = getRandomInt(1,2);

//experimental constants
const num_trials = 900;
const num_practice = 18;
const trial_duration = 1300;
const time_to_metronome = trial_duration/2;

//probe information
var num_probes = 18;
var probe_steps = num_trials/num_probes;

//experimental counters
var this_trial = 0;
var this_probe = 0;
var this_block = 0;

//experimental toggles
var probe_avail = true;
var is_practice = true;
var getting_ready = true;
var is_probe = false;

//default data values
var key_pressed = false;
var resp_at = '';
var rt = 'None';
var rt_to_metronome = '';
var omission = 1;
var is_focus = false;

//default other values

//default probe responses
var probe_1_resp = '';
var probe_2_resp = '';

//containers
var timeout_list = [];
var the_stim_list = '';
var the_targ_list = '';

var trial_headers = [
  'ss_code',
  'condition',
  'this_block',
  'this_trial',
  'is_probe',
  'omission',
  'trial_start_time',
  'metronome_at',
  'trial_end_time',
  'resp_at',
  'rt',
  'rt_to_metronome',
  'this_probe',
  'probe_1_resp',
  'probe_2_resp',
  'is_focus'
];

//data holders
var trial_data = '';

//write headers first
for (var i in trial_headers){
  trial_data+=trial_headers[i];
  if (i < trial_headers.length-1){trial_data+=',';}
  else{trial_data+='\n';}
}

//setup modular task instructions
var inst_p1 =
  "<p>In this experiment, you will hear a metronome sound presented at a constant rate</p>"
  +"<p>Your task is to press the SPACEBAR in synchrony with the onset of the metronome, so that you press the spacebar exactly when each metronome sound is presented.</p>"
  +"<p><i>Please click the 'TEST SOUND' button below to ensure you can hear the metronome sound at a comfortable, audible level.</i></p>"
  //+"<button style='display:inline; visibility:visible;'id='test-sound-btn'>Test Sound</button>"
  +"<br><p>Please click the 'Next' button to proceed to the next page of the instructions.</p>";

var inst_p2 =
  "<p>While you are completing this task, you may find yourself thinking about things other than the task. These thoughts are referred to as 'task-unrelated thoughts.' Having task-unrelated thoughts is perfectly normal, especially when one has to do the same thing for a long period of time.</p>"
  +"<p>While you are completing this task, we would like to determine how frequently you are focused on the task and how frequently you are thinking about thoughts that are unrelated to the task. To do this, every once in a while, the task will temporarily stop and you will be presented a thought-sampling screen that will ask you to indicate whether, just before seeing the thought-sampling screen, you were focused on the task or focused on task-unrelated thoughts.</p>"
  +"<p>Please click the 'Next' button to proceed to the next page of the instructions.</p>";

var inst_p3 =
  "<p>Being <b>focused on the task</b> means that, just before the thought-sampling screen appeared, you were focused on some aspect of the task at hand. For example, if you were thinking about your performance on the task, or if you were thinking about when you should make a button press, these thoughts would count as being on-task.</p>"
  +"<p>On the other hand, experiencing <b>task-unrelated thoughts</b> means that you were thinking about something completely unrelated to the task. Some examples of task-unrelated thoughts include thoughts about what to eat for dinner, thoughts about an upcoming event, or thoughts about something that happened to you earlier in the day. Any thoughts that you have that are not related to the task you are completing count as task-unrelated.</p>"
  +"<p>Please click the 'Next' button to proceed to the next page of the instructions.</p>";

var inst_p4 =
  "<p>Importantly, task-unrelated thoughts can occur in cases where <u>you are trying to focus</u> on the task, but your thoughts unintentionally drift to task-unrelated topics, OR they can occur in cases where <u>you are <b>not</b> trying to focus</u> on the task, and you begin to think about task-unrelated topics. When the thought-sampling screen is presented, we will ask you to indicate which (if any) of these two types of task-unrelated thoughts you were experiencing.</p>"
  +"<p>To do this, we will present you with a thought-sampling screen that looks like this:</p>"
  +thought_probe_1.innerHTML
  +"<p>Please click the 'Next' button to proceed to the next page of the instructions.</p>";

var inst_p5 =
  "<p>After providing a response to the first thought-sampling screen, we will present a second screen that will ask you whether your thoughts were <b>moving freely or not</b>. Your thoughts move freely when:</p>"
  +"<p><ul><li>They seem to wander around on their own, ﬂowing from one thing to another</li><li>There is no overarching purpose or direction to your thinking (although there may still be some connection between one thought and the next)</li><li>Images and memories seem to spontaneously come into your mind</li><li>It feels like your thoughts could land on pretty much anything, and they seem to ﬂow with ease</li><li></li></ul></p>"
  +"<p>The second thought-sampling screen will look like this:</p>"
  +thought_probe_2.innerHTML
  +"<p>Please click the 'Next' button to proceed to the next page of the instructions.</p>";

var inst_p6 =
  "<p>We will now begin a few practice trials to help you become familiar with the task.</p>"
  +"<p>Please feel free to click 'back' to review the task instructions</p>"
  +"<p>When you are ready to begin the practice trials, please click the 'Begin Practice' button below.</p>";

var inst_pg_list = new Array(inst_p1,inst_p2,inst_p3,inst_p4,inst_p5,inst_p6);
var this_inst_pg = 0;
var max_inst_pg = inst_pg_list.length;

var motiv_instructions =
  "<p><b>Before you begin, there is one more thing you should know.</b></p>"
  +"<p>As you know, this task will 40 minutes to complete. Depending on how well you do on the task, you may be able to finish about halfway through the task while still earning the full remuneration.</p>"
  +"<p>To determine whether you get to finish early, during the task, the computer will monitor your performance on the task. After about 20 minutes, the task will temporarily stop, and the computer will compute your overall performance on the task up until that point, and then you will be notified if you have achieved a high enough level of performance to finish study early while still receiving the full remuneration. If you do not achieve a high enough level of performance on the task, then you will have to complete the task for the full duration (40 minutes), as advertised.</p>"
  +"<p>One thing that is very important to note is that your responses about thought-sampling screens WILL NOT be considered when the computer analyzes your performance on the task, so please be completely honest when responding to the thought-sampling questions. In theory, you could be not focused on the task 100% of the time but still finish early if your performance on the task is good enough  -- i.e., we only care about your performance on the task, NOT how frequently you report that you were focused or not focused.</p>"
  +"<p>So once again, I want to reiterate that your responses to the thought-sampling questions WILL NOT be used to determine whether you have achieved a high enough level of performance, so please provide accurate responses to the thought-sampling questions!</p>";

if (condition == 2 ){
  practice_over.innerHTML =
    "<p>The practice trials are now over.</p>"
    +motiv_instructions
    +"<p>When you are ready to begin the experiment, please click the 'Begin Task' button below</p>";
}

//*****************************************
//-------------define functions------------
//*****************************************

function showPage(doc_ele){
	doc_ele.style.visibility ='visible';
	doc_ele.style.display='inline';
}

function hidePage(doc_ele){
	doc_ele.style.visibility ='hidden';
	doc_ele.style.display='none';
}

function getRandomString(length, chars){
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}

function getRandomInt(min, max){
  //random number between min (inclusive) and max (inclusive)
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInArray(value, array){return array.indexOf(value) > -1;}

function generateProbes(num_probes,in_blocks_of){
	var min = 0;
	var max = in_blocks_of-1;
	var probe_list = new Array();

	for (var i=0;i<num_probes;i++){
		var thisValue = Math.floor(Math.random()*(max-min+1))+min; //min max included
		probe_list.push(thisValue);
		min = min + in_blocks_of;
		max = max + in_blocks_of;
	}
	return probe_list
}

//a function to stop all tracked timeouts
function stopTrackedTimeouts(){
  for (var i = 0; i < timeout_list.length; i++){
    clearTimeout(timeout_list[i]);
  }
  timeout_list = [];
}

//a function to stop all timeouts
function stopAllTimeouts(){
  var id = window.setTimeout(null,0);
  while (id--){
    window.clearTimeout(id)
  }
}

//a function to hide all display elements (here, divs and btns)
function hideAllDivs(){
  var divs = document.getElementsByTagName('div');
  var btns = document.getElementsByTagName('button');
  for (var i = 0; i < divs.length; i++){
    hidePage(divs[i]);
  }

  for (var i = 0; i < btns.length;i++){
    hidePage(btns[i]);
  }
  hidePage(uw_header);
}


//reset default slider values
function resetInputValues(){
  ele = document.getElementsByTagName('input');
  for (var i = 0; i < ele.length; i++){
    ele[i].checked = false;
  }
}

//initial get ready message
function getReady(){
  hideAllDivs();
  stim.innerHTML = "<p style='font-size:14pt;'>Get Ready...</p>";
  showPage(stim);
  getting_ready = true;
  timeout_list.push(setTimeout(runTrial,trial_duration));
}

var trial_starttime = '';
var metronome_at = '';
var trial_endtime = '';

//main trial loop
function runTrial(){
  if(getting_ready){hidePage(stim);getting_ready=false;}
  //practice over?
  if (is_practice && this_trial == num_practice){endPractice();}
  //experiment over?
  else if (!is_practice && this_trial == num_trials){submitData();}
  //else do trial
  else{doTrial();}
}

//actual trial component
function doTrial(){
  //reset relevant values
  key_pressed = false;
  resp_at = '';
  rt = 'None';
  omission = 1;
  probe_1_resp,probe_2_resp = '';

  //clear tracked timeouts, and check for/clear rogue timeouts
  stopTrackedTimeouts();
  stopTrackedTimeouts();

  //check if probe trial
  is_probe = isInArray(this_trial,probe_list);

  //get event time
  trial_starttime = new Date().getTime();

  //set timeouts for metronome and next trial
  timeout_list.push(setTimeout(playMetronome,time_to_metronome));
  timeout_list.push(setTimeout(nextTrial,trial_duration));
  console.log("trial "+this_trial+" start");
}

function playMetronome(){
  metronome_at = new Date().getTime();
  the_metronome.play();
  console.log('metronome!');
}

function nextTrial(){
  //get event time
  trial_endtime = new Date().getTime();
  console.log("trial "+ this_trial+" end");
  //should we draw a probe?
  if (probe_avail && is_probe){doProbe();}

  //otherwise, run the next trial
  else{
    logData();
    this_trial++;

    //only false if probe just presented -->getReady --> fixation --> runTrial
    if(!probe_avail){
      probe_avail = true;
      this_probe++;
      probe_1_resp = '';
      probe_2_resp = '';
      getReady();
    }
    else{runTrial();}
  }
}

window.onkeydown = function(e){
  var key = e.keyCode ? e.keyCode: e.which;
  if(!key_pressed && key == 32 && (probe_avail)){
    resp_at = new Date().getTime();
    //rt = new Date().getTime() - prestim_time;
    omission = 0;
    key_pressed = true;
    //console.log('key pressed');
  }
}

function checkMinTime(event_running, event_start_time, min_duration){
  while (event_running){
		if (new Date().getTime() - event_start_time >= min_duration){
      event_running = false;
      //console.log(new Date().getTime() - event_start_time);
    }
	}
  return event_running;
}



//draw probe
function doProbe(){
  //hide everything
  hideAllDivs();

  //need to turn probe availability off until next trial is updated
  probe_avail = false;

  //clear tracked timeouts, and check for/clear rogue timeouts
  stopTrackedTimeouts();
  stopTrackedTimeouts();

  //show sliders
  showPage(thought_probe_1);
  showPage(thought_probe_2);
  showPage(save_resp_btn);
}

function endProbe(){
  hideAllDivs();
  probe_1_resp = document.querySelector('input[name="mw-probe-rad"]:checked').value;
  probe_2_resp = document.querySelector('input[name="guidance-probe-rad"]:checked').value;
  console.log(probe_1_resp);
  console.log(probe_2_resp);

  resetInputValues();
  nextTrial();
}

//display practice over and update values
function endPractice(){
  is_practice = false;
  updateBlockCounters();
  inst_next_btn.innerHTML = 'Begin Task';

  showPage(practice_over);
  showPage(inst_next_btn);

  //should be global
  probe_list = generateProbes(num_probes,probe_steps);
}

function updateBlockCounters(){
  this_trial = 0;
  this_probe = 0;
  this_block++;
}

function logData(){
  //if a response was made
  if(omission==0){
    //resp at should occur after stim_time, otherwise early/negative response
    rt = resp_at-trial_starttime;
    rt_to_metronome = resp_at - metronome_at;
  }
  var output = [
    ss_code,
    condition,
    this_block,
    this_trial,
    is_probe,
    omission,
    trial_starttime,
    metronome_at,
    trial_endtime,
    resp_at,
    rt,
    rt_to_metronome,
    this_probe,
    probe_1_resp,
    probe_2_resp,
    document.hasFocus()
  ];

  for (var i in output){
    trial_data+=output[i];
    if(i<output.length-1){trial_data+=',';}
    else{trial_data+='\n';}
  }
  console.log('trial '+this_trial+ 'rt '+rt);
}

function submitData(){
  document.getElementById('put-studyid-here').value = studyid;
  document.getElementById('put-sscode-here').value = ss_code;
  document.getElementById('put-data-here').value = trial_data;
  document.getElementById('sendtoPHP').submit();
}

//consent to participate
yes_consent_btn.addEventListener('click',function(event){
  hidePage(info_consent_letter);
  hidePage(yes_consent_btn);
  hidePage(no_consent_btn);
  showPage(task_inst);
  showPage(inst_next_btn);
  showPage(inst_back_btn);
  showPage(test_sound_btn);
  task_inst.innerHTML = inst_pg_list[this_inst_pg];

});

//decline to participate
no_consent_btn.addEventListener('click',function(event){
  hidePage(info_consent_letter);
  hidePage(yes_consent_btn);
  hidePage(no_consent_btn);
  showPage(decline_to_participate);
});

inst_next_btn.addEventListener('click',function(event){
  if(this_inst_pg<inst_pg_list.length-1){
    this_inst_pg++;
    task_inst.innerHTML = inst_pg_list[this_inst_pg];
    if(this_inst_pg==inst_pg_list.length-1){inst_next_btn.innerHTML = 'Begin Practice Trials';}
    if(this_inst_pg==0){showPage(test_sound_btn);}
    else{hidePage(test_sound_btn);}
  }
  else{getReady();}
});

inst_back_btn.addEventListener('click',function(event){
  if(this_inst_pg>0){
    this_inst_pg-=1;
    task_inst.innerHTML = inst_pg_list[this_inst_pg];
    if(this_inst_pg!=inst_pg_list.length-1){inst_next_btn.innerHTML = 'Next';}
    if(this_inst_pg==0){showPage(test_sound_btn);}
    else{hidePage(test_sound_btn);}
  }
  else{
    hidePage(task_inst);
    hidePage(inst_next_btn);
    hidePage(inst_back_btn);
    hidePage(test_sound_btn);

    showPage(info_consent_letter);
    showPage(yes_consent_btn);
    showPage(no_consent_btn);
  }
});

save_resp_btn.addEventListener('click',function(){
  if(document.querySelectorAll('input[type="radio"]:checked').length==2?true:false){
    endProbe();
  }
  else{
    alert("Please select your responses to the thought probes");
  }
});

test_sound_btn.addEventListener('click',function(){
  the_metronome.play();
});

//set initial default slider values
//setSliderValues();

//update slider output values oninput
//motiv_slider.oninput = function(){motiv_output.innerHTML = this.value;}
//boredom_slider.oninput = function(){boredom_output.innerHTML = this.value;}
//conc_slider.oninput = function(){conc_output.innerHTML = this.value;}




//*****************************************
//-----------starting experiment-----------
//*****************************************
var probe_list = [num_practice/2];

//--log some testing stuff
console.log(ss_code);
console.log(condition);
console.log(the_stim_list);
console.log(the_targ_list);
console.log(probe_list);

//--show starting page and buttons
//showPage(uw_header);
showPage(info_consent_letter);
showPage(yes_consent_btn);
showPage(no_consent_btn);
showPage(do_not_refresh);
