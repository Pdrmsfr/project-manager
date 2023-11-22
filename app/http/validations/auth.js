const { body } = require("express-validator");

function registerValidator() {
  return [
    body("username").custom((value, ctx) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(value)) return true;
        throw "نام کاربری صحیح نمی باشد";
      }
      throw "نام کاربری نمی تواند خالی باشد";
    }),
    body("email").isEmail().withMessage("ایمیل صحیح نمی باشد"),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمی باشد"),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("رمز عبور باید حداقل 8 و حداکثر 16 کارکتر باشد")
      .custom((value, ctx) => {
        if (!value) throw "رمز عبور نمیتواند خالی باشد";
        if (value !== ctx?.req?.body?.confrim_password)
          throw "رمز عبود وارد شده یکسان نمی باشد";
        return true;
      }),
  ];
}

function loginValidator() {
  return [
    body("username").notEmpty().withMessage("نام کاربری نمی تواند خالی باشد.").custom((username) => {
          const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(username)) return true;
          throw "نام کاربری صحیح نمی باشد";
      }),
      body("password").isLength({min : 6,max:12}).withMessage("رمز عبور باید حداقل 6 و حداکثر 12 کارکتر باشد .")
  ];
}

module.exports = {
  registerValidator,
  loginValidator,
};
