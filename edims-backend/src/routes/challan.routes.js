import { Router } from 'express';
import {
  createChallan,
  getAllChallans,
  getChallanById,
  getChallanItemsSummary, // <-- 1. IMPORT NEW FUNCTION
} from '../controllers/challan.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Protect all challan routes
router.use(protect);

// --- Core Routes ---
router.post('/', createChallan);
router.get('/', getAllChallans);

// --- Helper Route for Bills (must be before /:id route) ---
// (e.g., /api/challans/items-summary/query?challan_ids=1,2)
router.get('/items-summary/query', getChallanItemsSummary);

// Get by ID route (must be last to avoid conflicts)
router.get('/:id', getChallanById);

export default router;