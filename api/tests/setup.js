// Must be imported before anything from src/ so env.js picks these values up.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-that-is-long-enough-for-tests";
