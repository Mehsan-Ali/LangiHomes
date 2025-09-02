import React from 'react';
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ContactFormData } from '../utils/emailService';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Encode helper for Netlify
  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          ...formData,
        }),
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phoneNumber: '', description: '' });
    } catch (err) {
      console.error('Form submission error', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's talk about your next project! Get in touch for a free consultation and personalized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

            <div className="space-y-8">
              <div className="flex items-center">
                <div className="bg-blue-100 p-4 rounded-xl mr-6">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Phone</p>
                  <a href="tel:02102254672" className="text-blue-600 hover:text-blue-700 transition-colors text-xl">
                    02102254672
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 p-4 rounded-xl mr-6">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Email</p>
                  <a
                    href="mailto:info@langihomes.co.nz"
                    className="text-green-600 hover:text-green-700 transition-colors text-xl"
                  >
                    info@langihomes.co.nz
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 p-4 rounded-xl mr-6">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Location</p>
                  <p className="text-gray-600 text-xl">Auckland / Service Areas</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  Get a Free Consultation
                </button>

                <a
                  href="https://wa.me/642102254672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <strong>Success!</strong> Your message has been sent. We'll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <strong>Error!</strong> There was a problem sending your message. Please try again or call us directly.
              </div>
            )}

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden input required by Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>

            {/* Hidden static Netlify form (ensures build-time detection) */}
            <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="tel" name="phoneNumber" />
              <textarea name="description"></textarea>
            </form>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Let's talk about your next project!</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              We're here to help bring your vision to life with expert craftsmanship and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02102254672"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="mailto:langihomes@gmail.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;