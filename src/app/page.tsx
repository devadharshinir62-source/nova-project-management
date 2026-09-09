'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                NOVA
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Platform
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-slate-800/60 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm shadow-blue-500/30 transition hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                How It Works
              </a>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Dashboard
              </Link>
            </div>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-lg font-medium text-slate-200 hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Team Productivity Platform
              </div>

              {/* Title & Tagline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                NOVA — Team Productivity Platform
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
                  Plan. Collaborate. Deliver.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
                NOVA helps teams organize projects, manage tasks, collaborate with members, and track progress in one place. Streamline execution from initial concept through delivery.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white shadow-sm transition hover:border-slate-600"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Interactive Platform Mockup / Preview Card */}
            <div className="mt-16 sm:mt-20 max-w-5xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-900/90 shadow-2xl shadow-blue-950/30 overflow-hidden backdrop-blur-sm">
              {/* Mockup Header Bar */}
              <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-medium text-slate-400">nova-platform.app/dashboard</span>
                </div>
                <div className="text-xs font-medium text-slate-500 hidden sm:block">
                  Live Productivity Workspace
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-medium text-slate-400">Active Projects</p>
                    <p className="text-2xl font-bold text-white mt-1">12</p>
                    <span className="text-xs text-emerald-400 font-medium">↑ 100% on schedule</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-medium text-slate-400">Total Tasks</p>
                    <p className="text-2xl font-bold text-white mt-1">48</p>
                    <span className="text-xs text-blue-400 font-medium">32 completed</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-medium text-slate-400">Team Members</p>
                    <p className="text-2xl font-bold text-white mt-1">16</p>
                    <span className="text-xs text-indigo-400 font-medium">Across 4 roles</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-medium text-slate-400">Completion Rate</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">84%</p>
                    <span className="text-xs text-emerald-400 font-medium">+14% this sprint</span>
                  </div>
                </div>

                {/* Projects & Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Sample Project Card */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">Q3 Infrastructure Upgrade</h4>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Migration of core database clusters to PostgreSQL with automated replica failover.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Progress</span>
                        <span className="font-semibold text-white">75%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Sample Task List */}
                  <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
                    <h4 className="font-semibold text-white text-sm">Recent Task Activity</h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-medium text-slate-200">Deploy auth middleware to edge</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium text-[10px]">
                          DONE
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="font-medium text-slate-200">Prisma database pooling audit</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium text-[10px]">
                          IN PROGRESS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="py-24 bg-slate-900/60 border-t border-b border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Everything your team needs to stay productive
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Engineered to bring visibility, momentum, and clarity to your daily operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1: Project Management */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all hover:shadow-xl hover:shadow-blue-950/20 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Project Management</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Create and manage projects and monitor project progress. Organize key milestones with full lifecycle visibility.
                </p>
              </div>

              {/* Feature 2: Task Management */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all hover:shadow-xl hover:shadow-blue-950/20 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Task Management</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Create, assign, update, and track tasks. Prioritize work with High, Medium, and Low severity indicators.
                </p>
              </div>

              {/* Feature 3: Team Collaboration */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all hover:shadow-xl hover:shadow-blue-950/20 group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Manage project members and collaborate with your team. Assign roles to managers, developers, and designers.
                </p>
              </div>

              {/* Feature 4: Progress Tracking */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all hover:shadow-xl hover:shadow-blue-950/20 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Track project and task completion from the dashboard. Visualize team throughput and delivery milestones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
                Simple Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                How NOVA Works
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Four intuitive steps to take projects from concept to triumphant delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-blue-500/40 tracking-tighter">01</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">Create a project</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Set up your workspace, name your initiatives, and define milestones with project-level visibility.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-blue-400 font-medium">
                  Initialize Workspace →
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-indigo-500/40 tracking-tighter">02</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">Build your team</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Bring in administrators, managers, developers, and designers to staff project rosters seamlessly.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-indigo-400 font-medium">
                  Add Collaborators →
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-sky-500/40 tracking-tighter">03</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">Assign and manage tasks</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Break down deliverables into manageable items, designate assignees, and set priorities.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-sky-400 font-medium">
                  Assign Responsibilities →
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-emerald-500/40 tracking-tighter">04</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">Track progress and deliver</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Watch status metrics climb in real-time as your team hits deadlines and ships with precision.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-emerald-400 font-medium">
                  Ship & Celebrate →
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/60 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-blue-950/50">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Ready to organize your team&apos;s work?
                </h2>
                <p className="text-lg text-slate-300">
                  Start using NOVA today. Plan effectively, empower your teammates, and consistently deliver great results.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-slate-200 transition hover:text-white"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Footer Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-base">
                N
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white text-base tracking-tight">NOVA</span>
                <span className="text-xs text-slate-400">Team Productivity Platform</span>
              </div>
            </div>

            {/* Footer Nav */}
            <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
              <Link href="/login" className="hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-white transition-colors">
                Register
              </Link>
            </nav>
          </div>

          {/* Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p>© 2026 NOVA. All rights reserved.</p>
            <p>Plan. Collaborate. Deliver.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
