const { authRoutes } = require("./auth");
const { projectRoutes } = require("./project");
const { teamRoutes } = require("./team");
const { userRoutes } = require("./user");

const router = require("express").Router();
router.use("/auth",authRoutes)
router.use("/auth",projectRoutes)
router.use("/auth",userRoutes)
router.use("/auth",teamRoutes)
module.exports = {
    AllRoutes : router
}