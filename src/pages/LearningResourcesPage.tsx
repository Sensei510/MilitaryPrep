import React, { useState } from 'react';
import { Book, Calendar, Clock, Download, ExternalLink, Lightbulb, Monitor, FileText, BookOpen, Bookmark } from 'lucide-react';

// Resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf';
  category: 'general' | 'physical' | 'written' | 'interview';
  url: string;
  icon: React.ReactNode;
  date: string;
  readTime?: string;
  watchTime?: string;
}

// Updated resources with working links
const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'NDA & NA Examination Guide',
    description: 'Complete guide for National Defence Academy and Naval Academy entrance examination by UPSC.',
    type: 'article',
    category: 'general',
    url: 'https://upsc.gov.in/examinations/nda-na',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '10 min read'
  },
  {
    id: '2',
    title: 'CDS Examination Information',
    description: 'Detailed information about Combined Defence Services Examination pattern, syllabus and preparation.',
    type: 'article',
    category: 'written',
    url: 'https://upsc.gov.in/examinations/cds',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'AFCAT Official Information',
    description: 'Air Force Common Admission Test details, exam pattern, and application process.',
    type: 'article',
    category: 'written',
    url: 'https://afcat.cdac.in/AFCAT/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '12 min read'
  },
  {
    id: '4',
    title: 'Indian Army Recruitment Process',
    description: 'Complete guide to Indian Army officer and soldier recruitment procedures and requirements.',
    type: 'article',
    category: 'general',
    url: 'https://joinindianarmy.nic.in/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '15 min read'
  },
  {
    id: '5',
    title: 'Indian Navy Recruitment Guide',
    description: 'Comprehensive information about Indian Navy officer and sailor recruitment schemes.',
    type: 'article',
    category: 'general',
    url: 'https://www.joinindiannavy.gov.in/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '12 min read'
  },
  {
    id: '6',
    title: 'SSB Interview Preparation',
    description: 'Services Selection Board interview process, psychological tests, and group tasks explained.',
    type: 'article',
    category: 'interview',
    url: 'https://www.ssbcrack.com/ssb-interview/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '20 min read'
  },
  {
    id: '7',
    title: 'Physical Fitness Standards',
    description: 'Physical fitness requirements and training guidelines for all three services.',
    type: 'article',
    category: 'physical',
    url: 'https://www.defencedirect.in/physical-fitness-test-standards/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '10 min read'
  },
  {
    id: '8',
    title: 'AFCAT Preparation Videos',
    description: 'YouTube playlist covering AFCAT syllabus, previous year questions, and preparation strategies.',
    type: 'video',
    category: 'written',
    url: 'https://www.youtube.com/results?search_query=AFCAT+preparation+2025',
    icon: <Monitor className="h-5 w-5" />,
    date: 'January 2025',
    watchTime: '45 min'
  },
  {
    id: '9',
    title: 'NDA Physical Training Videos',
    description: 'Physical training exercises and fitness preparation for NDA candidates.',
    type: 'video',
    category: 'physical',
    url: 'https://www.youtube.com/results?search_query=NDA+physical+training+exercises',
    icon: <Monitor className="h-5 w-5" />,
    date: 'January 2025',
    watchTime: '30 min'
  },
  {
    id: '10',
    title: 'SSB Interview Mock Sessions',
    description: 'Watch actual SSB interview simulations and learn from experienced candidates.',
    type: 'video',
    category: 'interview',
    url: 'https://www.youtube.com/results?search_query=SSB+interview+mock+session',
    icon: <Monitor className="h-5 w-5" />,
    date: 'January 2025',
    watchTime: '60 min'
  },
  {
    id: '11',
    title: 'CDS Mathematics Study Material',
    description: 'Comprehensive mathematics preparation material for CDS examination.',
    type: 'pdf',
    category: 'written',
    url: 'https://www.studyiq.com/cds-study-material',
    icon: <Download className="h-5 w-5" />,
    date: 'January 2025'
  },
  {
    id: '12',
    title: 'AFCAT English Practice Papers',
    description: 'English language practice papers and previous year questions for AFCAT.',
    type: 'pdf',
    category: 'written',
    url: 'https://www.gradeup.co/afcat-exam',
    icon: <Download className="h-5 w-5" />,
    date: 'January 2025'
  },
  {
    id: '13',
    title: 'General Knowledge for Defence Exams',
    description: 'Current affairs and general knowledge specifically curated for defence examinations.',
    type: 'pdf',
    category: 'written',
    url: 'https://www.jagranjos.com/defence/',
    icon: <Download className="h-5 w-5" />,
    date: 'January 2025'
  },
  {
    id: '14',
    title: 'Indian Air Force Career Options',
    description: 'Detailed information about various career paths in the Indian Air Force.',
    type: 'article',
    category: 'general',
    url: 'https://indianairforce.nic.in/career/flying-branch/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '15 min read'
  },
  {
    id: '15',
    title: 'Defence Current Affairs',
    description: 'Stay updated with latest defence news, military developments, and strategic affairs.',
    type: 'article',
    category: 'general',
    url: 'https://www.defencenews.in/',
    icon: <FileText className="h-5 w-5" />,
    date: 'January 2025',
    readTime: '5 min read'
  }
];

const LearningResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  
  // Filter resources based on active filters
  const filteredResources = resourcesData.filter(resource => {
    const categoryMatch = activeCategory === 'all' || resource.category === activeCategory;
    const typeMatch = activeType === 'all' || resource.type === activeType;
    return categoryMatch && typeMatch;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Learning <span className="text-yellow-400">Resources</span>
            </h1>
            <p className="text-lg text-neutral-300">
              Prepare for a career in the Indian Armed Forces with our comprehensive collection of study materials, guides, and preparatory resources.
            </p>
          </div>
        </div>
      </section>
      
      {/* Preparation Tips */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Essential Preparation Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Book className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Academic Preparation</h3>
              <p className="text-neutral-700 mb-4">
                Focus on mathematics, english, general knowledge, and logical reasoning. Use standard textbooks and practice previous years' question papers.
              </p>
              <div className="text-green-700 font-medium">
                Recommendation: Dedicate 3-4 hours daily for studies
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Physical Fitness</h3>
              <p className="text-neutral-700 mb-4">
                Build endurance through running, swimming, and circuit training. Include push-ups, pull-ups, and sit-ups in your regular routine.
              </p>
              <div className="text-blue-700 font-medium">
                Recommendation: Minimum 1 hour of physical exercise daily
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="bg-sky-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bookmark className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Current Affairs</h3>
              <p className="text-neutral-700 mb-4">
                Stay updated with national and international news, defense developments, and geopolitical situations through newspapers and quality news sources.
              </p>
              <div className="text-sky-600 font-medium">
                Recommendation: Read quality newspaper daily
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">SSB Interview</h3>
              <p className="text-neutral-700 mb-4">
                Develop leadership qualities, confidence, and problem-solving skills. Practice group discussions and personal interviews with friends.
              </p>
              <div className="text-yellow-600 font-medium">
                Recommendation: Join SSB preparation groups
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Filters & Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Study Resources</h2>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                All Categories
              </button>
              <button 
                onClick={() => setActiveCategory('general')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'general' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                General
              </button>
              <button 
                onClick={() => setActiveCategory('physical')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'physical' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Physical Preparation
              </button>
              <button 
                onClick={() => setActiveCategory('written')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'written' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Written Exam
              </button>
              <button 
                onClick={() => setActiveCategory('interview')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'interview' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Interview & SSB
              </button>
            </div>
            
            <div className="h-px w-full md:h-auto md:w-px bg-neutral-200 my-4 md:mx-6"></div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveType('all')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeType === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                All Types
              </button>
              <button 
                onClick={() => setActiveType('article')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'article' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <FileText className="h-4 w-4 mr-1" /> Articles
              </button>
              <button 
                onClick={() => setActiveType('video')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'video' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <Monitor className="h-4 w-4 mr-1" /> Videos
              </button>
              <button 
                onClick={() => setActiveType('pdf')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'pdf' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <Download className="h-4 w-4 mr-1" /> Study Materials
              </button>
            </div>
          </div>
          
          {/* Resources Listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <div 
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        resource.type === 'article' ? 'bg-neutral-100 text-neutral-700' :
                        resource.type === 'video' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        <div className="flex items-center">
                          {resource.icon}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </div>
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {resource.date}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <a 
                        href={resource.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 font-medium text-sm hover:text-green-800 transition-colors inline-flex items-center"
                      >
                        {resource.type === 'article' ? 'Read Article' :
                         resource.type === 'video' ? 'Watch Video' :
                         'Access Material'}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      
                      {(resource.readTime || resource.watchTime) && (
                        <span className="text-xs text-neutral-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.readTime || resource.watchTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-neutral-500">No resources found matching your current filters.</p>
                <button 
                  onClick={() => {setActiveCategory('all'); setActiveType('all');}}
                  className="mt-4 text-green-700 hover:text-green-800 transition-colors font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Official Resources */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Official Resources</h2>
          
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <p className="text-neutral-700 mb-6">
              For the most accurate and up-to-date information, always refer to the official websites of the Indian Armed Forces:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://joinindianarmy.nic.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-green-700 hover:text-green-800 transition-colors"
                    >
                      Indian Army Official Recruitment
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">Army recruitment, exam notifications, and applications.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://www.joinindiannavy.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                    >
                      Indian Navy Recruitment
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">Navy entrance exams and recruitment details.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-sky-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://afcat.cdac.in/AFCAT/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      Indian Air Force AFCAT
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">Air Force Common Admission Test information.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://upsc.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
                    >
                      Union Public Service Commission
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">CDS and NDA examination information.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://indianairforce.nic.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Indian Air Force Official
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">Career information and recruitment updates.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="https://www.mod.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      Ministry of Defence
                    </a>
                    <p className="text-sm text-neutral-600 mt-1">Official defence ministry information and updates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Study Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Recommended Study Platforms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <h3 className="font-semibold text-lg mb-3">Unacademy</h3>
              <p className="text-neutral-600 mb-4">Comprehensive courses for NDA, CDS, and AFCAT preparation.</p>
              <a 
                href="https://unacademy.com/goal/nda-na/LDMZA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
              >
                Visit Platform <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 className="font-semibold text-lg mb-3">BYJU'S Exam Prep</h3>
              <p className="text-neutral-600 mb-4">Defence exam preparation with mock tests and study materials.</p>
              <a 
                href="https://byjusexamprep.com/defence" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Visit Platform <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
              <h3 className="font-semibold text-lg mb-3">Testbook</h3>
              <p className="text-neutral-600 mb-4">Practice tests, current affairs, and study notes for defence exams.</p>
              <a 
                href="https://testbook.com/defence" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
              >
                Visit Platform <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Preparation?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Begin your journey to joining the Indian Armed Forces with proper preparation and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition-colors">
              Explore Career Options
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-md transition-colors">
              Contact for Guidance
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningResourcesPage;