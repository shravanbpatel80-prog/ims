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

export default function PageManager() {
  const [page, setPage] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 transition-all duration-300 p-6 overflow-auto">
          {page === "Dashboard" && <h1 className="text-2xl font-bold">Dashboard</h1>}
          {page === "ItemMaster" && <ItemMaster />}
          {page === "VendorMaster" && <VendorMaster/>}
          {page === "DepartmentMaster" && <DepartmentMaster/>}
          {page === "UserManagement" && <UserManagement/>}
          {page === "Purchase Entry" && <PurchaseEntry/>}
          {page === "Challan Entry" && <ChallanEntry/>}
          {page === "Bill Entry" && <BillEntry/>}
          {page === "Issue Entry" && <IssueEntry/>}
          {page === "Item Ledger" && <h1>Item Ledger</h1>}
          {page === "Stock Ledger" && <h1>Stock Ledger</h1>}
          {page === "Vendor Ledger" && <h1>Vendor Ledger</h1>}
          {page === "Bill Ledger" && <h1>Bill Ledger</h1>}
        </main>
      </div>
    </div>
  );
}

