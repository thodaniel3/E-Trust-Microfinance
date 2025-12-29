import { supabase } from "./supabase.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const msg = document.getElementById("msg");
  msg.textContent = "Submitting...";

  try {
    // Get form values safely
    const full_name = form[0].value.trim();
    const phone = form[1].value.trim();
    const sex = form[2].value;
    const address = form[3].value.trim();
    const file = form[4].files[0];
    const comments = form[5].value.trim();

    let photo_url = null;

    // Upload photo if selected
    if (file) {
      const { data, error: uploadError } = await supabase.storage
        .from("customer-photos")
        .upload(`photos/${Date.now()}_${file.name}`, file);

      if (uploadError) {
        msg.textContent = "Photo upload failed.";
        return;
      }

      photo_url = data.path;
    }

    // Insert into database
    const { error: insertError } = await supabase
      .from("registrations")
      .insert([
        {
          full_name,
          phone,
          sex,
          address,
          photo_url,
          comments
        }
      ]);

    if (insertError) {
      console.error(insertError);
      msg.textContent = "Registration failed. Please try again.";
      return;
    }

    // Success
    msg.textContent = "Registration successful 🎉";
    form.reset();

  } catch (err) {
    console.error(err);
    msg.textContent = "Unexpected error occurred.";
  }
});
