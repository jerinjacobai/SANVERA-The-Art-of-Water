import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectEnquiry } from '../../types';

interface ProjectEnquirySectionProps {
  prefilledProduct?: string;
}

export const ProjectEnquirySection: React.FC<ProjectEnquirySectionProps> = ({ prefilledProduct }) => {
  const [formData, setFormData] = useState<ProjectEnquiry>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Private Residence',
    location: '',
    requirement: prefilledProduct ? `Interested in specifying: ${prefilledProduct}` : '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-end architectural dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="enquiry" className="relative bg-char py-24 sm:py-32 lg:py-40 text-ink border-t border-hair">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hair pb-6">
          <span className="label-mono text-smoke">11</span>
          <span className="label-mono text-mist">/ Architectural Studio</span>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Column: Direct Consultation Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-ink leading-[0.92]">
                Let's create<br />something distinct
              </h2>
              <p className="mt-8 text-base sm:text-lg text-mist font-light leading-relaxed max-w-md">
                We partner with architects, interior masters, and boutique developers to deliver custom plumbing geometry, bespoke finishes, and precision hydraulic calculations.
              </p>
            </div>

            <div className="mt-12 lg:mt-24 space-y-6 border-t border-hair pt-8">
              <div>
                <span className="label-mono text-smoke block">Architectural Studio Direct</span>
                <p className="mt-1 text-base font-light text-ink">projects@sanvera.com</p>
                <p className="text-sm font-light text-mist">+39 030 892 4100 (Central Europe)</p>
              </div>

              <div>
                <span className="label-mono text-smoke block">Global Support</span>
                <p className="mt-1 text-sm font-light text-mist">
                  BIM Files (.RVT) · 3D STEP Models · Material Sample Chests
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Enquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-12 border border-hair bg-void/50 flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={44} className="text-brass mb-6" />
                <h3 className="editorial-title text-3xl sm:text-4xl text-ink">
                  Enquiry Dispatched
                </h3>
                <p className="mt-4 text-mist font-light max-w-md leading-relaxed">
                  Thank you, {formData.name}. Our architectural specification team will review your project requirements and prepare technical drawings within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 label-mono text-brass border-b border-brass pb-1"
                >
                  Submit another project specification
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. David Chipperfield"
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Architecture Practice / Studio</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Studio Mumbai"
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@practice.com"
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+41 22 000 0000"
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink outline-none focus:border-ink transition-colors font-light cursor-pointer"
                    >
                      <option value="Private Residence" className="bg-void text-ink">Private Residence</option>
                      <option value="Hospitality & Hotel" className="bg-void text-ink">Hospitality & Hotel</option>
                      <option value="Commercial Sanctuary" className="bg-void text-ink">Commercial Sanctuary</option>
                      <option value="Spa & Thermal Bath" className="bg-void text-ink">Spa & Thermal Bath</option>
                      <option value="Yacht & Maritime" className="bg-void text-ink">Yacht & Maritime</option>
                      <option value="Other" className="bg-void text-ink">Other</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="label-mono text-smoke block">Project Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Zurich, Switzerland"
                      className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                    />
                  </div>
                </div>

                {/* Requirement */}
                <div className="space-y-2">
                  <label className="label-mono text-smoke block">Estimated Requirement</label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. 18 Bathrooms, Brushed Brass series mixer, Concealed showers"
                    className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="label-mono text-smoke block">Brief / Spatial Vision</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe specific architectural materials, counter depths, or flow rate requirements..."
                    className="w-full bg-transparent border-b border-hair pb-3 text-base text-ink placeholder:text-smoke/40 outline-none focus:border-ink transition-colors font-light resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-4 px-10 py-5 border border-ink bg-ink text-void hover:bg-transparent hover:text-ink transition-all duration-500 ease-editorial text-xs uppercase tracking-widest2 font-medium"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Start A Project'}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                  </button>

                  <span className="label-mono text-smoke text-[9px]">
                    Strict confidentiality guaranteed · NDA upon request
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
