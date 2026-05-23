const db = require('./config/db');

const coursesData = [
  { title: 'Python Full Course', price: '₹11,999', original_price: '₹14,399' },
  { title: 'Java Full Stack Development', price: '₹19,999', original_price: '₹23,999' },
  { title: 'Cyber Security and Ethical Hacking', price: '₹25,999', original_price: '₹31,199' },
  { title: 'Cloud Computing', price: '₹14,999', original_price: '₹17,999' },
  { title: 'Mastering in Python + C', price: '₹19,999', original_price: '₹23,999' },
  { title: 'Mastering in Python and C Programming', price: '₹19,999', original_price: '₹23,999' },
  { title: 'Digital Marketing', price: '₹9,999', original_price: '₹11,999' },
  { title: 'UI/UX Design', price: '₹9,999', original_price: '₹11,999' },
  { title: 'Data Science and Machine Learning', price: '₹19,999', original_price: '₹23,999' },
  { title: 'Python and Data Science', price: '₹16,999', original_price: '₹20,399' }
];

(async () => {
  try {
    console.log("Updating database course prices to match user specifications...");
    for (const course of coursesData) {
      await db.query(
        "UPDATE courses SET price = $1, original_price = $2 WHERE title = $3",
        [course.price, course.original_price, course.title]
      );
      console.log(`Updated course ${course.title}: price = ${course.price}, original_price = ${course.original_price}`);
    }
    console.log("Database update completed successfully.");
  } catch (err) {
    console.error("Failed to update course prices:", err);
  } finally {
    process.exit(0);
  }
})();
