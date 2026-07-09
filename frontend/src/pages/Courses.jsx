import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, ClipboardList, FileText, GraduationCap } from 'lucide-react';

const grades = [
  { id: 'g6', name: 'Grade 06', text: 'Foundation mathematics with simple explanations and guided practice.' },
  { id: 'g7', name: 'Grade 07', text: 'Core concepts, problem solving and continuous activities.' },
  { id: 'g8', name: 'Grade 08', text: 'Strong school syllabus coverage with weekly evaluation.' },
  { id: 'g9', name: 'Grade 09', text: 'Algebra, geometry and logic with exam-focused practice.' },
  { id: 'g10', name: 'Grade 10', text: 'Pre O/L preparation with structured theory and papers.' },
  { id: 'g11', name: 'Grade 11', text: 'O/L Mathematics revision, model papers and past paper discussions.' },
];

const Courses = () => {
  return (
    <div className="brand-shell min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-bold uppercase tracking-[.3em] text-gold-400">Classes</p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Grade 6–11 | O/L Mathematics</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">A premium class system focused on understanding, weekly progress and examination confidence.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grades.map((grade) => (
            <div key={grade.id} className="group rounded-[2rem] border border-gold-400/15 bg-white/5 p-7 shadow-xl transition hover:-translate-y-1 hover:border-gold-400/40">
              <div className="mb-6 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-primary-950"><GraduationCap className="h-7 w-7" /></div>
                <span className="text-sm font-bold tracking-[.2em] text-gold-400">MATHEMATICS</span>
              </div>
              <h2 className="text-2xl font-black text-white">{grade.name}</h2>
              <p className="mt-4 leading-7 text-slate-300">{grade.text}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-3"><BookOpenCheck className="h-4 w-4 text-gold-400" /> Concept-based lessons</div>
                <div className="flex items-center gap-3"><ClipboardList className="h-4 w-4 text-gold-400" /> Weekly evaluations</div>
                <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-gold-400" /> Printed notes</div>
              </div>
              <Link to="/contact" className="mt-7 inline-flex items-center rounded-full border border-gold-400/25 px-5 py-3 font-bold text-gold-400 transition group-hover:bg-gold-400 group-hover:text-primary-950">Enroll / Ask Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
