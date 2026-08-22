import { Router } from "express";
import Member from "../models/Member.js";
import Payment from "../models/Payment.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAdmin);

function status(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const days = Math.ceil((end - today) / 86400000);
  return {
    status: days < 0 ? "EXPIRED" : days <= 7 ? "EXPIRING_SOON" : "ACTIVE",
    daysLeft: days,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { search = "", section = "" } = req.query;
    const filter = { archived: false };

    if (section && ["AC", "Non-AC", "Cardio"].includes(section)) {
      filter.section = section;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search } },
      ];
    }

    const members = await Member.find(filter).sort({ endDate: 1 });

    res.json(
      members.map((m) => ({
        ...m.toObject(),
        ...status(m.endDate),
      })),
    );
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const member = await Member.findOne({
      _id: req.params.id,
      archived: false,
    });
    if (!member) return res.status(404).json({ message: "Member not found" });

    const payments = await Payment.find({ memberId: member._id }).sort({
      paymentDate: -1,
    });

    res.json({
      member: { ...member.toObject(), ...status(member.endDate) },
      payments,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      mobile,
      section,
      planName,
      durationMonths,
      startDate,
      endDate,
      fee,
      paidAmount,
      paymentMethod,
      notes,
    } = req.body;

    if (!name || !mobile || !section || !planName || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const member = await Member.create({
      name,
      mobile,
      section,
      planName,
      durationMonths: Number(durationMonths),
      startDate,
      endDate,
      fee: Number(fee) || 0,
      paidAmount: Number(paidAmount) || 0,
      notes,
    });

    if (Number(paidAmount) > 0) {
      await Payment.create({
        memberId: member._id,
        memberName: member.name,
        section: member.section,
        amount: Number(paidAmount),
        paymentMethod: paymentMethod || "Cash",
        notes: "Membership payment",
      });
    }

    res.status(201).json(member);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id, archived: false },
      req.body,
      { new: true, runValidators: true },
    );
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true },
    );
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member removed" });
  } catch (e) {
    next(e);
  }
});

router.post("/:id/renew", async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    const { startDate, durationMonths, fee, paidAmount, paymentMethod } =
      req.body;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + Number(durationMonths));

    member.startDate = start;
    member.endDate = end;
    member.durationMonths = Number(durationMonths);
    member.planName = `${durationMonths} Month${Number(durationMonths) > 1 ? "s" : ""}`;
    member.fee = Number(fee) || 0;
    member.paidAmount = Number(paidAmount) || 0;
    await member.save();

    if (Number(paidAmount) > 0) {
      await Payment.create({
        memberId: member._id,
        memberName: member.name,
        section: member.section,
        amount: Number(paidAmount),
        paymentMethod: paymentMethod || "Cash",
        notes: "Renewal",
      });
    }

    res.json(member);
  } catch (e) {
    next(e);
  }
});


export default router;
