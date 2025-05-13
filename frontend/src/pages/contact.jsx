import React, { useState } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import { Link } from 'react-router';

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h2>
        <p className="mt-2 text-lg text-gray-600">We’d love to hear from you. Fill out the form below and we’ll get in touch soon.</p>
      </div>

      {/* Form */}
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">First name</label>
            <div className="mt-2.5">
              <input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">Last name</label>
            <div className="mt-2.5">
              <input
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-900">Company</label>
            <div className="mt-2.5">
              <input
                type="text"
                id="company"
                name="company"
                autoComplete="organization"
                className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
            <div className="mt-2.5">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">Phone number</label>
            <div className="mt-2.5 flex rounded-md border border-gray-300 bg-white">
              <select
                id="country"
                name="country"
                className="rounded-l-md bg-transparent px-3 py-2 text-gray-500 focus:outline-indigo-600"
              >
                <option>US</option>
                <option>CA</option>
                <option>EU</option>
              </select>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                placeholder="123-456-7890"
                className="flex-1 rounded-r-md px-3 py-2 text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-600"
              ></textarea>
            </div>
          </div>

          <Field className="flex gap-x-4 sm:col-span-2 mt-4 items-center">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`${
                agreed ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
            >
              <span className="sr-only">Agree to policies</span>
              <span
                className={`${
                  agreed ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <Label className="text-sm text-gray-600">
              By selecting this, you agree to our{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </Label>
          </Field>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
