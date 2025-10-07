// student.js

document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    let name = document.getElementById('studentName').value;
    let roll = document.getElementById('rollNumber').value;
    let dob = document.getElementById('dob').value;

    try {
        let res = await fetch(`https://school-reportcard2.onrender.com/api/search-marksheet?name=${name}&roll=${roll}&dob=${dob}`)
        });
        let data = await res.json();
        if(data.success){
            displayMarksheet(data.marksheet);
        } else {
            alert('Marksheet not found');
        }
    } catch(err){
        console.error(err);
        alert('Error searching marksheet');
    }
});

function displayMarksheet(marksheet){
    let container = document.getElementById('marksheetContent');
    container.innerHTML = `
        <p><strong>Name:</strong> ${marksheet.name}</p>
        <p><strong>Roll No:</strong> ${marksheet.roll}</p>
        <p><strong>DOB:</strong> ${marksheet.dob}</p>
        <table border="1" cellpadding="5">
            <tr><th>Subject</th><th>Marks</th></tr>
            ${marksheet.subjects.map(s => `<tr><td>${s.subjectName}</td><td>${s.marks}</td></tr>`).join('')}
        </table>
        <p><strong>Total:</strong> ${marksheet.total}</p>
        <p><strong>Percentage:</strong> ${marksheet.percentage}%</p>
        <p><strong>Grade:</strong> ${marksheet.grade}</p>
    `;
    document.getElementById('marksheetResult').style.display = 'block';

    document.getElementById('downloadPdfBtn').onclick = () => {
        html2pdf().from(container).save(`${marksheet.name}_Marksheet.pdf`);
    }
}