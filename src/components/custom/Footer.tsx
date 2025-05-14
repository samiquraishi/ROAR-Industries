import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EnquiryForm } from "./EnquiryForm";

export function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <footer className="w-full py-12 mt-auto bg-neutral-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Grid layout: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm text-gray-400">
          {/* Column 1: Logo and Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-icon.png" alt="ROAR Industries" className="h-12 w-12" />
            </div>
            <p>
              Unleashing Bold Innovation. Building the Future with cutting-edge solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="pl-24">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Column 3: Enquire Button */}
          <div className="pl-56">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className="px-5 py-2 text-md font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-3xl shadow-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Enquire Now
                </button>
              </DialogTrigger>
              <DialogContent className="bg-black rounded-md p-8 w-full max-w-md shadow-2xl backdrop-blur-sm">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl text-center font-bold text-white bg-clip-text">
                    Let's Connect
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <EnquiryForm onSuccess={() => setOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright - Centered */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ROAR Industries. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 