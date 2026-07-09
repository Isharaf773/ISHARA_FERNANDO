import React from 'react';
import { Award, BookOpen, Brain, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import photo from '../assets/photo-09.png';

const About = () => {
  const points = [
    'Concept-based explanations for Grade 6–11 Mathematics',
    'Weekly evaluations with clear progress tracking',
    'Printed notes, guided examples and practice systems',
    'Student-friendly teaching with discipline and confidence',
  ];

  return (
    <div className="brand-shell min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-bold uppercase tracking-[.3em] text-gold-400">About</p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Ishara Dilshan | Mathematics</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">A modern Mathematics learning experience built around understanding, practice, evaluation and continuous improvement.</p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold-400/10 blur-2xl" />
            <img src={photo} alt="Ishara Dilshan" className="relative h-[560px] w-full rounded-[2rem] border border-gold-400/20 object-cover shadow-2xl" />
          </div>
          <div className="card-glass rounded-[2rem] p-8 md:p-10">
            <div className="mb-6 inline-flex items-center rounded-full border border-gold-400/25 px-4 py-2 text-sm font-semibold text-gold-400"><GraduationCap className="mr-2 h-4 w-4" />B.Sc. Computer Engineering (UG) — University of Ruhuna</div>
            <h2 className="text-3xl font-black text-white">Mathematics Instructor</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">I teach Mathematics in a way that students can understand the reason behind every step. The goal is not only to score marks, but to build confidence and logical thinking.</p>
            <div className="mt-8 grid gap-4">
              {points.map((point) => <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><CheckCircle2 className="mt-1 h-5 w-5 flex-none text-gold-400" /><span className="text-slate-200">{point}</span></div>)}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[{icon: Brain, title: 'Concept First'}, {icon: Users, title: 'Personal Guidance'}, {icon: Award, title: 'Exam Confidence'}].map(({icon, title}) => (
            <div key={title} className="rounded-3xl border border-gold-400/15 bg-white/5 p-7 text-center">
              {React.createElement(icon, { className: 'mx-auto h-10 w-10 text-gold-400' })}
              <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-slate-400">Structured learning experience designed for steady student growth.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
