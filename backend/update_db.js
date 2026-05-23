const db = require('./config/db');
(async () => {
  try {
    await db.query("UPDATE courses SET image = '/images/pfc.png' WHERE title = 'Python Full Course'");
    await db.query("UPDATE courses SET image = '/images/jfs_image.png' WHERE title = 'Java Full Stack Development'");
    await db.query("UPDATE courses SET image = '/images/cseh_image.png' WHERE title = 'Cyber Security and Ethical Hacking'");
    await db.query("UPDATE courses SET image = '/images/cc_image.png' WHERE title = 'Cloud Computing'");
    await db.query("UPDATE courses SET image = '/images/mpcp_image.png' WHERE title LIKE 'Mastering in Python%'");
    await db.query("UPDATE courses SET image = '/images/dm_image.png' WHERE title = 'Digital Marketing'");
    await db.query("UPDATE courses SET image = '/images/ui_ux_course.png' WHERE title = 'UI/UX Design'");
    await db.query("UPDATE courses SET image = '/images/dsml_image.png' WHERE title = 'Data Science and Machine Learning'");
    await db.query("UPDATE courses SET image = '/images/pds_image.png' WHERE title = 'Python and Data Science'");
    console.log("DB updated successfully");
  } catch (err) {
    console.error("Failed to update DB:", err);
  } finally {
    process.exit(0);
  }
})();
