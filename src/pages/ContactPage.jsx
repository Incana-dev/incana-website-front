import React from 'react';
import Layout from '../components/Layout';

const ContactPage = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted! Sort-of! I haven\'t implemented this logic yet, so uh. If you want to message me, pop an email to rosa@june.fyi!');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6 font-poppins text-center">
          Get In Touch
        </h1>
        <p className="text-lg text-text-body/90 mb-12 text-center">
          Have a question or a project in mind? Feel free to reach out.
        </p>

        <form onSubmit={handleSubmit} className="bg-surface p-8 sm:p-10 rounded-lg shadow-xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-text-heading mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 bg-background rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-highlight transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-text-heading mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 bg-background rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-highlight transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-text-heading mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="6"
              className="w-full p-3 bg-background rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-highlight transition-colors"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-strong text-white font-bold py-3 px-6 rounded-lg hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 focus:ring-offset-surface transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;