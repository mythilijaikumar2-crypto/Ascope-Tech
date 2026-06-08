// backend/src/controllers/courseController.js
const db = require('../config/db');

/**
 * Retrieves the complete course catalog list.
 */
async function getAllCourses(req, res, next) {
  try {
    const coursesResult = await db.query('SELECT * FROM courses ORDER BY id ASC');
    const courses = coursesResult.rows.map(course => ({
      id: parseInt(course.id, 10),
      title: course.title,
      category: course.category,
      duration: course.duration,
      rating: parseFloat(course.rating || '4.8'),
      price: course.price,
      original_price: course.original_price,
      image: course.image,
      created_at: course.created_at
    }));

    res.json({
      success: true,
      data: courses
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves the details of a single course catalog item.
 */
async function getCourseById(req, res, next) {
  const courseId = parseInt(req.params.id, 10);

  try {
    const courseResult = await db.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    const course = courseResult.rows[0];

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found.'
      });
    }

    res.json({
      success: true,
      data: {
        id: parseInt(course.id, 10),
        title: course.title,
        category: course.category,
        duration: course.duration,
        rating: parseFloat(course.rating || '4.8'),
        price: course.price,
        original_price: course.original_price,
        image: course.image,
        created_at: course.created_at
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Creates a new course entry in the database catalog (Admin only).
 */
async function createCourse(req, res, next) {
  const { title, category, duration, rating, price, originalPrice, image } = req.body;

  try {
    const courseInsert = await db.query(
      `INSERT INTO courses (title, category, duration, rating, price, original_price, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        title.trim(),
        category ? category.trim() : 'Development',
        duration.trim(),
        rating ? parseFloat(rating) : 4.8,
        price.trim(),
        originalPrice ? originalPrice.trim() : null,
        image ? image.trim() : null
      ]
    );

    const newCourse = courseInsert.rows[0];
    res.status(201).json({
      success: true,
      message: 'Course created successfully!',
      data: {
        id: parseInt(newCourse.id, 10),
        title: newCourse.title,
        category: newCourse.category,
        duration: newCourse.duration,
        rating: parseFloat(newCourse.rating),
        price: newCourse.price,
        original_price: newCourse.original_price,
        image: newCourse.image
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Modifies an existing course details in the catalog (Admin only).
 */
async function updateCourse(req, res, next) {
  const courseId = parseInt(req.params.id, 10);
  const { title, category, duration, rating, price, originalPrice, image } = req.body;

  try {
    // Check if course exists
    const courseCheck = await db.query('SELECT id FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Course not found.'
      });
    }

    const courseUpdate = await db.query(
      `UPDATE courses 
       SET title = COALESCE(NULLIF($1, ''), title), 
           category = COALESCE(NULLIF($2, ''), category), 
           duration = COALESCE(NULLIF($3, ''), duration), 
           rating = COALESCE($4, rating), 
           price = COALESCE(NULLIF($5, ''), price), 
           original_price = COALESCE(NULLIF($6, ''), original_price), 
           image = COALESCE(NULLIF($7, ''), image) 
       WHERE id = $8 
       RETURNING *`,
      [
        title ? title.trim() : '',
        category ? category.trim() : '',
        duration ? duration.trim() : '',
        rating ? parseFloat(rating) : null,
        price ? price.trim() : '',
        originalPrice ? originalPrice.trim() : '',
        image ? image.trim() : '',
        courseId
      ]
    );

    const updatedCourse = courseUpdate.rows[0];
    res.json({
      success: true,
      message: 'Course updated successfully!',
      data: {
        id: parseInt(updatedCourse.id, 10),
        title: updatedCourse.title,
        category: updatedCourse.category,
        duration: updatedCourse.duration,
        rating: parseFloat(updatedCourse.rating),
        price: updatedCourse.price,
        original_price: updatedCourse.original_price,
        image: updatedCourse.image
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Removes a course entry from the database catalog (Admin only).
 */
async function deleteCourse(req, res, next) {
  const courseId = parseInt(req.params.id, 10);

  try {
    const courseCheck = await db.query('SELECT id FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Course not found.'
      });
    }

    await db.query('DELETE FROM courses WHERE id = $1', [courseId]);
    res.json({
      success: true,
      message: 'Course deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
