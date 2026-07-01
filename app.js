if(document.querySelector(".happen")){
    setTimeout(() => {
        const id = localStorage.getItem("portfolioId");
        localStorage.clear();
        window.location.href = "/portfolio/" + id;
    }, 14000);
}

const addProjectBtn = document.querySelector(".proj.x .y");
const projDiv = document.querySelector(".proj.x");
if(addProjectBtn){
    addProjectBtn.addEventListener("click", () => {
        const newTitle = document.createElement("input");
        newTitle.type = "text";
        newTitle.className = "top form-control";
        newTitle.placeholder = "Enter your project Title";
        newTitle.style.marginTop = "2vh";
        const newDesc = document.createElement("input");
        newDesc.type = "text";
        newDesc.className = "mid top form-control";
        newDesc.placeholder = "Enter your project description";
        const newLink = document.createElement("input");
        newLink.type = "text";
        newLink.className = "BOTTOM form-control";
        newLink.placeholder = "Enter your project link";
        projDiv.appendChild(newTitle);
        projDiv.appendChild(newDesc);
        projDiv.appendChild(newLink);
        projDiv.removeChild(addProjectBtn);
    });
}

const addInternBtn = document.querySelector(".proj.u .y");
const internDiv = document.querySelector(".proj.u");
if(addInternBtn){
    addInternBtn.addEventListener("click", () => {
        const newRole = document.createElement("input");
        newRole.type = "text";
        newRole.className = "top form-control";
        newRole.placeholder = "Enter your role (eg- Frontend Intern, ML Intern)";
        newRole.style.marginTop = "2vh";
        const newCompany = document.createElement("input");
        newCompany.type = "text";
        newCompany.className = "mid top form-control";
        newCompany.placeholder = "Enter company / organization name";
        const newStart = document.createElement("input");
        newStart.type = "text";
        newStart.className = "abc mid top form-control";
        newStart.placeholder = "Start (eg- June 2023)";
        const newEnd = document.createElement("input");
        newEnd.type = "text";
        newEnd.className = "bac mid top form-control";
        newEnd.placeholder = "End (eg- Aug 2023)";
        const newLearn = document.createElement("input");
        newLearn.type = "text";
        newLearn.className = "BOTTOM form-control";
        newLearn.placeholder = "What did you build or learn? (keep it short)";
        internDiv.appendChild(newRole);
        internDiv.appendChild(newCompany);
        internDiv.appendChild(newStart);
        internDiv.appendChild(newEnd);
        internDiv.appendChild(newLearn);
        internDiv.removeChild(addInternBtn);
    });
}

const addAchieveBtn = document.querySelector(".proj.z .y");
const achieveDiv = document.querySelector(".proj.z");
if(addAchieveBtn){
    addAchieveBtn.addEventListener("click", () => {
        const newTitle = document.createElement("input");
        newTitle.type = "text";
        newTitle.className = "top form-control";
        newTitle.placeholder = "Title (eg- Won HackFest 2024, Google UX Certificate)";
        newTitle.style.marginTop = "2vh";
        const newIssued = document.createElement("input");
        newIssued.type = "text";
        newIssued.className = "mid top form-control";
        newIssued.placeholder = "Issued by (eg- Coursera, devfolio, College)";
        const newYear = document.createElement("input");
        newYear.type = "text";
        newYear.className = "BOTTOM form-control";
        newYear.placeholder = "Year or link (optional)";
        achieveDiv.appendChild(newTitle);
        achieveDiv.appendChild(newIssued);
        achieveDiv.appendChild(newYear);
        achieveDiv.removeChild(addAchieveBtn);
    });
}

const nextBtn1 = document.querySelector(".prev a[href='generatetwo.html']");
if(nextBtn1){
    nextBtn1.addEventListener("click", () => {
        localStorage.setItem("name", document.querySelector(".name input").value);
        localStorage.setItem("age", document.querySelector(".age input").value);
        localStorage.setItem("education", document.querySelector(".edu input").value);
        localStorage.setItem("skills", document.querySelector(".skills input").value);
        localStorage.setItem("interests", document.querySelector(".interests input").value);
    });
}

const nextBtn2 = document.querySelector(".prev a[href='generatethree.html']");
if(nextBtn2){
    nextBtn2.addEventListener("click", () => {
        localStorage.setItem("github", document.querySelector(".name input").value);
        localStorage.setItem("linkedin", document.querySelector(".edu input").value);
        localStorage.setItem("email", document.querySelector(".skills input").value);

        const projects = [];
        document.querySelectorAll(".proj.x .top:not(.mid)").forEach((el, i) => {
            projects.push({
                title: el.value,
                desc: document.querySelectorAll(".proj.x .mid")[i].value,
                link: document.querySelectorAll(".proj.x .BOTTOM")[i].value
            });
        });
        localStorage.setItem("projects", JSON.stringify(projects));
    });
}

const finishBtn = document.querySelector(".prev a[href='generatefour.html']");
if(finishBtn){
    finishBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const internships = [];
        document.querySelectorAll(".proj.u .top:not(.mid)").forEach((el, i) => {
            internships.push({
                role: el.value,
                company: document.querySelectorAll(".proj.u .mid:not(.abc):not(.bac)")[i].value,
                start: document.querySelectorAll(".proj.u .abc")[i].value,
                end: document.querySelectorAll(".proj.u .bac")[i].value,
                learn: document.querySelectorAll(".proj.u .BOTTOM")[i].value
            });
        });

        const achievements = [];
        document.querySelectorAll(".proj.z .top:not(.mid)").forEach((el, i) => {
            achievements.push({
                title: el.value,
                issued: document.querySelectorAll(".proj.z .mid")[i].value,
                year: document.querySelectorAll(".proj.z .BOTTOM")[i].value
            });
        });

        const data = {
            name: localStorage.getItem("name"),
            age: localStorage.getItem("age"),
            education: localStorage.getItem("education"),
            skills: localStorage.getItem("skills"),
            interests: localStorage.getItem("interests"),
            github: localStorage.getItem("github"),
            linkedin: localStorage.getItem("linkedin"),
            email: localStorage.getItem("email"),
            projects: JSON.parse(localStorage.getItem("projects")),
            internships: internships,
            achievements: achievements,
        };

       fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            localStorage.clear();
            localStorage.setItem("portfolioId", result.id);
            window.location.href = "/generatefour.html";
        })
        .catch(err => console.log(err));
    });
}