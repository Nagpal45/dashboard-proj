import { Router } from "express";
import { prisma } from "../index";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const cohort = await prisma.cohort.create({ data: { name } });
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const cohorts = await prisma.cohort.findMany({
      include: { courses: true, students: true },
    });
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const cohort = await prisma.cohort.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cohort.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
