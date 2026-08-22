import { Router } from "express";
import Payment from "../models/Payment.js";
import Member from "../models/Member.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAdmin);

router.get("/", async (_req, res, next) => {
  try {
    res.json(await Payment.find().sort({ paymentDate: -1 }).limit(1000));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { memberId, amount, paymentMethod, notes } = req.body;
    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ message: "Member not found" });

    const payment = await Payment.create({
      memberId,
      memberName: member.name,
      section: member.section,
      amount: Number(amount),
      paymentMethod: paymentMethod || "Cash",
      notes
    });

    member.paidAmount += Number(amount);
    await member.save();

    res.status(201).json(payment);
  } catch (e) { next(e); }
});

export default router;
