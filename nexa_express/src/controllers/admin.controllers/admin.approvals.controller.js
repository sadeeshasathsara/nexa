import {
  listPending,
  changeStatus,   
  listApproved,
} from "../../services/admin.services/admin.services.js";

// GET /api/v1/admin/pending?type=tutor|institution
export async function getPending(req, res) {
  try {
    const { type } = req.query;
    const items = await listPending({ type });
    res.json({ type, items });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to fetch pending list" });
  }
}

// PATCH /api/v1/admin/decision/:type
// body: { action, reason?, id? }  OR  { action, reason?, email? } (provide exactly ONE of id or email)
export async function patchDecision(req, res) {
  try {
    const { type } = req.params;
    const { id, email, action, reason } = req.body;
    const item = await changeStatus({ type, id, email, action, reason });
    res.json({ message: "Updated", item });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to update status" });
  }
}

// GET /api/v1/admin/approved?type=tutor|institution&limit=5
export async function getApproved(req, res) {
  try {
    const { type, limit } = req.query;
    const items = await listApproved({ type, limit });
    res.json({ type, items });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to fetch approved list" });
  }
}
