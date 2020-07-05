import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("test");
});

export const StockController: Router = router;
