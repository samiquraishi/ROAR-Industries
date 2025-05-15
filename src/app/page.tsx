'use client';

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CiCircleCheck } from "react-icons/ci";
import { LiaGgCircle } from "react-icons/lia";
import { CiGlobe } from "react-icons/ci";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";
import { EnquiryForm } from "@/components/custom/EnquiryForm";
import { skills } from "@/constants/skills";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-foreground flex flex-col bg-black">
      {/* Hero Section with video background, gradient overlay, and absolutely positioned header */}
      <section className="relative min-h-screen text-center py-16 z-20 overflow-hidden bg-black flex flex-col justify-center items-center">
        {/* Video Background (only in hero) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/bgplaceholder.mp4"
        />

        {/* Much darker and taller black-to-transparent gradient overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0.99) 10%, rgba(0,0,0,0.80) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.0) 100%)"
          }}
        />

        {/* Header absolutely at the top */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-20 flex flex-col items-center gap-6 mt-10"
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-widest bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-transparent bg-clip-text drop-shadow-xl">
            ROAR Industries
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-xl font-light">
            Unleashing Bold Innovation. Building the Future.
          </p>
          <div className="mt-6">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className="px-7 py-3 text-lg font-medium bg-gradient-to-r from-blue-300 to-purple-300 text-black rounded-3xl shadow-xl hover:from-amber-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Enquire Now
                </button>
              </DialogTrigger>
              <DialogContent className="bg-black  rounded-md p-8 w-full max-w-md shadow-2xl backdrop-blur-sm">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl text-center font-bold text-white bg-clip-text ">
                    Let&apos;s Connect
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <EnquiryForm onSuccess={() => setOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="max-w-7xl mx-auto py-12 md:py-20 px-2 sm:px-4 md:px-8 text-center overflow-x-hidden"
      >
        <div className="space-y-10">
          <div className="inline-block mb-6">
            <div className="h-1 w-28 bg-amber-600 mx-auto"></div>
            <h4 className="text-sm font-bold tracking-wider text-yellow-500 uppercase my-2">Our Story</h4>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-extralight tracking-tight mb-10 sm:mb-16 md:mb-20">
            Pioneering Tomorrow, <span className="text-yellow-600">Today</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl sm:max-w-3xl md:max-w-5xl my-6 sm:my-10 mx-auto leading-relaxed">
            At <span className="font-semibold">ROAR Industries</span>, we don&apos;t just embrace innovation—we define it. Founded on the principle that breakthrough solutions require both visionary thinking and meticulous execution, we bring together elite minds in technology, design, and strategy.
          </p>
          {/* cards */}
          <div className="pt-8 sm:pt-12 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 md:gap-y-0 w-full mx-auto justify-between">
            {skills.slice(0, 3).map((skill, i) => (
              <motion.div
                initial={{ opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
                className="bg-white shadow-md hover:shadow-lg transition-shadow h-72 sm:h-80 md:h-96 w-full flex flex-col items-center justify-center px-4 sm:px-8"
                key={skill.title}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
                  {i === 0 && <LiaGgCircle className="text-amber-500 w-10 h-10 sm:w-12 sm:h-12" />}
                  {i === 1 && <CiCircleCheck className="text-amber-500 w-10 h-10 sm:w-12 sm:h-12" />}
                  {i === 2 && <CiGlobe className="text-amber-500 w-10 h-10 sm:w-12 sm:h-12" />}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-4">{["Innovation", "Excellence", "Impact"][i]}</h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  {[
                    "Challenging conventions and pushing boundaries to create solutions that others thought impossible.",
                    "Committed to the highest standards in every project, every interaction, and every line of code we deliver.",
                    "Creating solutions that don&apos;t just work—they transform industries and improve lives across the globe."
                  ][i]}
                </p>
              </motion.div>
            ))}
          </div>
          {/* mission statement */}
          <motion.p
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 mt-10 max-w-2xl mx-auto"
          >
            Our mission is to empower visionaries to transform their boldest ideas into reality. When you partner with ROAR, you&apos;re not just getting a service—you&apos;re gaining a catalyst for extraordinary achievement.
          </motion.p>
        </div>
      </motion.section>

      {/* Skills/Services Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-20 px-4">
        <h2 className="text-4xl md:text-7xl font-light text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-transparent bg-clip-text">Skills Provided</h2>
        <div className="h-1 w-96 bg-amber-300 mx-auto mb-40"></div>
        <div className="grid gap-12">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -100 : 100 // Alternate between left and right
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: "easeOut"
              }}
              className="w-full max-w-5xl mx-auto bg-white shadow-xl border border-neutral-200 flex flex-row items-center h-64 md:h-72 px-12 md:px-20 justify-between text-left"
            >
              {/* Left: Text or Icon depending on even/odd */}
              {i % 2 === 0 ? (
                <>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-light mb-2 text-black">{skill.title}</h3>
                    <p className="text-gray-600 text-lg md:text-xl">{skill.desc}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center ml-8">
                    <div className="w-36 h-36 flex items-center justify-center">
                      <Image
                        src={skill.image}
                        alt={skill.title}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-shrink-0 flex items-center justify-center mr-8">
                    <div className="w-36 h-36 flex items-center justify-center">
                      <Image
                        src={skill.image}
                        alt={skill.title}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-light mb-2 text-black">{skill.title}</h3>
                    <p className="text-gray-600 text-lg md:text-xl">{skill.desc}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}