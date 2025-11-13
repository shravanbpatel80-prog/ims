import { useState } from "react";
import {
  Squares2X2Icon,
  CubeIcon,
<<<<<<< HEAD
  UsersIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
=======
  ClipboardDocumentIcon,
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
  ChartBarIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ setPage, collapsed, setCollapsed }) => {
  const [openEntry, setOpenEntry] = useState(false);
  const [openReports, setOpenReports] = useState(false);
<<<<<<< HEAD
  const [openMasters, setOpenMasters] = useState(false); // Track Masters dropdown state
  
  // Get user role from sessionStorage for access control
  const userRole = sessionStorage.getItem('role') || 'Staff'; // Default to Staff if not set
  const isAdmin = userRole === 'Admin';

  return (
    <div
      className={`bg-[#062b52] text-white ${collapsed ? "w-20" : "w-64"} min-h-screen p-4 flex flex-col transition-all duration-300 relative`}
=======
  const [openMasters, setOpenMasters] = useState(false);

  const userRole = sessionStorage.getItem("role") || "Staff";
  const isAdmin = userRole === "Admin";

  return (
    <div
      className={`bg-[#062b52] text-white ${
        collapsed ? "w-20" : "w-64"
      } h-screen p-4 flex flex-col transition-all duration-300 flex-shrink-0 overflow-y-auto`}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
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
<<<<<<< HEAD
        {/* Dashboard - Available to all */}
=======
        {/* Dashboard */}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
        <li
          className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded cursor-pointer transition"
          onClick={() => setPage("Dashboard")}
        >
          <Squares2X2Icon className="h-5 w-5" />
          {!collapsed && <span>Dashboard</span>}
        </li>

<<<<<<< HEAD
        {/* Masters Dropdown - Admin Only */}
        {isAdmin && (
          <li>
            <button
              onClick={() => setOpenMasters(!openMasters)} // Toggle the Masters dropdown
=======
        {/* Masters Dropdown (Admin Only) */}
        {isAdmin && (
          <li>
            <button
              onClick={() => !collapsed && setOpenMasters(!openMasters)} // ✅ prevent open in collapsed
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
              className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded cursor-pointer w-full transition"
            >
              <CubeIcon className="h-5 w-5" />
              {!collapsed && <span>Masters</span>}
<<<<<<< HEAD
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
=======
              {!collapsed && (
                <ChevronDownIcon
                  className={`h-4 w-4 transform transition ${
                    openMasters ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Masters dropdown menu */}
            {!collapsed && openMasters && (
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                {[
                  { label: "Item Master", key: "ItemMaster" },
                  { label: "Vendor Master", key: "VendorMaster" },
                  { label: "Department Master", key: "DepartmentMaster" },
                  { label: "User Management", key: "UserManagement" },
                ].map((item) => (
                  <li
                    key={item.key}
                    onClick={() => setPage(item.key)}
                    className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                  >
                    {item.label}
                  </li>
                ))}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
              </ul>
            )}
          </li>
        )}

        {/* Entry */}
<<<<<<< HEAD
        {!collapsed && <p className="text-gray-400 text-xs mt-3 uppercase">Entry</p>}
        <li>
          <button
            onClick={() => setOpenEntry(!openEntry)} // Toggle the Entry dropdown
=======
        {!collapsed && (
          <p className="text-gray-400 text-xs mt-3 uppercase">Entry</p>
        )}
        <li>
          <button
            onClick={() => !collapsed && setOpenEntry(!openEntry)}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
            className="flex w-full items-center justify-between hover:bg-blue-900 p-2 rounded transition"
          >
            <span className="flex items-center gap-2">
              <ClipboardDocumentIcon className="h-5 w-5" />
              {!collapsed && <span>Entry</span>}
            </span>
            {!collapsed && (
              <ChevronDownIcon
<<<<<<< HEAD
                className={`h-4 w-4 transform transition ${openEntry ? "rotate-180" : ""}`}
=======
                className={`h-4 w-4 transform transition ${
                  openEntry ? "rotate-180" : ""
                }`}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
              />
            )}
          </button>
          {!collapsed && openEntry && (
            <ul className="ml-6 mt-1 space-y-1 text-sm">
<<<<<<< HEAD
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
=======
              {[
                "Purchase Entry",
                "Challan Entry",
                "Bill Entry",
                "Issue Entry",
              ].map((item) => (
                <li
                  key={item}
                  onClick={() => setPage(item)}
                  className="cursor-pointer hover:bg-blue-700 p-2 rounded transition"
                >
                  {item}
                </li>
              ))}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
            </ul>
          )}
        </li>

<<<<<<< HEAD
        {/* Reports - Admin Only */}
        {isAdmin && (
          <>
            {!collapsed && <p className="text-gray-400 text-xs mt-3 uppercase">Reports</p>}
            <li>
              <button
                onClick={() => setOpenReports(!openReports)} // Toggle the Reports dropdown
=======
        {/* Reports (Admin Only) */}
        {isAdmin && (
          <>
            {!collapsed && (
              <p className="text-gray-400 text-xs mt-3 uppercase">Reports</p>
            )}
            <li>
              <button
                onClick={() => !collapsed && setOpenReports(!openReports)}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
                className="flex w-full items-center justify-between hover:bg-blue-900 p-2 rounded transition"
              >
                <span className="flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5" />
                  {!collapsed && <span>Reports</span>}
                </span>
                {!collapsed && (
                  <ChevronDownIcon
<<<<<<< HEAD
                    className={`h-4 w-4 transform transition ${openReports ? "rotate-180" : ""}`}
=======
                    className={`h-4 w-4 transform transition ${
                      openReports ? "rotate-180" : ""
                    }`}
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
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
<<<<<<< HEAD

=======
>>>>>>> 1107e91 (reports addeed & sidebar navbar static)
      </ul>
    </div>
  );
};

export default Sidebar;
