import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too may requests, please try again later",
      });
    }

    next();
  } catch (err) {
    console.log("Rate limit error", err);
    next(err);
  }
};

export default rateLimiter;
