import { supabase } from "./supabase.js";

async function loadCustomers() {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Access denied. Please login.");
    window.location.href = "admin-login.html";
    return;
  }

  const container = document.getElementById("customers");
  container.innerHTML = ""; // clear old list

  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "customer-card";

    card.innerHTML = `
      <img src="https://bpvqovhwepwduuybhdai.supabase.co/storage/v1/object/public/customer-photos/${user.photo_url || "default.png"}">
      <h3>${user.full_name}</h3>
      <p>📞 ${user.phone}</p>
      <p>🏠 ${user.address}</p>
      <p>👤 ${user.sex}</p>
      <p>${user.comments || ""}</p>

      <button class="delete-btn">Delete</button>
    `;

    /* =========================
       DELETE LOGIC
    ========================= */
    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(
        `Are you sure you want to delete ${user.full_name}?`
      );

      if (!confirmDelete) return;

      // 1️⃣ Delete photo from storage (if exists)
      if (user.photo_url) {
        const { error: storageError } = await supabase.storage
          .from("customer-photos")
          .remove([user.photo_url]);

        if (storageError) {
          alert("Failed to delete customer photo.");
          return;
        }
      }

      // 2️⃣ Delete database record
      const { error: dbError } = await supabase
        .from("registrations")
        .delete()
        .eq("id", user.id);

      if (dbError) {
        alert("Failed to delete customer record.");
      } else {
        alert("Customer deleted successfully.");
        loadCustomers(); // refresh list
      }
    });

    container.appendChild(card);
  });
}

loadCustomers();
