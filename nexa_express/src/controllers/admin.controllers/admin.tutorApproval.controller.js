import {
  getPendingTutors,
  getApprovedTutors,
  updateTutorApproval,
} from "../../services/admin.services/tutorApproval.service.js";

// GET /api/v1/admin/tutors/pending
export async function getPendingTutorsController(req, res) {
  try {
    const data = await getPendingTutors();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// GET /api/v1/admin/tutors/approved
export async function getApprovedTutorsController(req, res) {
  try {
    const limit = Number(req.query.limit) || 20;
    const data = await getApprovedTutors(limit);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// PATCH /api/v1/admin/tutors/decision/:id
export async function updateTutorApprovalController(req, res) {
  try {
    const { id } = req.params;
    const { action, reason } = req.body;
    const data = await updateTutorApproval({ accountId: id, action, reason });
    res.status(200).json({ success: true, message: "Status updated", data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
