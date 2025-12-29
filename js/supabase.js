import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://bpvqovhwepwduuybhdai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdnFvdmh3ZXB3ZHV1eWJoZGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NDgzMTUsImV4cCI6MjA4MjUyNDMxNX0.u0DBafI4vLZJpZ7j8A-7s_-8QeVClyIkNtFzXFMSL2k"
);
