document.getElementById("marksheetForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const dob = document.getElementById("dob").value;

  const subjects = [];
  const marks = [];

  document.querySelectorAll(".subject").forEach((input) => subjects.push(input.value));
  document.querySelectorAll(".marks").forEach((input) => marks.push(Number(input.value)));

  const data = { name, roll, dob, subjects, marks };

  try {
    const res = await fetch("https://school-reportcard2.onrender.com/api/add-marksheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Marksheet added successfully!");
      document.getElementById("marksheetForm").reset();
    } else {
      alert("❌ Error: " + result.message);
    }
  } catch (err) {
    alert("⚠️ Failed to connect to server!");
    console.error(err);
  }
});