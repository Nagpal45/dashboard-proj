import { Router } from "express";
import { prisma } from "../index";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, cohortId } = req.body;
    const course = await prisma.course.create({
      data: { name, cohortId: Number(cohortId) },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const courses = await prisma.course.findMany({
      where: { cohortId: Number(cohortId) },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
