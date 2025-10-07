// admin.js

let subjectsContainer = document.getElementById('subjectsContainer');
let addSubjectBtn = document.getElementById('addSubjectBtn');
let totalMarksEl = document.getElementById('totalMarks');
let percentageEl = document.getElementById('percentage');
let gradeEl = document.getElementById('grade');

let subjectsCount = 0;

// Function to add new subject input
addSubjectBtn.addEventListener('click', () => {
    subjectsCount++;
    let div = document.createElement('div');
    div.className = 'subject';
    div.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subjectName" required>
        <input type="number" placeholder="Marks" class="subjectMarks" required>
        <button type="button" class="removeSubjectBtn">Remove</button>
    `;
    subjectsContainer.appendChild(div);

    div.querySelector('.removeSubjectBtn').addEventListener('click', () => {
        div.remove();
        calculateTotal();
    });

    div.querySelector('.subjectMarks').addEventListener('input', calculateTotal);
});

// Function to calculate total, percentage, grade
function calculateTotal() {
    let marksInputs = document.querySelectorAll('.subjectMarks');
    let total = 0;
    marksInputs.forEach(input => {
        total += Number(input.value) || 0;
    });
    let percentage = marksInputs.length > 0 ? (total / (marksInputs.length * 100) * 100) : 0;
    let grade = getGrade(percentage);

    totalMarksEl.innerText = total;
    percentageEl.innerText = percentage.toFixed(2);
    gradeEl.innerText = grade;
}

// Function to determine grade
function getGrade(percentage) {
    if(percentage >= 90) return 'A+';
    else if(percentage >= 80) return 'A';
    else if(percentage >= 70) return 'B';
    else if(percentage >= 60) return 'C';
    else return 'D';
}

// Handle form submit
document.getElementById('marksheetForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    let name = document.getElementById('studentName').value;
    let roll = document.getElementById('rollNumber').value;
    let dob = document.getElementById('dob').value;

    let subjects = [];
    document.querySelectorAll('.subject').forEach(sub => {
        let subjectName = sub.querySelector('.subjectName').value;
        let marks = Number(sub.querySelector('.subjectMarks').value);
        subjects.push({subjectName, marks});
    });

    let total = Number(totalMarksEl.innerText);
    let percentage = Number(percentageEl.innerText);
    let grade = gradeEl.innerText;

    let data = {name, roll, dob, subjects, total, percentage, grade};

    // Send to backend
    try {
        let res = await fetch('https://school-reportcard2.onrender.com/api/add-marksheet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        let result = await res.json();
        alert(result.message);
        document.getElementById('marksheetForm').reset();
        subjectsContainer.innerHTML = '<h3>Subjects & Marks</h3>';
        totalMarksEl.innerText = '0';
        percentageEl.innerText = '0';
        gradeEl.innerText = '-';
    } catch(err) {
        alert('Error saving marksheet');
        console.error(err);
    }
});