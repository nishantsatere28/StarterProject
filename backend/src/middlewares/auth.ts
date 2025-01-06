import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {

    const token: string = req.header("Authorization")?.replace("Bearer ", "") || "";
    console.log("Received token:", token);

    if (!token) {
      res.status(400).json({ msg: "Please provide token" });
      return;
    }

    // Verify the token using JWT
    const decoded = jwt.verify(token, 'secret_key') as { user_type: string };
    console.log("Decoded token:", decoded);

    // Check if the user is admin
    if (decoded.user_type !== "admin") {
      res.status(403).json({ msg: "Unauthorized access. Admins only." });
      return;
    }
    
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export { adminAuth };