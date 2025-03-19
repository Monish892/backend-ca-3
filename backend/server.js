const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];

app.put('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = users.find(u => u.email === email);
  if (user) {
    user.password = password;
    return res.json({ message: "User password updated successfully" });
  } else {
    return res.status(404).json({ error: "Email not found" });
  }
});

app.delete('/user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const index = users.findIndex(u => u.email === email);
  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ message: "User deleted successfully" });
  } else {
    return res.status(404).json({ error: "Email not found" });
  }
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});