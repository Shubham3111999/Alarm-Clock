
let alarmListArray = [];

// TO make Clock section work
let clockEl = document.getElementById("clock");
setInterval(() => {
    let date = new Date()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let amPm = hours < 12 ? "AM" : "PM"
    
    //make sure that clock run based on 12 hour
    if (hours === 0) {
        hours = 12
    } else {
        hours = hours > 13 ? hours - 12 : hours;

    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    clockEl.innerText = `${hours}:${minutes}:${seconds} ${amPm}`

    //check if alarmListArray contain clockEl.innerText
    if (alarmListArray.includes(clockEl.innerText)) {
        alert("Alarm Ringing")
    }

}, 1000)



//Hour dropdown
let hourSelectEl = document.getElementById("hour");
for (let i = 1; i <= 12; i++) {
    let hourOptionEl = document.createElement("option")
    hourOptionEl.innerText = i < 10 ? "0" + i : i;

    hourSelectEl.append(hourOptionEl);

}

//Minute dropdown
let minuteSelectEl = document.getElementById("minute");
for (let i = 0; i <= 59; i++) {
    let minuteOptionEl = document.createElement("option")
    minuteOptionEl.innerText = i < 10 ? "0" + i : i;

    minuteSelectEl.append(minuteOptionEl);

}

//second dropdown
let secondSelectEl = document.getElementById("second");
for (let i = 0; i <= 59; i++) {
    let secondOptionEl = document.createElement("option")
    secondOptionEl.innerText = i < 10 ? "0" + i : i;

    secondSelectEl.append(secondOptionEl);

}



let alarmListEl = document.getElementById("alarmList");
let setAlarmEl = document.getElementById("setAlarm")

//on clicking set Alarm add that time to Alarm list
setAlarmEl.addEventListener("click", () => {


    //make sure valid time is selected 
    if (hourSelectEl.value !== "Hour" && minuteSelectEl.value !== "Minute" && secondSelectEl.value !== "Second") {

        let alarmTiming = `${hourSelectEl.value}:${minuteSelectEl.value}:${secondSelectEl.value} ${document.getElementById("amPm").value}`

        //make sure duplicate timezone not getting pushed
        if (!alarmListArray.includes(alarmTiming)) {

            alarmListArray.push(alarmTiming)
        }


        //set select value to default 
        hourSelectEl.value = "Hour";
        minuteSelectEl.value = "Minute";
        secondSelectEl.value = "Second"
    }else{
        alert("Please select valid timing")
    }

    //code for render showAlarmList element
    showAlarmList()

})


//render all elements in alarmListArray
function showAlarmList() {
    alarmListEl.innerHTML = ''
    for (let ele of alarmListArray) {

        let alarmListDivEl = document.createElement("div");

        let spanEl = document.createElement("span");
        spanEl.innerText = ele

        deleteBtnEL = document.createElement("button")
        deleteBtnEL.innerText = "Delete"

        alarmListDivEl.append(spanEl, deleteBtnEL);


        alarmListEl.append(alarmListDivEl);

        deleteBtnEL.addEventListener("click", () => {
            alarmListArray = alarmListArray.filter(e => e != ele);
            //run again after deleting element
            showAlarmList();
        })
    }

}

