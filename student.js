async function submitForm() {

  const name = document.getElementById("name").value.trim();
  const college = document.getElementById("college").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const event = document.getElementById("event").value;
  const type = document.getElementById("type").value;

  // ✅ VALIDATION
  if (!name || !college || !phone || !email || !event || !type) {
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

    // ✅ SHOW MESSAGE
    const msg = document.getElementById("msg");

    if (msg) {
      msg.innerText = result.message;
      msg.style.display = "block";
    }

    // ✅ CLEAR FORM
    document.getElementById("name").value = "";
    document.getElementById("college").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("event").value = "";
    document.getElementById("type").value = "";

    // ✅ HIDE MESSAGE AFTER 2 SEC
    setTimeout(() => {
      if (msg) msg.style.display = "none";
    }, 2000);

  } catch (err) {
    console.error("ERROR:", err);
    alert("Server not working");
  }
}