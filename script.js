// ✅ SUBMIT FORM
async function submitForm() {
  const name = document.getElementById("name").value.trim();
  const college = document.getElementById("college").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const event = document.getElementById("event").value;
  const type = document.getElementById("type").value;

  if (!name || !college || !phone || !email) {
    alert("Please fill all fields!");
    return;
  }

  const data = { name, college, phone, email, event, type };

  try {
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    // ❌ REMOVE alert (optional)
    // alert(result.message);

    // ✅ GO TO SUCCESS PAGE
    window.location.href = "success.html";

  } catch (error) {
    console.error(error);
    alert("Server error!");
  }
}

// ✅ LOAD STUDENTS
async function loadStudents() {
  try {
    const res = await fetch("http://127.0.0.1:5000/students");
    const data = await res.json();

    const table = document.getElementById("table");

    table.innerHTML = `
      <tr>
        <th>Name</th>
        <th>College</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Event</th>
        <th>Type</th>
      </tr>
    `;

    data.forEach(s => {
      const row = table.insertRow();

      row.insertCell(0).innerText = s.name;
      row.insertCell(1).innerText = s.college;
      row.insertCell(2).innerText = s.phone;
      row.insertCell(3).innerText = s.email;
      row.insertCell(4).innerText = s.event;
      row.insertCell(5).innerText = s.type;
    });

  } catch (error) {
    console.error(error);
    alert("Failed to load students");
  }
}

// ✅ BACK BUTTON
function goBack() {
  window.location.href = "student.html";
}