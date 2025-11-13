import { useState } from "react";
import {
  Squares2X2Icon,
  CubeIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ setPage, collapsed, setCollapsed }) => {
  const [openEntry, setOpenEntry] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openMasters, setOpenMasters] = useState(false); // Track Masters dropdown state
  
  // Get user role from sessionStorage for access control
  const userRole = sessionStorage.getItem('role') || 'Staff'; // Default to Staff if not set
  const isAdmin = userRole === 'Admin';

  return (
    <div
      className={`bg-[#062b52] text-white ${collapsed ? "w-20" : "w-64"} min-h-screen p-4 flex flex-col transition-all duration-300 relative`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold leading-none">Inventory</h1>
            <p className="text-[10px] text-gray-300">Paper Sales</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <ul className="space-y-3 text-sm">
        {/* Dashboard - Available to all */}
        <li
          className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded cursor-pointer transition"
          onClick={() => setPage("Dashboard")}
        >
          <Squares2X2Icon className="h-5 w-5" />
          {!collapsed && <span>Dashboard</span>}
        </li>

        {/* Masters Dropdown - Admin Only */}
        {isAdmin && (
          <li>
            <button
              onClick={() => setOpenMasters(!openMasters)} // Toggle the Masters dropdown
              className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded cursor-pointer w-full transition"
            >
              <CubeIcon className="h-5 w-5" />
              {!collapsed && <span>Masters</span>}
              <ChevronDownIcon
                className={`h-4 w-4 transform transition ${
                  openMasters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Masters dropdown menu */}
            {openMasters && (
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li
                  onClick={() => setPage("ItemMaster")}
                  className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                >
                  {collapsed ? "IM" : "Item Master"}
                </li>
                <li
                  onClick={() => setPage("VendorMaster")}
                  className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                >
                  {collapsed ? "VM" : "Vendor Master"}
                </li>
                <li
                  onClick={() => setPage("DepartmentMaster")}
                  className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                >
                  {collapsed ? "DM" : "Department Master"}
                </li>
                <li
                  onClick={() => setPage("UserManagement")}
                  className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                >
                  {collapsed ? "UM" : "User Management"}
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Entry */}
        {!collapsed && <p className="text-gray-400 text-xs mt-3 uppercase">Entry</p>}
        <li>
          <button
            onClick={() => setOpenEntry(!openEntry)} // Toggle the Entry dropdown
            className="flex w-full items-center justify-between hover:bg-blue-900 p-2 rounded transition"
          >
            <span className="flex items-center gap-2">
              <ClipboardDocumentIcon className="h-5 w-5" />
              {!collapsed && <span>Entry</span>}
            </span>
            {!collapsed && (
              <ChevronDownIcon
                className={`h-4 w-4 transform transition ${openEntry ? "rotate-180" : ""}`}
              />
            )}
          </button>
          {!collapsed && openEntry && (
            <ul className="ml-6 mt-1 space-y-1 text-sm">
              {["Purchase Entry", "Challan Entry", "Bill Entry","Issue Entry"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => setPage(item)}
                    className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          )}
        </li>

        {/* Reports - Admin Only */}
        {isAdmin && (
          <>
            {!collapsed && <p className="text-gray-400 text-xs mt-3 uppercase">Reports</p>}
            <li>
              <button
                onClick={() => setOpenReports(!openReports)} // Toggle the Reports dropdown
                className="flex w-full items-center justify-between hover:bg-blue-900 p-2 rounded transition"
              >
                <span className="flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5" />
                  {!collapsed && <span>Reports</span>}
                </span>
                {!collapsed && (
                  <ChevronDownIcon
                    className={`h-4 w-4 transform transition ${openReports ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              {!collapsed && openReports && (
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  {[
                    "Item Ledger",
                    "Stock Ledger",
                    "Vendor Ledger",
                    "Bill Ledger",
                  ].map((item) => (
                    <li
                      key={item}
                      onClick={() => setPage(item)}
                      className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;
