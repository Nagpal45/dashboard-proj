import { Router } from "express";
import { prisma } from "../index";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, courses, cohortId } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        cohortId: Number(cohortId),
        courses: {
          create: courses.map((courseId: Number) => ({
            courseId: Number(courseId),
          })),
        },
      },
      include: { courses: true },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, courses } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        name: name,
        status: status,
        courses: {
          set: courses.map((courseId: Number) => ({
            courseId: Number(courseId),
          })),
        },
      },
      include: { courses: true },
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const { cohortId } = req.body;
    const students = await prisma.student.findMany({
      where: { cohortId: Number(cohortId) },
      include: { courses: true },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await prisma.studentCourse.findMany({
      where: { studentId: Number(id) },
      include: { course: true },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
