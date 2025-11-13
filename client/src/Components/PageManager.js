import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ItemMaster from "../pages/IItemMaster";
import VendorMaster from "../pages/VendorMaster";
import DepartmentMaster from "../pages/DepartmentMaster";
import UserManagement from "../pages/UserManagement";
import PurchaseEntry from "../pages/PurchaseEntry";
import ChallanEntry from "../pages/ChallanEntry";
import BillEntry from "../pages/BillEntry";
import IssueEntry from "../pages/IssueEntry";
<<<<<<< HEAD
=======
import ItemLedger from "../pages/ItemLedger";
import StockLedger from "../pages/StockLedger";
import VendorLedger from "../pages/VendorLedger";
import BillLedger from "../pages/BillLedger";
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)

export default function PageManager() {
  const [page, setPage] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
=======
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
<<<<<<< HEAD
        <main className="flex-1 bg-gray-50 transition-all duration-300 p-6 overflow-auto">
=======
        <main className="flex-1 overflow-y-auto transition-all duration-300 p-6 bg-gray-50 min-h-0">
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
          {page === "Dashboard" && <h1 className="text-2xl font-bold">Dashboard</h1>}
          {page === "ItemMaster" && <ItemMaster />}
          {page === "VendorMaster" && <VendorMaster/>}
          {page === "DepartmentMaster" && <DepartmentMaster/>}
          {page === "UserManagement" && <UserManagement/>}
          {page === "Purchase Entry" && <PurchaseEntry/>}
          {page === "Challan Entry" && <ChallanEntry/>}
          {page === "Bill Entry" && <BillEntry/>}
          {page === "Issue Entry" && <IssueEntry/>}
<<<<<<< HEAD
          {page === "Item Ledger" && <h1>Item Ledger</h1>}
          {page === "Stock Ledger" && <h1>Stock Ledger</h1>}
          {page === "Vendor Ledger" && <h1>Vendor Ledger</h1>}
          {page === "Bill Ledger" && <h1>Bill Ledger</h1>}
=======
          {page === "Item Ledger" && <ItemLedger />}
          {page === "Stock Ledger" && <StockLedger />}
          {page === "Vendor Ledger" && <VendorLedger />}
          {page === "Bill Ledger" && <BillLedger />}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
        </main>
      </div>
    </div>
  );
}

