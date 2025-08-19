import React, { useMemo, useRef, useState } from 'react';
import {
  Calendar,
  FileText,
  Mail,
  Receipt,
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Users,
  MessageSquare,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

// Update this with your actual Formspree endpoint.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjkodqoe';

export default function AIBackOfficeLanding() {
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({ name: '', email: '', pain: '' });

  // Feature definitions used in the Features section.
  const features = useMemo(
    () => [
      {
        title: 'Smart Scheduling',
        desc: 'AI books, reschedules, and reminds — no more back-and-forth.',
        Icon: Calendar,
      },
      {
        title: 'Invoice Automation',
        desc: 'Auto-generate invoices, track payments, and nudge late clients.',
        Icon: Receipt,
      },
      {
        title: 'Inbox Drafts',
        desc: 'AI drafts client replies you can approve in one click.',
        Icon: Mail,
      },
      {
        title: 'Weekly Reports',
        desc: 'Auto-summarized updates your clients actually read.',
        Icon: BarChart3,
      },
    ],
    [],
  );

  // Scroll to the waitlist form section.
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Basic form validation.
  const validate = () => {
    if (!values.name.trim()) return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Please enter a valid email.';
    if (!values.pain.trim()) return 'Tell us your biggest admin headache.';
    return '';
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('email', values.email);
      fd.append('pain', values.pain);
      // Submit to Formspree. Accept JSON for a nicer response.
      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (resp.ok) {
        setSubmitted(true);
        setValues({ name: '', email: '', pain: '' });
      } else {
        // If Formspree fails, store data locally as a fallback.
        const existing = JSON.parse(localStorage.getItem('waitlist_submissions') || '[]');
        existing.push({ ...values, ts: Date.now(), fallback: true });
        localStorage.setItem('waitlist_submissions', JSON.stringify(existing));
        setSubmitted(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper for fade-in animation.
  const fadeIn = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
    viewport: { once: true, margin: '-80px' },
  };

  // Helper for staggered animation across elements.
  const fadeStagger = (i = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.5, ease: 'easeOut' },
    },
    viewport: { once: true, margin: '-60px' },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Navbar */}
      <motion.header
        className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur"
        initial={{ y: prefersReducedMotion ? 0 : -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">AI Back Office</span>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#problem" className="hover:text-slate-900">
              Problem
            </a>
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#how" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
          </nav>
          <motion.button
            whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-white shadow hover:shadow-md"
          >
            Join Waitlist <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft animated glow */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,.35),transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div {...fadeIn}>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              AI that runs your agency’s back office — so you don’t have to.
            </h1>
            <p className="mt-4 text-lg opacity-80">
              Stop wasting 20+ hours a week on emails, invoices, and scheduling. Our AI handles it all, so you can
              focus on clients.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white shadow hover:shadow-lg"
              >
                Get Early Access <ArrowRight className="h-4 w-4" />
              </motion.button>
              <div className="text-sm opacity-70">Be one of the first 50 agencies in beta.</div>
            </div>
            <div className="mt-6 flex items-center gap-6 opacity-80 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Privacy-first
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Save 20+ hours/week
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Built with agencies
              </div>
            </div>
          </motion.div>
          {/* Mock UI card */}
          <motion.div
            className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur md:p-6"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">Back Office Hub</div>
              <div className="text-xs rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">AI Active</div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { Icon: Mail, title: 'Inbox Drafts', text: '3 replies prepared. Review & send.' },
                { Icon: Calendar, title: 'Scheduling', text: '2 meetings booked, 1 rescheduled.' },
                { Icon: Receipt, title: 'Invoices', text: '$4,800 pending • 2 reminders sent.' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  {...fadeStagger(i)}
                  className="rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <c.Icon className="h-4 w-4" /> {c.title}
                  </div>
                  <p className="text-sm opacity-80">{c.text}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeIn} className="mt-3 rounded-2xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <BarChart3 className="h-4 w-4" /> Weekly Report
              </div>
              <div className="text-sm opacity-80">Open tasks: 6 • Campaigns shipped: 3 • Risks: budget drift on ACME</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.h2 className="text-2xl font-semibold tracking-tight md:text-3xl" {...fadeIn}>
          Admin is killing your productivity
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            'Drowning in client emails & scheduling back-and-forth',
            'Manually creating invoices & chasing late payments',
            'Hours spent on reporting and reminders',
          ].map((t, i) => (
            <motion.div
              key={i}
              {...fadeStagger(i)}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
            >
              <div className="mt-0.5 text-indigo-600">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-sm opacity-90">{t}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.h2 className="text-2xl font-semibold tracking-tight md:text-3xl" {...fadeIn}>
          Meet your AI Back Office
        </motion.h2>
        <p className="mt-2 opacity-80">One platform that automates your agency’s admin.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={title}
              {...fadeStagger(idx)}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-1 flex items-center gap-2 font-medium">
                <Icon className="h-4 w-4" /> {title}
              </div>
              <p className="text-sm opacity-80">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.h2 className="text-2xl font-semibold tracking-tight md:text-3xl" {...fadeIn}>
          How it works
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: 1, title: 'Connect', text: 'Link your calendar, invoicing, and inbox.' },
            { n: 2, title: 'Automate', text: 'AI drafts emails, books meetings, and creates invoices.' },
            { n: 3, title: 'Approve', text: 'Review quickly — or let autopilot handle routine tasks.' },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeStagger(i)}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
            >
              <div className="mb-1 text-sm font-semibold text-indigo-600">Step {s.n}</div>
              <div className="font-medium">{s.title}</div>
              <p className="mt-1 text-sm opacity-80">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          {...fadeIn}
          className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 shadow-sm md:p-8"
        >
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">Early access pricing</h3>
              <p className="mt-2 text-sm opacity-80">Founding agencies get locked-in pricing for life.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  'Unlimited AI drafts',
                  'Scheduling & invoicing',
                  'Weekly client reports',
                  'Priority support',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-sm uppercase tracking-wider opacity-60">Beta price</div>
              <div className="mt-1 text-4xl font-semibold">
                $99<span className="text-base opacity-70">/month</span>
              </div>
              <div className="mt-1 text-xs opacity-70">Limited to the first 50 agencies</div>
              {/* Updated CTA: redirect to the live Stripe payment link instead of scrolling to the form. */}
              <motion.a
                whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                // Updated payment link (subscription) generated Aug 19; replaced old broken link
                // Updated link: new Stripe subscription payment link created Aug 19 after account verification
                href="https://buy.stripe.com/1A414o6Sc4qJeog8eP3Nm03"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white shadow hover:shadow-lg"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Waitlist Form */}
      <section ref={formRef} className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Join the waitlist</h2>
            <p className="mt-2 opacity-80">
              Tell us about your agency and your biggest admin headache. We’ll invite you as we roll out early access.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Your data stays private. We’ll never sell your email.
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> We read every response — it shapes the product.
              </div>
            </div>
          </motion.div>
          <motion.form
            method="POST"
            onSubmit={handleSubmit}
            {...fadeIn}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {!submitted ? (
              <>
                <label className="mb-3 block text-sm font-medium">Name
                  <input
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Alex Rivera"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="mb-3 block text-sm font-medium">Work Email
                  <input
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="alex@agency.co"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="mb-4 block text-sm font-medium">What’s your biggest admin headache?
                  <textarea
                    value={values.pain}
                    onChange={(e) => setValues((v) => ({ ...v, pain: e.target.value }))}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Tell us what wastes the most time"
                    required
                  />
                </label>
                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
                  >
                    {error}
                  </div>
                )}
                <motion.button
                  disabled={submitting}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-white shadow hover:shadow-lg disabled:opacity-70"
                >
                  {submitting ? 'Submitting…' : 'Request Early Access'}
                </motion.button>
                <p className="mt-3 text-center text-xs opacity-70">
                  By submitting, you agree to be contacted about the beta.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
                className="text-center"
                aria-live="polite"
              >
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500 text-white">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div className="text-xl font-semibold">You’re on the list 🎉</div>
                <p className="mt-1 text-sm opacity-80">
                  We’ll reach out as soon as slots open up. Keep an eye on your inbox.
                </p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-20 md:pb-28">
        <motion.h2 className="text-2xl font-semibold tracking-tight md:text-3xl" {...fadeIn}>
          FAQ
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              q: 'Do I need to change my current tools?',
              a: 'No. We’ll integrate with what you already use (Google Calendar, QuickBooks, Stripe, HubSpot, and more).',
            },
            {
              q: 'Is my data secure?',
              a: 'We use encryption in transit and at rest. Your data is never sold or used to train external models.',
            },
            {
              q: 'How much will it cost after beta?',
              a: 'We expect $300–$500/month depending on features and team size. Beta users get locked-in pricing.',
            },
            {
              q: 'Which agencies is this for?',
              a: 'Marketing, design, dev, and consulting shops from 2–50 people are a great fit for early access.',
            },
          ].map((f, i) => (
            <motion.div
              key={f.q}
              {...fadeStagger(i)}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
            >
              <div className="font-medium">{f.q}</div>
              <p className="mt-1 text-sm opacity-80">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="border-t border-slate-200/60 bg-white/60 py-10 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        viewport={{ once: true }}
      >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 md:flex-row">
            {/* Display only the copyright notice in the footer. Removed unused Privacy/Terms/Contact links. */}
            <div className="opacity-80">© {new Date().getFullYear()} AI Back Office</div>
          </div>
      </motion.footer>
    </div>
  );
}