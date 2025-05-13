import React, { useState } from 'react';
import Container from '@/components/Container';
import { ArrowLeft, ChevronDown, Search, Send } from 'lucide-react';
import { Link } from 'react-router';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState('getting-started');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleToggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been submitted. We will get back to you shortly.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill in your details including username, email address, and password. Agree to our Terms of Service and Privacy Policy, then click "Create Account". You will receive a verification email to activate your account.'
        },
        {
          id: 'verify-email',
          question: 'How do I verify my email address?',
          answer: 'After creating an account, you\'ll receive a verification email containing a link. Click on the link to verify your email address. If you don\'t receive the email, check your spam folder or request a new verification email from the login page.'
        },
        {
          id: 'login-issues',
          question: 'I forgot my password. What should I do?',
          answer: 'If you forgot your password, click on the "Forgot Password" link on the login page. Enter your email address and you\'ll receive instructions to reset your password. Follow the link in the email to create a new password.'
        }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      questions: [
        {
          id: 'edit-profile',
          question: 'How do I edit my profile information?',
          answer: 'To edit your profile, log in to your account and click on your profile picture in the top right corner. Select "Profile" from the dropdown menu. On your profile page, click the "Edit Profile" button to update your information, including your profile picture, bio, and other details.'
        },
        {
          id: 'delete-account',
          question: 'How can I delete my account?',
          answer: 'To delete your account, go to your profile settings and scroll to the bottom. Click on "Delete Account" and follow the instructions. Please note that this action is permanent and cannot be undone. All your data will be permanently removed from our system.'
        },
        {
          id: 'change-password',
          question: 'How do I change my password?',
          answer: 'To change your password, go to your profile settings and select the "Security" tab. Click on "Change Password" and enter your current password followed by your new password. Confirm your new password and click "Save" to update it.'
        }
      ]
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      questions: [
        {
          id: 'create-post',
          question: 'How do I create a new blog post?',
          answer: 'To create a new blog post, click on the "Create Post" button in the navigation menu. Add a title, content, featured image, and select a category for your post. You can use the rich text editor to format your content with various styles, links, images, and other media. When you\'re ready, click "Publish" to share your post.'
        },
        {
          id: 'edit-post',
          question: 'Can I edit my published posts?',
          answer: 'Yes, you can edit your published posts. Go to your profile and find the post you want to edit under "My Posts". Click on the "Edit" button next to the post. Make your changes and click "Save" to update the post. Your edited post will maintain its original URL and publication date.'
        },
        {
          id: 'delete-post',
          question: 'How do I delete a post?',
          answer: 'To delete a post, go to your profile and find the post you want to delete under "My Posts". Click on the "Delete" button next to the post. You will be asked to confirm the deletion. Click "Yes, Delete" to permanently remove the post from the platform.'
        }
      ]
    },
    {
      id: 'community-guidelines',
      title: 'Community Guidelines',
      questions: [
        {
          id: 'content-policy',
          question: 'What kind of content is allowed on the platform?',
          answer: 'We encourage creative, informative, and respectful content. Content that violates our Terms of Service, such as hate speech, harassment, explicit material, or copyright infringement is not permitted. All content should follow our community guidelines to maintain a positive and inclusive environment.'
        },
        {
          id: 'report-content',
          question: 'How do I report inappropriate content?',
          answer: 'If you come across content that violates our community guidelines, click on the three dots (⋮) next to the post and select "Report". Choose the appropriate reason for reporting and provide additional details if necessary. Our moderation team will review the report and take appropriate action.'
        },
        {
          id: 'copyright',
          question: 'What should I do about copyright concerns?',
          answer: 'If you believe your copyrighted work has been used without permission, please contact us through our support email with details about the content in question. Include information about your copyright ownership and the specific content that infringes upon it. We take copyright claims seriously and will address them promptly.'
        }
      ]
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <Container className="max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
          
          {/* Search */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics..." 
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100 mb-10">
            {faqSections.filter(section => 
              !searchQuery || 
              section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              section.questions.some(q => 
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
              )
            ).map((section) => (
              <div key={section.id} className="overflow-hidden">
                <button 
                  onClick={() => handleToggleSection(section.id)} 
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-6 pb-4">
                    <div className="space-y-3">
                      {section.questions.filter(q => 
                        !searchQuery || 
                        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((q) => (
                        <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => handleToggleQuestion(q.id)} 
                            className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-base font-medium text-gray-800">{q.question}</h3>
                            <ChevronDown 
                              className={`h-4 w-4 text-gray-500 transition-transform ${expandedQuestion === q.id ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          
                          {expandedQuestion === q.id && (
                            <div className="px-4 pb-4 pt-1">
                              <p className="text-gray-600">{q.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">If you couldn't find the answer to your question, feel free to contact us directly using the form below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  required
                  className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Help; 