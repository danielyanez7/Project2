module.exports = app => {
    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes)

    const userRoutes = require("./user.routes");
    app.use("/user", userRoutes)

    const trainerRoutes = require("./trainer.routes");
    app.use("/clients", trainerRoutes)

}