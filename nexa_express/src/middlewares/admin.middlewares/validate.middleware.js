export function requireFields(fields) {
    return function (req, res, next) {
      const missing = fields.filter(f => !(f in req.body));
      if (missing.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missing.join(", ")}`
        });
      }
      next();
    };
  }