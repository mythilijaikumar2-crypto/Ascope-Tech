const db = require('./config/db');
(async () => {
  try {
    await db.query("UPDATE courses SET image = '/images/pfc.png' WHERE title = 'Python Full Course'");
    console.log("DB updated successfully");
  } catch (err) {
    console.error("Failed to update DB:", err);
  } finally {
    process.exit(0);
  }
})();
