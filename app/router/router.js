const { authRoutes } = require("./auth");
const { projectRoutes } = require("./project");
const { teamRoutes } = require("./team");
const { userRoutes } = require("./user");

const router = require("express").Router();
router.use("/auth",authRoutes)
router.use("/project",projectRoutes)
router.use("/user",userRoutes)
router.use("/team",teamRoutes)
module.exports = {
    AllRoutes : router
}