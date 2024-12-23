import { Router } from "express";
import { prisma } from "../index";

interface Student {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  cohort: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  courses: {
    course: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
}

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
      where: { 
        id: Number(id) 
      },
      data: {
        name,
        status,
        courses: {
          deleteMany: {}, 
          create: courses.map((courseId: number) => ({
            course: {
              connect: { id: Number(courseId) }
            }
          }))
        }
      },
      include: {
        courses: {
          include: {
            course: true
          }
        }
      }
    });
    
    res.json(updatedStudent);
  } catch (error) {
    console.error("Prisma error:", error);
  }
});


router.get("/:cohortId?", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const { courseId } = req.query;
    const cohortFilter = cohortId ? { cohortId: Number(cohortId) } : {};

    const courseFilter = courseId
      ? {
          courses: {
            some: {
              courseId: Number(courseId)
            }
          }
        }
      : {};

    const filter = {
      ...cohortFilter,
      ...courseFilter
    };

    const students = await prisma.student.findMany({
      where: filter,
      include: {
        cohort: { 
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        courses: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
              }
            }
          }
        }
      }
    });

    const transformedStudents = students.map((student: Student) => ({
      id: student.id,
      name: student.name,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      cohort: student.cohort ? {
        id: student.cohort.id,
        name: student.cohort.name,
        createdAt: student.cohort.createdAt,
        updatedAt: student.cohort.updatedAt
      } : null,
      courses: student.courses.map((sc: Student["courses"][0]) => ({
        id: sc.course.id,
        name: sc.course.name,
        enrolledAt: sc.createdAt,
        lastUpdated: sc.updatedAt
      }))
    }));

    res.json(transformedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ 
      error: "Failed to fetch students",
      details: error
    });
  }
});




export default router;
