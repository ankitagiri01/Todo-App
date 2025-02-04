let task = document.getElementById("item");
let list = document.getElementById("result-box");
let emptyMessage = document.getElementById('empty-message');
const radialProgress = document.querySelector('.radialProgress');
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let d = new Date();
let day = d.getDay();

const weekDayName = weekdays[day];
document.getElementById("day").innerHTML = weekDayName + "&#128512";


function addTask() {
    if (task.value === "") {
        alert("Enter Some Task To Add In To-Do List");
        return;
    }

    let li = document.createElement('li');
    li.innerText = task.value;
    li.setAttribute('title', 'Mark Your Task As Done');
    list.appendChild(li);

    let span = document.createElement('span');
    span.setAttribute('title', 'Delete Your Completed Task.');
    li.appendChild(span);

    task.value = "";

    let starIcon = document.createElement('i');
    starIcon.classList.add('fa-light', 'fa-star', 'unstar');
    starIcon.style.color = '#767676';
    starIcon.style.fontSize = "13px";
    starIcon.setAttribute('title', 'Click to mark task as starred');
    li.appendChild(starIcon);

    starIcon.addEventListener("click", function () {
        addStar(starIcon, li);
    })

    toggleEmptyMessage();
    updateProgress();
}

list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            confettiOne();
        }
        updateProgress();

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        toggleEmptyMessage();
        updateProgress();
    }
})

function addStar(icon, li) {
    if (icon.classList.contains("unstar")) {
        li.classList.add("list");
        icon.style.color = "#3a9a43";
        icon.className = "fa-solid fa-star star";
    } else {
        li.classList.remove("list");
        icon.style.color = "#808080";
        icon.className = "fa-light fa-star unstar";
    }
}

function toggleEmptyMessage() {
    if (list.children.length === 0) {
        emptyMessage.style.display = "block";
    }
    else {
        emptyMessage.style.display = "none";
    }
}


function updateProgress() {
    const tasks = list.children;
    const totalTasks = tasks.length;
    const completedTask = document.querySelectorAll(".checked").length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTask / totalTasks) * 100);
    setProgress(progress);
}

function setProgress(progress) {
    const value = `${progress}%`;
    document.getElementById("cper").innerText = `${progress}% Completed`;
    document.getElementById("pper").innerText = `${100 - progress}% Pending`;
    radialProgress.style.setProperty('--progress', value);
    radialProgress.setAttribute('aria-valuenow', progress);
    if(progress === 100){
        final();
    }
}

function updateTimeImage(){
    const hour = new Date().getHours();

    const timeImage = document.getElementById("Time-Image");
    const images = {
        morning: "/img/nature (1).jpg",
        afternoon: "/img/noon.avif",
        evening: "/img/night.avif",
        night: "/img/night2.avif"
    }

    if(hour >= 5 && hour<12){
        timeImage.src = images.morning;
        timeImage.alt = "morning";
    } else if(hour >= 12 && hour<17){
        timeImage.src = images.afternoon;
        timeImage.alt = "afternoon";
    } else if(hour >= 17 && hour<21){
        timeImage.src = images.evening;
        timeImage.alt = "evening";
    } else{
        timeImage.src = images.night;
        timeImage.alt = "night";
    }
}


// confetti added in this section 

function confettiOne() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function final() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}



toggleEmptyMessage();
updateTimeImage();