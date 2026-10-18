import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, MessageSquare, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate successful receipt
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  const faqs = [
    {
      q: 'Do any of your browser tools require an API key or credit card?',
      a: 'No. All utilities on SmartAI Tools—including the Writing Helper, Extractive Text Summarizer, and Prompt Studio—run 100% locally in your browser memory via deterministic algorithms. There are no API keys, accounts, or subscriptions required.',
    },
    {
      q: 'Is my pasted text sent to OpenAI, Google, or any remote server?',
      a: 'Zero bytes of your text leave your device. The writing analysis and summarization calculations are executed directly by client-side JavaScript. If you disconnect your internet connection, the writing helper and summarizer will continue to function flawlessly.',
    },
    {
      q: 'How can our team submit a new AI tool to be featured in the directory?',
      a: 'You can click "Submit Tool" in the top navigation bar or choose "Tool Submission" in the contact form below. Our editorial team reviews software for genuine utility, clear pricing transparency, and privacy standards before indexing.',
    },
    {
      q: 'How is the Extractive Summarizer different from ChatGPT or Claude?',
      a: 'Generative models paraphrase text by predicting downstream word probabilities, which can inadvertently hallucinate details or alter statistics. Our Extractive Summarizer uses TF-IDF and graph-based sentence salience algorithms to select the most information-dense sentences directly from your original text, guaranteeing 100% factual fidelity.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="pb-8 border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Get in Touch</span>
          <span aria-hidden="true">·</span>
          <span>Community & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact & Support
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          Have an inquiry, feedback regarding our browser tools, or want to suggest an AI tool for the directory? Reach out to our engineering team.
        </p>
      </div>

      <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6">
            <h2 className="text-lg font-bold text-white tracking-tight">Send Us a Message</h2>

            {submitted ? (
              <div className="p-6 rounded-xl border border-emerald-800/80 bg-emerald-950/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Dispatched Successfully</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-white font-semibold">{name}</span>. Our editorial and development team typically responds within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-slate-300">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-slate-500 focus:outline-none text-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tool Submission">Submit an AI Tool for Directory</option>
                    <option value="Feature Feedback">Writing Helper / Summarizer Feedback</option>
                    <option value="Bug Report">Technical Bug Report</option>
                    <option value="Partnership">Editorial & Research Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-slate-300">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your inquiry, feedback, or tool suggestion..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-slate-500 focus:outline-none text-white placeholder-slate-500 leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs & Contact Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-slate-200 font-semibold hover:text-white"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-slate-400 leading-relaxed border-t border-slate-800/80">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct channels */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 text-xs text-slate-400 space-y-2">
            <span className="font-semibold text-slate-200">Direct Inquiries:</span>
            <p>
              For urgent security disclosures or data privacy audits, email our team directly at <span className="font-mono text-slate-300">security@smartaitools.app</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
