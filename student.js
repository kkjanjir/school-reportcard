document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const dob = document.getElementById("dob").value;

  try {
    const res = await fetch(
      `https://school-reportcard2.onrender.com/api/search-marksheet?name=${encodeURIComponent(
        name
      )}&roll=${encodeURIComponent(roll)}&dob=${encodeURIComponent(dob)}`
    );

    const data = await res.json();

    if (res.ok && data) {
      document.getElementById("result").innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Roll:</strong> ${data.roll}</p>
        <p><strong>DOB:</strong> ${data.dob}</p>
        <table>
          <tr><th>Subject</th><th>Marks</th></tr>
          ${data.subjects
            .map((subj, i) => `<tr><td>${subj}</td><td>${data.marks[i]}</td></tr>`)
            .join("")}
        </table>
        <p><strong>Total:</strong> ${data.total}</p>
        <p><strong>Percentage:</strong> ${data.percentage}%</p>
      `;
    } else {
      document.getElementById("result").innerHTML = `<p>No record found.</p>`;
    }
  } catch (err) {
    document.getElementById("result").innerHTML = `<p>⚠️ Server error.</p>`;
    console.error(err);
  }
});