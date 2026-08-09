import User from "../Models/userModel";
import jwt from 'jsonwebtoken'
 const signUp = (async (req: { body: { name: any; email: any; role: any; password: any; confirmPassword: any; username: string}; }, res: any, next: any) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email, //REQUEST EVERYTHING INDIVIDUALLY SO THAT USER CAN'T SEND ADDITIONAL DATA TO
    // ASSIGN NY ROLES HIMSELF
    username: req.body.username,
    role: 'USER',
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    //passwordChangedAt: req.body.passwordChangedAt,
  });
  createSendToken(newUser, 201, res);
});
const createSendToken = (user: any, statusCode: number, res:any) => {
  const token = signToken(user._id);
  const cookieOptions:any = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  //remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
const signToken = (id: any) =>
  {
    const secret: any = process.env.JWT_SECRET! || ''
    const expiresIn : jwt.SignOptions["expiresIn"] = process.env.JWT_EXPIRES_IN! as jwt.SignOptions["expiresIn"] || '90d'
    return jwt.sign({ id }, secret, {
    expiresIn: expiresIn,
  })};

  const userController = {
    signUp
  }

  export default userController