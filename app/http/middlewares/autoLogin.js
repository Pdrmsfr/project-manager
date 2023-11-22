const { UserModel } = require("../../models/user");
const { tokenValidator } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization)
      throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    let token = authorization.split(" ")?.[1];
    if (!token)
      throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    const result = tokenValidator(token);
    const { username } = result;
    console.log(result);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};


module.exports= {
    checkLogin
}