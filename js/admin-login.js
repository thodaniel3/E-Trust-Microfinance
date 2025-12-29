import { supabase } from "./supabase.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) location.href = "admin-dashboard.html";
  else alert("Login failed");
});
