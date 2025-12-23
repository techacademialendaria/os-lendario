import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const slugsToRemove = [
  "jose_amorim"  // duplicate of jose-carlos-amorim
];

console.log("Removing " + slugsToRemove.length + " minds...");

const { error } = await supabase
  .from("minds")
  .delete()
  .in("slug", slugsToRemove);

if (error) {
  console.error("Error:", error.message);
  process.exit(1);
}

console.log("Done! Removed duplicates.");

// Verify
const { count } = await supabase
  .from("minds")
  .select("*", { count: "exact", head: true });

console.log("Remaining minds: " + count);
