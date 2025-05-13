import React from 'react';
import Container from '@/components/Container';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const Privacy = () => {
  return (
    <div className="py-8 sm:py-12">
      <Container className="max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-700">
              At Typeflow, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">2. Information We Collect</h2>
            <p className="mb-4 text-gray-700">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Create an account (such as username, email address, and password)</li>
              <li>Complete your profile (such as profile picture, bio, and other optional information)</li>
              <li>Publish content, comments, or interact with other users</li>
              <li>Communicate with us or other users through the platform</li>
            </ul>
            <p className="mb-4 text-gray-700">
              We also automatically collect certain information when you use our service, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Log and usage data (IP address, browser type, referring/exit pages, etc.)</li>
              <li>Device information (hardware model, operating system, unique device identifiers)</li>
              <li>Location information (if you grant permission)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Create and manage your account</li>
              <li>Process your transactions</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4 text-gray-700">
              We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">5. Sharing Your Information</h2>
            <p className="mb-4 text-gray-700">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Other users (information you post publicly)</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">6. Data Security</h2>
            <p className="mb-4 text-gray-700">
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">7. Your Data Rights</h2>
            <p className="mb-4 text-gray-700">
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Accessing and reviewing your personal information</li>
              <li>Correcting inaccurate or incomplete information</li>
              <li>Deleting your personal information</li>
              <li>Restricting or objecting to our use of your information</li>
              <li>Data portability</li>
              <li>Withdrawing consent</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">8. Children's Privacy</h2>
            <p className="mb-4 text-gray-700">
              Our service is not intended for anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">10. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at privacy@typeflow.com.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy; 