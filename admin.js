// async function loadStudents() {
//   const res = await fetch("http://127.0.0.1:5000/students");
//   const data = await res.json();

//   const table = document.getElementById("table");

//   table.innerHTML = `
//     <tr>
//       <th>ID</th>
//       <th>Name</th>
//       <th>College</th>
//       <th>Phone</th>
//       <th>Email</th>
//       <th>Event</th>
//       <th>Type</th>
//       <th>Action</th>
//     </tr>
//   `;

//   if (data.length === 0) {
//     table.innerHTML += `<tr><td colspan="8">No Students</td></tr>`;
//     return;
//   }

//   data.forEach(s => {
//     const row = table.insertRow();

//     row.insertCell(0).innerText = s.id;
//     row.insertCell(1).innerText = s.name;
//     row.insertCell(2).innerText = s.college;
//     row.insertCell(3).innerText = s.phone;
//     row.insertCell(4).innerText = s.email;
//     row.insertCell(5).innerText = s.event;
//     row.insertCell(6).innerText = s.type;

//     row.insertCell(7).innerHTML =
//       `<button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>`;
//   });
// }

// // ✅ DELETE FUNCTION (ONLY ONCE)
// async function deleteStudent(id) {
//   if (!confirm("Delete this student?")) return;

//   try {
//     const res = await fetch(`http://127.0.0.1:5000/delete/${id}`, {
//       method: "DELETE"
//     });

//     const text = await res.text(); // 🔥 get raw response
//     console.log("SERVER RESPONSE:", text);

//     try {
//       const result = JSON.parse(text);
//       alert(result.message);
//     } catch {
//       alert("Server returned non-JSON (route issue)");
//     }

//     loadStudents();

//   } catch (err) {
//     console.error(err);
//     alert("Delete failed");
//   }
// }
// // ✅ SEARCH
// function searchStudent() {
//   const input = document.getElementById("search").value.toLowerCase();
//   const rows = document.querySelectorAll("#table tr");

//   rows.forEach((row, index) => {
//     if (index === 0) return;
//     const name = row.cells[1]?.innerText.toLowerCase();
//     row.style.display = name.includes(input) ? "" : "none";
//   });
// }

// // ✅ LOAD ON START
// loadStudents();


async function loadStudents() {
  try {
    const res = await fetch("http://127.0.0.1:5000/students");
    const data = await res.json();

    const table = document.getElementById("table");

    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>College</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Event</th>
        <th>Type</th>
      </tr>
    `;

    if (data.length === 0) {
      table.innerHTML += `<tr><td colspan="7" class="no-data">No Students Found</td></tr>`;
      return;
    }

    data.forEach(s => {
      const row = table.insertRow();

      row.insertCell(0).innerText = s.id;
      row.insertCell(1).innerText = s.name;
      row.insertCell(2).innerText = s.college;
      row.insertCell(3).innerText = s.phone;
      row.insertCell(4).innerText = s.email;
      row.insertCell(5).innerText = s.event;
      row.insertCell(6).innerText = s.type;
    });

  } catch (err) {
    console.error(err);
    alert("Failed to load students");
  }
}

// 🔍 SEARCH
function searchStudent() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#table tr");

  rows.forEach((row, index) => {
    if (index === 0) return;
    const name = row.cells[1]?.innerText.toLowerCase();
    row.style.display = name.includes(input) ? "" : "none";
  });
}

// AUTO LOAD
loadStudents();