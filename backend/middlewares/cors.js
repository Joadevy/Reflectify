import cors from "cors";

import allowedOrigins from "../config/allowedOrigins.js";

export const corsMiddleware = ({ acceptedOrigins = allowedOrigins } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
  });
