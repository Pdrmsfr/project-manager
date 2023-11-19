module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoute();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Run Server On > http://loacalhost:${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    mongoose.connect(DB_URL, {}).then(() => {
      console.log("Connect to DB successful...");
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 404,
        success: false,
        message: "صفحه مورد نظر یافت نشد.",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "InternalServerError";
      res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }
  createRoute() {
    this.#app.get("/", (req, res, next) => {
      return res.json({
        message: "this is a new application",
      });
    });
  }
};
