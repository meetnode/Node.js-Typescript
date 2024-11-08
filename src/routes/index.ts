import { Router, Request, Response, NextFunction } from "express";
var router = Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).render("index", { title: "Express" });
});

export default router;
