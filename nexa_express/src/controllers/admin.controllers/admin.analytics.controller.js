import {
  getAnalyticsSummary,
  listQuizAttempts,
  listDonations,
  listCourses,
} from "../../services/admin.services/admin.analytics.service.js";
import { streamPrettyTablePDF } from "../../utils/admin.utils/pdf.util.js";

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

/* ---------- PDFs (PRETTY) ---------- */

export const downloadQuizAttemptsPDF = async (req, res, next) => {
  try {
    const { rows } = await listQuizAttempts({ limit: 2000, page: 1 });
    const columns = [
      { key: "studentId",  label: "Student",   width: 120 },
      { key: "courseId",   label: "Course",    width: 120 },
      { key: "quizId",     label: "Quiz",      width: 110 },
      { key: "totalScore", label: "Score",     width: 55, align:"right" },
      { key: "maxScore",   label: "Max",       width: 45, align:"right" },
      { key: "percentage", label: "%",         width: 40, align:"right" },
      { key: "passed",     label: "Passed",    width: 55, align:"center" },
      { key: "timeSpent",  label: "Time(s)",   width: 60, align:"right" },
      { key: "completedAt",label: "Completed", width: 120 },
    ];

    const printable = rows.map(r => ({
      ...r,
      passed: r.passed ? "Yes" : "No",
      completedAt: r.completedAt ? new Date(r.completedAt).toLocaleString() : "",
    }));

    streamPrettyTablePDF(res, {
      title: "Quiz Attempts",
      subtitle: "All attempts (latest first)",
      columns,
      rows: printable,
      fileName: "quiz_attempts.pdf",
      totals: {
        label: "Totals / Averages",
        cells: {
          totalScore: (vals) => vals.reduce((a,b)=>a+(+b||0),0),
          maxScore:   (vals) => vals.reduce((a,b)=>a+(+b||0),0),
          percentage: (vals) => (vals.reduce((a,b)=>a+(+b||0),0) / (vals.length||1)).toFixed(1),
          timeSpent:  (vals) => vals.reduce((a,b)=>a+(+b||0),0),
        }
      }
    });
  } catch (e) { next(e); }
};

export const downloadDonationsPDF = async (req, res, next) => {
  try {
    const { rows, totalAmount } = await listDonations({ limit: 2000, page: 1 });
    const columns = [
      { key: "donorName",  label: "Donor",     width: 160 },
      { key: "email",      label: "Email",     width: 180 },
      { key: "amount",     label: "Amount",    width: 70, align:"right" },
      { key: "currency",   label: "Curr",      width: 45, align:"center" },
      { key: "purpose",    label: "Purpose",   width: 90 },
      { key: "status",     label: "Status",    width: 70, align:"center" },
      { key: "createdAt",  label: "Date",      width: 120 },
    ];

    const printable = rows.map(r => ({
      donorName: r.donor ? `${r.donor.firstName ?? ""} ${r.donor.lastName ?? ""}`.trim() : "—",
      email:     r.donor?.email ?? "—",
      amount:    (+r.amount || 0).toFixed(2),
      currency:  r.currency || "",
      purpose:   r.purpose || "general",
      status:    r.status || "",
      createdAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
    }));

    streamPrettyTablePDF(res, {
      title: "Donations",
      subtitle: "Summary of donations",
      columns,
      rows: printable,
      fileName: "donations.pdf",
      totals: {
        label: "Totals",
        cells: {
          amount: () => (+totalAmount || 0).toFixed(2),
        }
      }
    });
  } catch (e) { next(e); }
};

export const downloadCoursesPDF = async (req, res, next) => {
  try {
    const { rows, publishedCount } = await listCourses({ limit: 2000, page: 1 });
    const columns = [
      { key: "title",      label: "Title",     width: 180 },
      { key: "tutorId",    label: "TutorId",   width: 120 },
      { key: "category",   label: "Category",  width: 90 },
      { key: "status",     label: "Status",    width: 70, align:"center" },
      { key: "isActive",   label: "Active",    width: 55, align:"center" },
      { key: "students",   label: "Enrolled",  width: 70, align:"right" },
      { key: "createdAt",  label: "Created",   width: 110 },
    ];

    const printable = rows.map(r => ({
      title: r.title,
      tutorId: r.tutorId,
      category: r.category || "",
      status: r.status,
      isActive: r.isActive ? "Yes" : "No",
      students: (r.enrolledStudents || []).length,
      createdAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
    }));

    streamPrettyTablePDF(res, {
      title: "Courses",
      subtitle: `Published: ${publishedCount} • Total: ${rows.length}`,
      columns,
      rows: printable,
      fileName: "courses.pdf",
      totals: {
        label: "Totals",
        cells: {
          students: (vals) => vals.reduce((a,b)=>a+(+b||0),0),
        }
      }
    });
  } catch (e) { next(e); }
};
