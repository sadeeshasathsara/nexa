// SERVICES: Aggregate + listings for Admin Analytics
import Donation from "../../models/donor.models/donation.model.js";
import Course from "../../models/tutor.models/course.model.js";
import QuizAttempt from "../../models/student.models/quizAttempt.model.js";
import StudentProgress from "../../models/student.models/studentProgress.model.js";

export async function getAnalyticsSummary() {
  const [
    totalCourses,
    publishedCourses,
    totalDonationsAgg,
    totalDonationsCount,
    recentDonation,
    totalQuizAttempts,
    passRateAgg,
    avgScoreAgg,
    totalEnrollmentsAgg,
  ] = await Promise.all([
    Course.countDocuments({}),
    Course.countDocuments({ status: "published" }),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    Donation.countDocuments({}),
    Donation.findOne({}).sort({ createdAt: -1 }).lean(),
    QuizAttempt.countDocuments({}),
    QuizAttempt.aggregate([
      { $group: { _id: null, passRate: { $avg: { $cond: ["$passed", 1, 0] } } } },
    ]),
    QuizAttempt.aggregate([{ $group: { _id: null, avg: { $avg: "$percentage" } } }]),
    StudentProgress.aggregate([{ $group: { _id: null, total: { $sum: { $size: "$completedLessons" } } } }]),
  ]);

  return {
    courses: {
      total: totalCourses,
      published: publishedCourses,
    },
    donations: {
      totalAmount: totalDonationsAgg?.[0]?.total || 0,
      count: totalDonationsCount,
      lastDonationAt: recentDonation?.createdAt || null,
    },
    quizzes: {
      attempts: totalQuizAttempts,
      passRate: +(passRateAgg?.[0]?.passRate || 0),
      avgPercentage: +(avgScoreAgg?.[0]?.avg || 0),
    },
    learning: {
      totalCompletedLessons: totalEnrollmentsAgg?.[0]?.total || 0,
    },
  };
}

export async function listQuizAttempts({ limit = 50, page = 1 }) {
  const skip = (page - 1) * limit;
  const [rows, total] = await Promise.all([
    QuizAttempt.find()
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    QuizAttempt.countDocuments(),
  ]);

  // Process rows - just use IDs for now since we can't get names
  const processedRows = rows.map(attempt => ({
    ...attempt,
    studentName: `Student (${attempt.studentId})`,
    courseName: `Course (${attempt.courseId})`,
  }));

  return { rows: processedRows, total, page, limit };
}

export async function listDonations({ limit = 50, page = 1 }) {
  const skip = (page - 1) * limit;
  const [rows, total, sumAgg] = await Promise.all([
    Donation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Donation.countDocuments(),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
  ]);

  // Process donations - use placeholder names
  const processedRows = rows.map(donation => ({
    ...donation,
    donorName: "Anonymous Donor",
    donorEmail: "—",
  }));

  return {
    rows: processedRows,
    total,
    totalAmount: sumAgg?.[0]?.total || 0,
    page,
    limit,
  };
}

export async function listCourses({ limit = 50, page = 1 }) {
  const skip = (page - 1) * limit;
  const [rows, total, published] = await Promise.all([
    Course.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Course.countDocuments(),
    Course.countDocuments({ status: "published" }),
  ]);

  // Process courses - use placeholder tutor name
  const processedRows = rows.map(course => ({
    ...course,
    tutorName: `Tutor (${course.tutorId})`,
    enrollmentCount: course.enrolledStudents?.length || 0,
  }));

  return { 
    rows: processedRows, 
    total, 
    publishedCount: published, 
    page, 
    limit 
  };
}

// Additional utility functions for detailed analytics
export async function getDetailedQuizAnalytics() {
  const quizAttempts = await QuizAttempt.find().sort({ completedAt: -1 }).lean();

  const processedAttempts = quizAttempts.map(attempt => ({
    ...attempt,
    studentName: `Student (${attempt.studentId})`,
    courseName: `Course (${attempt.courseId})`,
  }));

  const analytics = {
    totalAttempts: quizAttempts.length,
    averageScore: 0,
    passRate: 0,
    totalStudents: new Set(quizAttempts.map(attempt => attempt.studentId?.toString())).size,
    totalCourses: new Set(quizAttempts.map(attempt => attempt.courseId?.toString())).size,
    attempts: processedAttempts
  };

  if (quizAttempts.length > 0) {
    const totalPercentage = quizAttempts.reduce((sum, attempt) => sum + (attempt.percentage || 0), 0);
    const passedAttempts = quizAttempts.filter(attempt => attempt.passed).length;
    
    analytics.averageScore = (totalPercentage / quizAttempts.length).toFixed(2);
    analytics.passRate = ((passedAttempts / quizAttempts.length) * 100).toFixed(2);
  }

  return analytics;
}

export async function getDetailedDonationsAnalytics() {
  const donations = await Donation.find().sort({ createdAt: -1 }).lean();

  const processedDonations = donations.map(donation => ({
    ...donation,
    donorName: "Anonymous Donor",
    donorEmail: "—",
  }));

  return {
    totalDonations: processedDonations.length,
    totalAmount: processedDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0),
    averageDonation: processedDonations.length > 0 
      ? processedDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0) / processedDonations.length 
      : 0,
    donations: processedDonations
  };
}

export async function getDetailedCoursesAnalytics() {
  const courses = await Course.find().sort({ createdAt: -1 }).lean();

  const processedCourses = courses.map(course => ({
    ...course,
    tutorName: `Tutor (${course.tutorId})`,
    enrollmentCount: course.enrolledStudents?.length || 0,
  }));

  return {
    totalCourses: processedCourses.length,
    publishedCourses: processedCourses.filter(course => course.status === 'published').length,
    totalEnrollments: processedCourses.reduce((sum, course) => sum + course.enrollmentCount, 0),
    averageEnrollments: processedCourses.length > 0 
      ? processedCourses.reduce((sum, course) => sum + course.enrollmentCount, 0) / processedCourses.length 
      : 0,
    courses: processedCourses
  };
}