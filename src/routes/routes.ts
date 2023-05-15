// routes.ts
import express, { Request, Response } from "express";
import { updatePrices } from "../services/updatePrices";

const router = express.Router();

// Endpoint to update prices
router.post("/update-prices", (req: Request, res: Response) => {
  try {
    const products = req.body;
    
    // Update prices
    updatePrices();
    
    // Send success response
    res.status(200).json({ message: "Prices updated successfully" });
  } catch (error) {
    // Send error response
    res.status(400).json({ error: error.message });
  }
});

export default router;
