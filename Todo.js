let days = JSON.parse(localStorage.getItem("days")) || [
    {
        day: 1,
        tasks: []
    }
];

let currentDay = days[days.length - 1].day;

let input = document.getElementById("tasks");
let addButton = document.getElementById("addbutton");
let newDayButton = document.getElementById("newDay");
let daysContainer = document.getElementById("days");
let resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", function() {

    let confirmReset = confirm("Are you sure you want to reset everything?");

    if (!confirmReset) {
        return;
    }

    localStorage.removeItem("days");

    days = [
        {
            day: 1,
            tasks: []
        }
    ];

    currentDay = 1;

    displayDays();
});

addButton.addEventListener("click", function() {
    let value = input.value.trim();

    if (value === "") {
        return;
    }

    days[currentDay - 1].tasks.push({
        name: value,
        completed: false
    });

    localStorage.setItem("days", JSON.stringify(days));

    input.value = "";

    displayDays();
});

newDayButton.addEventListener("click", function() {
    currentDay++;

    days.push({
        day: currentDay,
        tasks: []
    });

    localStorage.setItem("days", JSON.stringify(days));

    displayDays();
});

function displayDays() {
    daysContainer.innerHTML = "";

    days.forEach(function(day, dayIndex) {

        let dayDiv = document.createElement("div");

        let heading = document.createElement("h2");
        heading.textContent = "Day " + day.day;

        dayDiv.appendChild(heading);

        let progress = document.createElement("div");
        progress.className = "progress";

        let progressBar = document.createElement("div");
        progressBar.className = "progress-bar";

        progress.appendChild(progressBar);
        dayDiv.appendChild(progress);

        let completed = 0;

        day.tasks.forEach(function(task, taskIndex) {

            let taskDiv = document.createElement("div");
            taskDiv.className = "task";

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            let label = document.createElement("label");
            label.textContent = task.name;

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "×";

            if (task.completed) {
                taskDiv.classList.add("completed");
                completed++;
            }

            checkbox.addEventListener("change", function() {

                task.completed = checkbox.checked;

                if (checkbox.checked) {
                    taskDiv.classList.add("completed");
                } else {
                    taskDiv.classList.remove("completed");
                }

                localStorage.setItem("days", JSON.stringify(days));

                displayDays();
            });

            deleteButton.addEventListener("click", function() {

                days[dayIndex].tasks.splice(taskIndex, 1);

                localStorage.setItem("days", JSON.stringify(days));

                displayDays();
            });

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);
            taskDiv.appendChild(deleteButton);

            dayDiv.appendChild(taskDiv);
        });

        let percentage = day.tasks.length === 0
            ? 0
            : (completed / day.tasks.length) * 100;

        progressBar.style.width = percentage + "%";

        daysContainer.appendChild(dayDiv);
    });
}

displayDays();