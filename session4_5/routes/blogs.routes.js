const router = require("express").Router();
const { createNewBlog, getBlogs, getBlogById, updateBlogById, deleteBlogById } = require("../controllers/blogs.controllers")
const findBlogWithId = require("../middleware/findBlogWithId");

router.post("/new", createNewBlog);
router.get("/", getBlogs);

// Using .all() to apply the middleware "findBlogWithId" to all the methods
router
    .route("/:blogId")
    .all(findBlogWithId)
    .get(getBlogById)
    .patch(updateBlogById)
    .delete(deleteBlogById);


// When we have common route but different http method we can do something like below instead of writing all seperately
router
    .route("/:blogId")
    .get(findBlogWithId, getBlogById)
    .patch(updateBlogById)
    .delete(deleteBlogById);

// router.get("/:blogId", getBlogById);
// router.patch("/:blogId", updateBlogById); // Put for replacing whole entity in a database. Patch for partial updates
// router.delete("/:blogId", deleteBlogById);

module.exports = router;


// - Learnings
/*
- Cannot use middleware function before the path. Because the middleware requires req.params which we will get from the path.

*/