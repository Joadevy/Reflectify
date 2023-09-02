const allowedOriginsModule = await import("../config/allowedOrigins.js");

const credentials = async (req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = allowedOriginsModule.default;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
