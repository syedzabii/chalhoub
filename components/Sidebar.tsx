"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isStoreChatsOpen, setIsStoreChatsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 w-64 h-screen bg-gray-900 text-white p-4 flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <h1 className="text-xl font-bold mb-8">Admin Dashboard</h1>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin/crm" 
                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CRM
              </Link>
            </li>
            
            <li>
              <button 
                onClick={() => setIsStoreChatsOpen(!isStoreChatsOpen)}
                className="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                <span>Store Chats</span>
                <span>{isStoreChatsOpen ? '▼' : '▶'}</span>
              </button>
              
              {isStoreChatsOpen && (
                <ul className="pl-4 mt-2 space-y-1">
                  <li>
                    <Link 
                      href="/admin/store-chats/live" 
                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Live Chats
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/store-chats/history" 
                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Chat History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            <li>
              <Link 
                href="/admin/campaigns" 
                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Campaigns
              </Link>
            </li>
            
            <li>
              <Link 
                href="/admin/settings" 
                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
