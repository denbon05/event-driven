export default () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  userServiceURL: process.env.USER_SERVICE_URL,
});
