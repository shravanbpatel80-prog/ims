import {
  sequelize,
  Challan,
  ChallanItem,
  PurchaseOrder,
  PurchaseOrderItem,
  Item,
  Department,
  User, // <-- Added User for getAllChallans
} from '../models/index.js';
import { Op } from 'sequelize';

// --- 1. Create a new Challan (Admin & Staff) ---
// (This is your existing, correct function)
export const createChallan = async (req, res) => {
  const t = await sequelize.transaction();
  let challan_id;

  try {
    const { challan_no, po_id, delivery_date, items } = req.body;
    const user_id = req.user.id;

    if (!challan_no || !po_id || !delivery_date || !items) {
      throw new Error('Missing required fields');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items must be a non-empty array');
    }

    const newChallan = await Challan.create(
      { challan_no, po_id, user_id, delivery_date },
      { transaction: t }
    );
    challan_id = newChallan.challan_id;

    for (const item of items) {
      if (!item.item_id || !item.quantity_received) {
        throw new Error('Each item must have an item_id and quantity_received');
      }

      await ChallanItem.create(
        {
          challan_id: challan_id,
          item_id: item.item_id,
          quantity_received: item.quantity_received,
        },
        { transaction: t }
      );

      const poItem = await PurchaseOrderItem.findOne({
        where: { po_id: po_id, item_id: item.item_id },
        transaction: t,
      });

      if (!poItem) {
        throw new Error(`Item ID ${item.item_id} not found on PO ID ${po_id}`);
      }

      const newReceivedQty = poItem.quantity_received + item.quantity_received;
      if (newReceivedQty > poItem.quantity_ordered) {
        throw new Error(`Cannot receive more than ordered for Item ID ${item.item_id}`);
      }
      
      poItem.quantity_received = newReceivedQty;
      await poItem.save({ transaction: t });

      const masterItem = await Item.findByPk(item.item_id, { transaction: t });
      if (!masterItem) {
        throw new Error(`Master Item ID ${item.item_id} not found`);
      }
      
      masterItem.current_stock += item.quantity_received;
      await masterItem.save({ transaction: t });
    }
    
    const allPoItems = await PurchaseOrderItem.findAll({
      where: { po_id: po_id },
      transaction: t,
    });
    
    const isPoComplete = allPoItems.every(
      (pi) => pi.quantity_received >= pi.quantity_ordered
    );

    if (isPoComplete) {
      const po = await PurchaseOrder.findByPk(po_id, { transaction: t });
      po.status = 'Completed';
      await po.save({ transaction: t });
    }

    await t.commit();

    res.status(201).json({ 
      message: 'Challan created and stock updated successfully', 
      challan_id: challan_id 
    });

  } catch (error) {
    if (t.finished !== 'commit' && t.finished !== 'rollback') {
      await t.rollback();
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Challan number already exists' });
    }
    if (error.message.includes('Missing') || error.message.includes('Items must') || error.message.includes('Cannot receive')) {
        return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error during transaction', error: error.message });
  }
};

// --- 2. Get All Challans ---
export const getAllChallans = async (req, res) => {
  try {
    const challans = await Challan.findAll({
      order: [['delivery_date', 'DESC']],
      include: [
        { model: PurchaseOrder, attributes: ['purchase_no'], required: false },
        { model: User, attributes: ['full_name'], required: false }
      ]
    });
    res.status(200).json(challans);
  } catch (error) {
    console.error('❌ Error fetching challans:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- 3. Get Challan by ID ---
// (We should add this function if it's missing)
export const getChallanById = async (req, res) => {
  try {
    const { id } = req.params;
    const challan = await Challan.findByPk(id, {
      include: [
        { model: PurchaseOrder, attributes: ['purchase_no', 'vendor_id'] },
        { model: User, attributes: ['full_name'] },
        { 
          model: ChallanItem,
          include: [{ model: Item, attributes: ['item_name', 'size', 'color']}]
        }
      ]
    });
    if (!challan) {
      return res.status(404).json({ message: 'Challan not found' });
    }
    res.status(200).json(challan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// --- 4. NEW: Get Item Summary from multiple Challans ---
// This is the new helper for the Bill page
export const getChallanItemsSummary = async (req, res) => {
  try {
    // Get challan_ids from query string (e.g., ?challan_ids=1,2,3)
    const { challan_ids } = req.query;

    if (!challan_ids) {
      return res.status(400).json({ message: 'challan_ids query parameter is required.' });
    }

    // Convert string "1,2,3" into an array [1, 2, 3]
    const ids = challan_ids.split(',').map(id => parseInt(id.trim(), 10));

    // This is the core logic
    const itemsSummary = await ChallanItem.findAll({
      where: {
        challan_id: {
          [Op.in]: ids,
        },
      },
      include: [
        {
          model: Item,
          attributes: ['item_name', 'size', 'color'],
        },
      ],
      attributes: [
        'item_id',
        // Sum the quantities for each item_id
        [sequelize.fn('SUM', sequelize.col('quantity_received')), 'total_quantity'],
      ],
      group: ['item_id', 'Item.item_id', 'Item.item_name', 'Item.size', 'Item.color'],
      raw: true, // Get plain JSON results
    });

    // We need to re-map the results because sequelize grouping is complex
    const formattedSummary = itemsSummary.map(item => ({
      item_id: item.item_id,
      item_name: item['Item.item_name'],
      size: item['Item.size'],
      color: item['Item.color'],
      total_quantity: parseInt(item.total_quantity, 10),
    }));

    res.status(200).json(formattedSummary);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};