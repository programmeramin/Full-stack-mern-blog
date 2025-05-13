import React from 'react';
import Container from '@/components/Container';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const Terms = () => {
  return (
    <div className="py-8 sm:py-12">
      <Container className="max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-700">
              Welcome to Blog Application. These Terms of Service govern your use of our website, services, and applications. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">2. User Agreement</h2>
            <p className="mb-4 text-gray-700">
              By creating an account, you represent that you are at least 13 years of age and agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">3. Content Policies</h2>
            <p className="mb-4 text-gray-700">
              Users are solely responsible for the content they post. You agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. We reserve the right to remove any content that violates these terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">4. Intellectual Property</h2>
            <p className="mb-4 text-gray-700">
              The Blog Application and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws. Users retain ownership of content they create and post on the platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">5. Limitations of Liability</h2>
            <p className="mb-4 text-gray-700">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. In no event shall our total liability exceed the amount you paid us, if any, during the six months prior to the claim.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">6. Termination</h2>
            <p className="mb-4 text-gray-700">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for any reason including, without limitation, breach of these Terms. Upon termination, your right to use the service will cease immediately.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">7. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
              We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the service following the posting of revised Terms means you accept and agree to the changes.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">8. Governing Law</h2>
            <p className="mb-4 text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at support@blogapp.com.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Terms; 