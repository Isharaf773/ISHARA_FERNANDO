import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
} from 'lucide-react';
import photoDesk from '../assets/photo-09.png';
import photoTeach from '../assets/photo-02.png';
import photoTutor from '../assets/photo-05.png';
import photoCalm from '../assets/photo-06.png';
import photoHero from '../assets/photo-08.png';
import { getArrayPayload } from '../utils/apiResponse';
import { getApiUrl } from '../utils/api';

const features = [
  { icon: Lightbulb, title: 'Concept Based Learning', text: 'Learn the reason behind every formula, not just the final answer.' },
  { icon: ClipboardCheck, title: 'Weekly Evaluations', text: 'Track every student progress through consistent weekly tests.' },
  { icon: BookOpen, title: 'Printed Notes', text: 'Well-structured notes, examples, and practice exercises for every lesson.' },
  { icon: TrendingUp, title: 'Progress Tracking', text: 'Clear progress updates that show each student growth step by step.' },
];

const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

const journeySteps = [
  'Learn the concept clearly',
  'Practice with guided examples',
  'Evaluate weekly progress',
  'Improve weak areas',
  'Achieve exam confidence',
];

const heroFramePhotos = [
  { src: photoHero, align: 'object-center' },
  { src: photoDesk, align: 'object-center' },
  { src: photoTeach, align: 'object-top' },
  { src: photoCalm, align: 'object-top' },
  { src: photoTutor, align: 'object-center' },
];

const Home = () => {
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [activeHeroPhoto, setActiveHeroPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroPhoto((current) => (current + 1) % heroFramePhotos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios.get(getApiUrl('/api/lessons?isFeatured=true'));
        setFeaturedLessons(getArrayPayload(data, ['lessons', 'data']).slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured lessons', error);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div className="brand-shell overflow-hidden">
      <section className="hero-showcase relative border-b border-gold-400/10">
        <div className="absolute inset-0 dot-pattern opacity-35" />
        <div className="absolute inset-0 hero-grid-lines" />
        <div className="relative z-10 mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 lg:h-[calc(100vh-88px)] lg:min-h-[620px] lg:grid-cols-[1fr_1.03fr] lg:gap-10 lg:px-12 lg:py-6 xl:min-h-[660px] xl:px-16">
          <div className="max-w-3xl pt-2 text-center lg:pt-0 lg:text-left">
            <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-gold-400/25 bg-white/[.035] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] text-gold-400 shadow-lg shadow-gold-400/5 backdrop-blur-md sm:px-5 sm:text-xs sm:tracking-[.18em]">
              <Star className="h-4 w-4" /> Premium Mathematics Learning Experience
            </div>

            <h1 className="hero-title mx-auto max-w-[13ch] text-[clamp(1.8rem,3.9vw,4.15rem)] font-extrabold uppercase leading-[1.02] tracking-[.035em] text-white drop-shadow-2xl lg:mx-0 lg:max-w-none lg:tracking-[.055em]">
              Ishara Dilshan
              <span className="mt-2 block text-[clamp(1.05rem,2.25vw,2.55rem)] font-bold tracking-[.2em] gold-text sm:tracking-[.24em]">Mathematics</span>
            </h1>

            <div className="mx-auto my-4 h-px max-w-md bg-gradient-to-r from-transparent via-gold-400 to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-gold-400 lg:via-gold-400/55 lg:to-transparent" />

            <p className="hero-tagline text-balance text-[clamp(1.25rem,2vw,2.1rem)] font-semibold leading-tight text-white">
              Think <span className="text-gold-400">Beyond</span> Limits.
            </p>
            <div className="mx-auto mt-2.5 h-1 w-11 bg-gold-400 lg:mx-0" />
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="https://wa.me/94764726172" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-gold-500/20 transition hover:-translate-y-0.5 hover:brightness-110 sm:text-base">
                <MessageCircle className="mr-3 h-5 w-5" /> Join WhatsApp
              </a>
              <Link to="/courses" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gold-400/70 bg-primary-950/30 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/8 sm:text-base">
                <BookOpen className="mr-3 h-5 w-5 text-gold-400" /> View Classes <ArrowRight className="ml-4 h-5 w-5 text-gold-400" />
              </Link>
            </div>

            <div className="mx-auto mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0">
              {features.map(({ icon, title }) => (
                <div key={title} className="flex min-h-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[.045] px-3 py-4 text-center shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-gold-400/35 sm:min-h-28">
                  {React.createElement(icon, { className: 'h-7 w-7 text-gold-400' })}
                  <p className="mt-2.5 max-w-[9rem] text-balance text-xs font-semibold leading-5 text-white sm:text-sm">{title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] xl:min-h-[600px]">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-portrait-frame">
              <img
                src={heroFramePhotos[activeHeroPhoto].src}
                alt={`Hero ${activeHeroPhoto + 1}`}
                className={`absolute inset-0 h-full w-full rounded-3xl object-cover ${heroFramePhotos[activeHeroPhoto].align} transition-opacity duration-700 ease-in-out`}
                style={{ zIndex: 2 }}
              />
              <div className="hero-math-board" aria-hidden="true">
                <span>x² dx = x³/3</span>
                <span>sin θ</span>
                <span>πr²</span>
                <span>f(x)</span>
                <span>∑</span>
              </div>
            </div>
            <div className="hero-qualification-card">
              <GraduationCap className="h-10 w-10 shrink-0 text-gold-400" />
              <div>
                <p className="font-extrabold text-gold-400">B.Sc. Computer Engineering (UG)</p>
                <p className="mt-1 font-bold text-white">University of Ruhuna</p>
                <p className="mt-5 max-w-sm leading-7 text-slate-300">Passionate about teaching. Committed to your success.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-white py-20 text-primary-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[.25em] text-gold-500">Why choose us</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">A premium learning system for real progress</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-950 text-gold-400">{React.createElement(icon, { className: 'h-7 w-7' })}</div>
                <h3 className="text-xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              {[photoDesk, photoTeach, photoCalm, photoHero].map((photo, index) => (
                <img key={photo} src={photo} alt={`Ishara Dilshan classroom style ${index + 1}`} className={`h-64 w-full rounded-3xl border border-gold-400/20 object-cover shadow-2xl ${index % 2 ? 'mt-10' : ''}`} />
              ))}
            </div>
            <div>
              <p className="font-bold uppercase tracking-[.25em] text-gold-400">Student Journey</p>
              <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Understand. Practice. Improve. Achieve.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">A structured system that turns every concept learned today into stronger problem-solving confidence tomorrow.</p>
              <div className="mt-8 grid gap-4">
                {journeySteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-gold-400/15 bg-white/5 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 font-black text-primary-950">{i + 1}</span>
                    <span className="font-semibold text-slate-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-primary-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[.25em] text-gold-500">Classes</p>
              <h2 className="mt-3 text-4xl font-black">Grade 6-11 Mathematics</h2>
            </div>
            <Link to="/courses" className="inline-flex items-center font-bold text-primary-900 hover:text-gold-500">Explore all classes <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {grades.map((grade) => (
              <Link to="/courses" key={grade} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 text-center font-black shadow-sm transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl">
                <GraduationCap className="mx-auto mb-4 h-9 w-9 text-gold-500" />{grade}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredLessons.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-bold uppercase tracking-[.25em] text-gold-400">Featured Lessons</p>
            <h2 className="mt-3 text-4xl font-black text-white">Start learning with latest lessons</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredLessons.map((lesson) => (
                <Link key={lesson._id} to={`/lessons/${lesson._id}`} className="rounded-3xl border border-gold-400/15 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
                  <Lightbulb className="h-8 w-8 text-gold-400" />
                  <h3 className="mt-4 text-xl font-bold text-white">{lesson.title}</h3>
                  <p className="mt-3 line-clamp-3 text-slate-300">{lesson.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gold-400/20 bg-white/5 p-8 text-center shadow-2xl md:p-12">
            <BookOpenCheck className="mx-auto h-12 w-12 text-gold-400" />
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">Start your mathematics journey today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Call / WhatsApp: 076 472 6172 | 071 760 6544</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="tel:0764726172" className="inline-flex items-center justify-center rounded-full bg-gold-400 px-7 py-4 font-bold text-primary-950"><Phone className="mr-2 h-5 w-5" />Call Now</a>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-bold text-white hover:bg-white/10">Contact Page</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
