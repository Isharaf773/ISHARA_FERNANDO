import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Send, Globe, Facebook, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });
    try {
      await axios.post(getApiUrl('/api/contact'), formData);
      setStatus({ type: 'success', msg: 'Your message has been sent successfully.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: 'Failed to send message. Please contact via WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="brand-shell min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-bold uppercase tracking-[.3em] text-gold-400">Contact</p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Start learning with confidence</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Class details, admissions and online support සඳහා message එකක් දාන්න.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="card-glass rounded-[2rem] p-8 lg:col-span-2">
            <h2 className="text-2xl font-black text-white">Direct Contact</h2>
            <p className="mt-3 text-slate-300">Fastest way is WhatsApp or phone call.</p>
            <div className="mt-8 space-y-5">
              <a href="tel:0764726172" className="flex items-center gap-4 rounded-2xl border border-gold-400/15 bg-white/5 p-4 hover:bg-white/10"><Phone className="h-6 w-6 text-gold-400" /><div><p className="font-bold text-white">Call / WhatsApp</p><p className="text-slate-300">076 472 6172 / 071 760 6544</p></div></a>
              <a href="mailto:isharaf773@gmail.com" className="flex items-center gap-4 rounded-2xl border border-gold-400/15 bg-white/5 p-4 hover:bg-white/10"><Mail className="h-6 w-6 text-gold-400" /><div><p className="font-bold text-white">Email</p><p className="text-slate-300">isharaf773@gmail.com</p></div></a>
              <a href="https://ishara-fernando-tutor.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-gold-400/15 bg-white/5 p-4 hover:bg-white/10"><Globe className="h-6 w-6 text-gold-400" /><div><p className="font-bold text-white">Website</p><p className="text-slate-300">ishara-fernando-tutor.vercel.app</p></div></a>
              <div className="flex items-center gap-4 rounded-2xl border border-gold-400/15 bg-white/5 p-4"><Facebook className="h-6 w-6 text-gold-400" /><div><p className="font-bold text-white">Facebook</p><p className="text-slate-300">Ishara Fernando / Ishara Dilshan | Mathematics</p></div></div>
            </div>
            <a href="https://wa.me/94764726172" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold-400 px-6 py-4 font-black text-primary-950 hover:bg-yellow-300"><MessageCircle className="mr-2 h-5 w-5" />Open WhatsApp</a>
          </div>

          <div className="rounded-[2rem] bg-white p-8 text-primary-950 shadow-2xl lg:col-span-3">
            <h2 className="text-2xl font-black">Send a Message</h2>
            {status.msg && <div className={`mt-5 rounded-xl p-4 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{status.msg}</div>}
            <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
              <input name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-gold-400" />
              <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-gold-400" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-gold-400" />
              <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="Message" className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-gold-400" />
              <button disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-primary-950 px-7 py-4 font-black text-white hover:bg-primary-800 disabled:opacity-60">{isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send className="ml-2 h-5 w-5" />}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
