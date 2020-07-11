import { Router, Request, Response } from "express";
import { fetchAnalyzedStocks } from "../lib/sqlite";

const router: Router = Router();

router.get(
  "/analyzed-stocks/:year/:month/:day",
  async (req: Request, res: Response) => {
    let { year, month, day } = req.params;

    if (
      isNaN(parseInt(year)) ||
      isNaN(parseInt(month)) ||
      isNaN(parseInt(day))
    ) {
      return res.send("Invalid Parameters.");
    }

    // if numbers(month | day) are less than 10 and doesn't start a character zero
    // push zero to the front of the number.
    if (parseInt(month) < 10 && !month.startsWith("0")) {
      month = "0" + month;
    }
    if (parseInt(day) < 10 && !day.startsWith("0")) {
      day = "0" + day;
    }

    try {
      const stocks: any = await fetchAnalyzedStocks(year, month, day);
      return res.json(stocks);
    } catch (e) {
      console.error(e);
      return res.json({
        status: 500,
        err: "Server Error",
      });
    }
  }
);

export const StockController: Router = router;
