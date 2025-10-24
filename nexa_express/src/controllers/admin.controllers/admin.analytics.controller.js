import {
  getAnalyticsSummary,
  listQuizAttempts,
  listDonations,
  listCourses,
} from "../../services/admin.services/admin.analytics.service.js";
import { streamTablePDF } from "../../utils/admin.utils/pdf.util.js";

const paging = (q) => ({
  limit: Math.min(Number(q.limit) || 50, 1000),
  page: Math.max(Number(q.page) || 1, 1),
});

export const getSummary = async (req, res, next) => {
  try {
    const data = await getAnalyticsSummary();
    res.json({ ok: true, data });
  } catch (e) { next(e); }
};

export const getQuizAttemptsTable = async (req, res, next) => {
  try {
    const data = await listQuizAttempts(paging(req.query));
    res.json({ ok: true, ...data });
  } catch (e) { next(e); }
};

export const getDonationsTable = async (req, res, next) => {
  try {
    const data = await listDonations(paging(req.query));
    res.json({ ok: true, ...data });
  } catch (e) { next(e); }
};

export const getCoursesTable = async (req, res, next) => {
  try {
    const data = await listCourses(paging(req.query));
    res.json({ ok: true, ...data });
  } catch (e) { next(e); }
};

/* ---------- PDFs ---------- */
export const downloadQuizAttemptsPDF = async (req, res, next) => {
  try {
    const { rows } = await listQuizAttempts({ limit: 1000, page: 1 });
    const columns = [
      { key: "studentId",  label: "StudentId", width: 110 },
      { key: "courseId",   label: "CourseId",  width: 110 },
      { key: "quizId",     label: "QuizId",    width: 110 },
      { key: "totalScore", label: "Score",     width: 60  },
      { key: "maxScore",   label: "Max",       width: 50  },
      { key: "percentage", label: "%",         width: 40  },
      { key: "passed",     label: "Passed",    width: 60  },
      { key: "timeSpent",  label: "Time(s)",   width: 60  },
      { key: "completedAt",label: "Completed", width: 120 },
    ];
    const printable = rows.map(r => ({
      ...r,
      passed: r.passed ? "Yes" : "No",
      completedAt: r.completedAt ? new Date(r.completedAt).toISOString().slice(0,19).replace("T"," ") : "",
    }));
    streamTablePDF(res, { title: "Quiz Attempts", columns, rows: printable, fileName: "quiz_attempts.pdf" });
  } catch (e) { next(e); }
};

export const downloadDonationsPDF = async (req, res, next) => {
  try {
    const { rows } = await listDonations({ limit: 1000, page: 1 });
    const columns = [
      { key: "donorName",  label: "Donor",   width: 150 },
      { key: "email",      label: "Email",   width: 180 },
      { key: "amount",     label: "Amount",  width: 80  },
      { key: "currency",   label: "Currency",width: 70  },
      { key: "purpose",    label: "Purpose", width: 90  },
      { key: "status",     label: "Status",  width: 80  },
      { key: "createdAt",  label: "Date",    width: 120 },
    ];
    const printable = rows.map(r => ({
      donorName: r.donor ? `${r.donor.firstName ?? ""} ${r.donor.lastName ?? ""}`.trim() : "—",
      email:     r.donor?.email ?? "—",
      amount:    r.amount,
      currency:  r.currency,
      purpose:   r.purpose || "general",
      status:    r.status,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString().slice(0,19).replace("T"," ") : "",
    }));
    streamTablePDF(res, { title: "Donations", columns, rows: printable, fileName: "donations.pdf" });
  } catch (e) { next(e); }
};

export const downloadCoursesPDF = async (req, res, next) => {
  try {
    const { rows } = await listCourses({ limit: 1000, page: 1 });
    const columns = [
      { key: "title",      label: "Title",    width: 180 },
      { key: "tutorId",    label: "TutorId",  width: 120 },
      { key: "category",   label: "Category", width: 100 },
      { key: "status",     label: "Status",   width: 80  },
      { key: "isActive",   label: "Active",   width: 60  },
      { key: "students",   label: "Enrolled", width: 80  },
      { key: "createdAt",  label: "Created",  width: 120 },
    ];
    const printable = rows.map(r => ({
      title: r.title,
      tutorId: r.tutorId,
      category: r.category || "",
      status: r.status,
      isActive: r.isActive ? "Yes" : "No",
      students: (r.enrolledStudents || []).length,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString().slice(0,19).replace("T"," ") : "",
    }));
    streamTablePDF(res, { title: "Courses", columns, rows: printable, fileName: "courses.pdf" });
  } catch (e) { next(e); }
};
