// components/Footer.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GitBranch, MessageCircle, Link, Mail, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/memora.png"
                alt="Memora Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Memora</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              A modern collaborative document editor designed to streamline your note-taking and team collaboration.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <a 
                href="mailto:napg.adekunle@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">napg.adekunle@gmail.com</span>
              </a>
              
              <a 
                href="tel:08142436225" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">08142436225</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) 
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#showcase" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }) 
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Demo
                </a>
              </li>
              <li>
                <a 
                  href="#waitlist" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }) 
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Waitlist
                </a>
              </li>
              <li>
                <a 
                  href="#documentation" 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="#about" 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="mailto:napg.adekunle@gmail.com" 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Memora. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <GitBranch className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Link className="w-5 h-5" />
            </a>
            <a href="mailto:napg.adekunle@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}