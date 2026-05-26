<?php
// backend/controllers/courseController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class CourseController {
    private static $fallbackFile = __DIR__ . '/../data/courses_fallback.json';

    private static function getFallbackCourses() {
        try {
            $dir = dirname(self::$fallbackFile);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            if (!file_exists(self::$fallbackFile)) {
                $initialData = [
                    [
                        "id" => 1,
                        "title" => "Python Full Course",
                        "category" => "Development",
                        "duration" => "3 Months",
                        "rating" => 4.8,
                        "price" => "₹11,999",
                        "originalPrice" => "₹14,399",
                        "image" => "/images/pfc.png"
                    ],
                    [
                        "id" => 2,
                        "title" => "Java Full Stack Development",
                        "category" => "Development",
                        "duration" => "6 Months",
                        "rating" => 4.9,
                        "price" => "₹19,999",
                        "originalPrice" => "₹23,999",
                        "image" => "/images/jfs_image.png"
                    ],
                    [
                        "id" => 3,
                        "title" => "Cyber Security and Ethical Hacking",
                        "category" => "Development",
                        "duration" => "6 Months",
                        "rating" => 4.9,
                        "price" => "₹25,999",
                        "originalPrice" => "₹31,199",
                        "image" => "/images/cseh_image.png"
                    ],
                    [
                        "id" => 4,
                        "title" => "Cloud Computing",
                        "category" => "Development",
                        "duration" => "4 Months",
                        "rating" => 4.7,
                        "price" => "₹14,999",
                        "originalPrice" => "₹17,999",
                        "image" => "/images/cc_image.png"
                    ],
                    [
                        "id" => 5,
                        "title" => "Mastering in Python and C Programming",
                        "category" => "Development",
                        "duration" => "3 Months",
                        "rating" => 4.8,
                        "price" => "₹19,999",
                        "originalPrice" => "₹23,999",
                        "image" => "/images/mpcp_image.png"
                    ],
                    [
                        "id" => 6,
                        "title" => "Digital Marketing",
                        "category" => "Marketing",
                        "duration" => "3 Months",
                        "rating" => 4.6,
                        "price" => "₹9,999",
                        "originalPrice" => "₹11,999",
                        "image" => "/images/dm_image.png"
                    ],
                    [
                        "id" => 7,
                        "title" => "UI/UX Design",
                        "category" => "Design",
                        "duration" => "3 Months",
                        "rating" => 4.8,
                        "price" => "₹9,999",
                        "originalPrice" => "₹11,999",
                        "image" => "/images/ui_ux_course.png"
                    ],
                    [
                        "id" => 8,
                        "title" => "Data Science and Machine Learning",
                        "category" => "Data Science",
                        "duration" => "6 Months",
                        "rating" => 4.9,
                        "price" => "₹19,999",
                        "originalPrice" => "₹23,999",
                        "image" => "/images/dsml_image.png"
                    ],
                    [
                        "id" => 9,
                        "title" => "Python and Data Science",
                        "category" => "Data Science",
                        "duration" => "4 Months",
                        "rating" => 4.8,
                        "price" => "₹16,999",
                        "originalPrice" => "₹20,399",
                        "image" => "/images/pds_image.png"
                    ]
                ];
                file_put_contents(self::$fallbackFile, json_encode($initialData, JSON_PRETTY_PRINT));
                return $initialData;
            }
            return json_decode(file_get_contents(self::$fallbackFile), true) ?? [];
        } catch (Exception $e) {
            error_log("❌ Error reading fallback courses: " . $e->getMessage());
            return [];
        }
    }

    private static function saveFallbackCourses($courses) {
        try {
            $dir = dirname(self::$fallbackFile);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            file_put_contents(self::$fallbackFile, json_encode($courses, JSON_PRETTY_PRINT));
        } catch (Exception $e) {
            error_log("❌ Error writing fallback courses: " . $e->getMessage());
        }
    }

    private static function mapCourseRow($row) {
        return [
            'id' => (int)$row['id'],
            'title' => $row['title'],
            'category' => $row['category'] ?? 'Development',
            'duration' => $row['duration'],
            'rating' => (float)($row['rating'] ?? 4.8),
            'price' => $row['price'],
            'originalPrice' => $row['original_price'] ?? $row['originalprice'] ?? $row['originalPrice'] ?? null,
            'image' => $row['image']
        ];
    }

    public static function getAllCourses($req) {
        $limit = isset($req['query']['limit']) ? (int)$req['query']['limit'] : null;

        try {
            $sql = 'SELECT * FROM courses ORDER BY id ASC';
            if ($limit && $limit > 0) {
                $sql .= ' LIMIT ' . $limit;
            }
            $stmt = Database::query($sql);
            $rows = $stmt->fetchAll();
            $courses = array_map([self::class, 'mapCourseRow'], $rows);

            return [
                'success' => true,
                'data' => $courses
            ];
        } catch (Exception $err) {
            error_log("⚠️ Database query failed. Falling back to local JSON data store: " . $err->getMessage());
            $fallbackCourses = self::getFallbackCourses();
            if ($limit && $limit > 0) {
                $fallbackCourses = array_slice($fallbackCourses, 0, $limit);
            }
            return [
                'success' => true,
                'data' => $fallbackCourses
            ];
        }
    }

    public static function getCourseById($req) {
        $id = (int)$req['params']['id'];

        try {
            $stmt = Database::query('SELECT * FROM courses WHERE id = ?', [$id]);
            $row = $stmt->fetch();
            if (!$row) {
                http_response_code(404);
                return ['error' => 'Course not found'];
            }
            return [
                'success' => true,
                'data' => self::mapCourseRow($row)
            ];
        } catch (Exception $err) {
            error_log("⚠️ Database query failed. Falling back to local JSON data store: " . $err->getMessage());
            $fallbackCourses = self::getFallbackCourses();
            $found = null;
            foreach ($fallbackCourses as $c) {
                if ((int)$c['id'] === $id) {
                    $found = $c;
                    break;
                }
            }
            if (!$found) {
                http_response_code(404);
                return ['error' => 'Course not found (fallback)'];
            }
            return [
                'success' => true,
                'data' => $found
            ];
        }
    }

    public static function createCourse($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        $body = $req['body'] ?? [];
        $title = $body['title'] ?? '';
        $category = $body['category'] ?? 'Development';
        $duration = $body['duration'] ?? '';
        $rating = isset($body['rating']) ? (float)$body['rating'] : 4.8;
        $price = $body['price'] ?? '';
        $originalPrice = $body['originalPrice'] ?? '';
        $image = $body['image'] ?? '';

        if (empty($title)) {
            http_response_code(400);
            return ['error' => 'Title is required.'];
        }

        try {
            $stmt = Database::query(
                'INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *',
                [$title, $category, $duration, $rating, $price, $originalPrice, $image]
            );
            $row = $stmt->fetch();
            http_response_code(201);
            return [
                'success' => true,
                'data' => self::mapCourseRow($row)
            ];
        } catch (Exception $err) {
            error_log("⚠️ Database query failed. Falling back to local JSON data store: " . $err->getMessage());
            $fallbackCourses = self::getFallbackCourses();
            $newId = count($fallbackCourses) > 0 ? max(array_column($fallbackCourses, 'id')) + 1 : 1;
            
            $newCourse = [
                'id' => $newId,
                'title' => $title,
                'category' => $category,
                'duration' => $duration,
                'rating' => $rating,
                'price' => $price,
                'originalPrice' => $originalPrice,
                'image' => $image,
                'created_at' => date('c')
            ];
            
            $fallbackCourses[] = $newCourse;
            self::saveFallbackCourses($fallbackCourses);
            
            http_response_code(201);
            return [
                'success' => true,
                'data' => $newCourse
            ];
        }
    }

    public static function updateCourse($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        $id = (int)$req['params']['id'];
        $body = $req['body'] ?? [];

        try {
            $stmt = Database::query('SELECT * FROM courses WHERE id = ?', [$id]);
            $existing = $stmt->fetch();
            if (!$existing) {
                http_response_code(404);
                return ['error' => 'Course not found'];
            }

            $title = $body['title'] ?? $existing['title'];
            $category = $body['category'] ?? $existing['category'];
            $duration = $body['duration'] ?? $existing['duration'];
            $rating = isset($body['rating']) ? (float)$body['rating'] : (float)$existing['rating'];
            $price = $body['price'] ?? $existing['price'];
            $originalPrice = $body['originalPrice'] ?? $existing['original_price'];
            $image = $body['image'] ?? $existing['image'];

            $stmtUpdate = Database::query(
                'UPDATE courses SET title = ?, category = ?, duration = ?, rating = ?, price = ?, original_price = ?, image = ? WHERE id = ? RETURNING *',
                [$title, $category, $duration, $rating, $price, $originalPrice, $image, $id]
            );
            $updated = $stmtUpdate->fetch();

            return [
                'success' => true,
                'data' => self::mapCourseRow($updated)
            ];
        } catch (Exception $err) {
            error_log("⚠️ Database query failed. Falling back to local JSON data store: " . $err->getMessage());
            $fallbackCourses = self::getFallbackCourses();
            $index = -1;
            foreach ($fallbackCourses as $i => $c) {
                if ((int)$c['id'] === $id) {
                    $index = $i;
                    break;
                }
            }
            if ($index === -1) {
                http_response_code(404);
                return ['error' => 'Course not found (fallback)'];
            }

            $fallbackCourses[$index] = array_merge($fallbackCourses[$index], [
                'title' => $body['title'] ?? $fallbackCourses[$index]['title'],
                'category' => $body['category'] ?? $fallbackCourses[$index]['category'],
                'duration' => $body['duration'] ?? $fallbackCourses[$index]['duration'],
                'rating' => isset($body['rating']) ? (float)$body['rating'] : $fallbackCourses[$index]['rating'],
                'price' => $body['price'] ?? $fallbackCourses[$index]['price'],
                'originalPrice' => $body['originalPrice'] ?? $fallbackCourses[$index]['originalPrice'],
                'image' => $body['image'] ?? $fallbackCourses[$index]['image']
            ]);

            self::saveFallbackCourses($fallbackCourses);

            return [
                'success' => true,
                'data' => $fallbackCourses[$index]
            ];
        }
    }

    public static function deleteCourse($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        $id = (int)$req['params']['id'];

        try {
            $stmt = Database::query('DELETE FROM courses WHERE id = ? RETURNING *', [$id]);
            $row = $stmt->fetch();
            if (!$row) {
                http_response_code(404);
                return ['error' => 'Course not found'];
            }
            return [
                'success' => true,
                'message' => 'Course deleted successfully'
            ];
        } catch (Exception $err) {
            error_log("⚠️ Database query failed. Falling back to local JSON data store: " . $err->getMessage());
            $fallbackCourses = self::getFallbackCourses();
            $index = -1;
            foreach ($fallbackCourses as $i => $c) {
                if ((int)$c['id'] === $id) {
                    $index = $i;
                    break;
                }
            }
            if ($index === -1) {
                http_response_code(404);
                return ['error' => 'Course not found (fallback)'];
            }

            array_splice($fallbackCourses, $index, 1);
            self::saveFallbackCourses($fallbackCourses);

            return [
                'success' => true,
                'message' => 'Course deleted successfully (fallback)'
            ];
        }
    }
}
