import React from 'react'
import CourseBanner from '../../components/student.components/course.components/courseBanner.component'
import WhatYoullLearn from '../../components/student.components/course.components/whatYouWIllLearn.component';
import CourseIncludes from '../../components/student.components/course.components/courseIncludes.component';
import CourseContent from '../../components/student.components/course.components/courseContent.component';
import RequirementsDescription from '../../components/student.components/course.components/requrementsDescription.component';
import CourseReviews from '../../components/student.components/course.components/courseReviews.component';
import Footer from '../../components/global.components/footer.component';
import Navbar from '../../components/student.components/global.components/navbar.components/navbar.component';
import { Users, Play, FileText, Download, Smartphone, Captions, AudioLines, Trophy } from 'lucide-react';

function CoursePage() {

    const sampleCourse = {
        "title": "Complete Web Development Bootcamp",
        "description": "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack web developer. Build real-world projects and deploy them to the web.",
        "thumbnail": "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
        "rating": 4.7,
        "totalRatings": 125430,
        "totalLearners": 450000,
        "duration": 540,
        "previewDuration": 3,
        "lastUpdated": "2024-01-15",
        "language": "English",
        "introVideo": true,
        "videoThumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        "instructors": [
            {
                "id": 1,
                "name": "Angela Yu",
                "title": "Full-Stack Developer",
                "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
            },
            {
                "id": 2,
                "name": "John Smith",
                "title": "Senior Software Engineer",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            }
        ]
    };

    const sampleLearningOutcomes = [
        "Generative AI: Create content, synthesize information, and learn faster than ever with effective prompt engineering!",
        "ChatGPT: Turn your creativity into paid work, generate fresh ideas, reach new audiences, and scale your projects!",
        "Productivity: Achieve goals faster with artificial intelligence, manage time, prioritize tasks, and create an optimized daily schedule!",
        "Marketing: Generate targeted content with generative AI, capitalize on trends, create ads, newsletters, specialized content, and media campaigns!",
        "Soft Skills: Improve your communication, leadership, problem-solving, and social skills with customized AI feedback and coaching!",
        "AI Voice Tools: Easily create AI-generated speech for any use case and even clone your own voice for content creation!",
        "Advanced Prompting Techniques: Master complex prompt structures, chain-of-thought reasoning, and multi-step problem solving with AI",
        "Content Strategy: Develop comprehensive content calendars, analyze audience engagement, and optimize content performance using AI insights",
        "Data Analysis: Use AI tools to interpret complex datasets, create visualizations, and generate actionable business intelligence reports",
        "Automation Workflows: Build sophisticated automated processes that integrate multiple AI tools to streamline your daily operations"
    ];

    const sampleCourseData = {
        includes: [
            {
                icon: Users,
                text: "Role Play"
            },
            {
                icon: Play,
                text: "39.5 hours on-demand video"
            },
            {
                icon: FileText,
                text: "22 articles"
            },
            {
                icon: Download,
                text: "142 downloadable resources"
            },
            {
                icon: Smartphone,
                text: "Access on mobile and TV"
            },
            {
                icon: Captions,
                text: "Closed captions"
            },
            {
                icon: AudioLines,
                text: "Audio description in existing audio"
            },
            {
                icon: Trophy,
                text: "Certificate of completion"
            }
        ],
        relatedTopics: [
            "ChatGPT",
            "Other Office Productivity",
            "Office Productivity"
        ]
    };

    const sampleRequirementDescriptions = {
        description: {
            overview:
                "Learn the fundamentals of full-stack web development with hands-on projects. This course covers frontend, backend, databases, and deployment.",
            whatYouWillLearn: [
                "Build responsive websites with HTML, CSS, and JavaScript",
                "Use React to create dynamic and interactive UIs",
                "Work with Node.js and Express for backend development",
                "Integrate MongoDB for database management",
                "Understand REST APIs and authentication",
                "Deploy applications to cloud platforms"
            ],
            targetAudience: [
                "Beginners who want to start coding",
                "Students interested in web development",
                "Developers switching to full-stack development",
                "Professionals upgrading their skills"
            ]
        },
        requirements: {
            required: [
                "A computer with internet access",
                "Basic computer skills",
                "Willingness to learn and practice"
            ],
            recommended: [
                "Familiarity with using a text editor like VS Code",
                "Basic knowledge of how the web works"
            ],
            notRequired: [
                "Prior programming experience",
                "Expensive software or paid tools"
            ]
        },
        stats: {
            duration: "25 hours",
            lessons: 45,
            level: "Beginner to Intermediate",
            rating: 4.7,
            students: "8,230"
        }
    };

    const sampleCourseContent = {
        sections: [
            {
                id: 1,
                title: "Getting Started with Web Development",
                duration: 125, // total minutes
                lectures: [
                    { id: 1, title: "Course Introduction", type: "video", duration: 8, preview: true },
                    { id: 2, title: "Setting Up Your Development Environment", type: "video", duration: 15, preview: false },
                    { id: 3, title: "Course Resources", type: "pdf", duration: 0, preview: false },
                    { id: 4, title: "HTML Basics Overview", type: "image", duration: 0, preview: false },
                    { id: 5, title: "Your First HTML Page", type: "video", duration: 22, preview: false }
                ]
            },
            {
                id: 2,
                title: "HTML Fundamentals",
                duration: 180,
                lectures: [
                    { id: 6, title: "HTML Structure and Syntax", type: "video", duration: 25, preview: false },
                    { id: 7, title: "Working with Text Elements", type: "video", duration: 18, preview: false },
                    { id: 8, title: "Links and Navigation", type: "video", duration: 20, preview: false },
                    { id: 9, title: "Images and Media", type: "video", duration: 22, preview: false },
                    { id: 10, title: "HTML Forms", type: "video", duration: 30, preview: false },
                    { id: 11, title: "HTML Reference Guide", type: "pdf", duration: 0, preview: false },
                    { id: 12, title: "Practice Exercise Files", type: "download", duration: 0, preview: false }
                ]
            },
            {
                id: 3,
                title: "CSS Styling and Layout",
                duration: 240,
                lectures: [
                    { id: 13, title: "Introduction to CSS", type: "video", duration: 20, preview: false },
                    { id: 14, title: "CSS Selectors and Properties", type: "video", duration: 35, preview: false },
                    { id: 15, title: "Box Model and Layout", type: "video", duration: 40, preview: false },
                    { id: 16, title: "Flexbox Layout", type: "video", duration: 45, preview: false },
                    { id: 17, title: "CSS Grid System", type: "video", duration: 50, preview: false },
                    { id: 18, title: "Responsive Design", type: "video", duration: 35, preview: false },
                    { id: 19, title: "CSS Animations", type: "video", duration: 25, preview: false },
                    { id: 20, title: "CSS Cheat Sheet", type: "pdf", duration: 0, preview: false }
                ]
            },
            {
                id: 4,
                title: "JavaScript Programming",
                duration: 320,
                lectures: [
                    { id: 21, title: "JavaScript Basics", type: "video", duration: 30, preview: false },
                    { id: 22, title: "Variables and Data Types", type: "video", duration: 25, preview: false },
                    { id: 23, title: "Functions and Scope", type: "video", duration: 35, preview: false },
                    { id: 24, title: "DOM Manipulation", type: "video", duration: 40, preview: false },
                    { id: 25, title: "Event Handling", type: "video", duration: 30, preview: false },
                    { id: 26, title: "Async JavaScript", type: "video", duration: 45, preview: false },
                    { id: 27, title: "JavaScript ES6+ Features", type: "video", duration: 35, preview: false },
                    { id: 28, title: "JavaScript Reference", type: "pdf", duration: 0, preview: false },
                    { id: 29, title: "Code Examples", type: "download", duration: 0, preview: false }
                ]
            }
        ]
    };

    const sampleReviewsData = {
        reviews: [
            {
                id: 1,
                user: {
                    name: "Sarah Johnson",
                    avatar:
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                    verified: true,
                },
                rating: 5,
                date: "2024-01-15",
                title: "Excellent course for beginners and advanced learners!",
                content:
                    "This course exceeded my expectations. The instructor explains complex concepts in a very clear and understandable way. The hands-on projects really helped me solidify my learning. I was able to build my first full-stack application within 3 months of starting this course. Highly recommended!",
                helpful: 45,
                tags: ["Beginner Friendly", "Great Projects", "Clear Explanations"],
            },
            {
                id: 2,
                user: {
                    name: "Michael Chen",
                    avatar:
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                    verified: true,
                },
                rating: 4,
                date: "2024-01-10",
                title: "Great content, but could use more advanced topics",
                content:
                    "The course covers all the fundamentals very well. Angela is an excellent instructor and the production quality is top-notch. My only suggestion would be to include more advanced topics like testing and deployment strategies. Overall, great value for money.",
                helpful: 32,
                tags: ["Good Value", "Quality Content"],
            },
            {
                id: 3,
                user: {
                    name: "Emily Rodriguez",
                    avatar:
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                    verified: false,
                },
                rating: 5,
                date: "2024-01-08",
                title: "Career changing course!",
                content:
                    "I transitioned from marketing to web development thanks to this course. The step-by-step approach and real-world projects prepared me well for job interviews. I landed my first developer job 6 months after completing the course!",
                helpful: 67,
                tags: ["Career Change", "Job Ready"],
            },
            {
                id: 4,
                user: {
                    name: "David Kim",
                    avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    verified: true,
                },
                rating: 4,
                date: "2024-01-05",
                title: "Solid foundation course",
                content:
                    "Good course for building a solid foundation in web development. The examples are practical and the explanations are clear. Would have liked to see more modern frameworks covered in detail.",
                helpful: 28,
                tags: ["Solid Foundation"],
            },
            {
                id: 5,
                user: {
                    name: "Lisa Thompson",
                    avatar:
                        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
                    verified: true,
                },
                rating: 5,
                date: "2024-01-02",
                title: "Best investment I made for my career",
                content:
                    "This course is comprehensive and well-structured. The instructor's teaching style is engaging and easy to follow. The community support is also excellent. I've recommended this to all my friends interested in coding.",
                helpful: 54,
                tags: ["Comprehensive", "Great Support", "Engaging"],
            },
        ],
        ratingDistribution: {
            5: 78,
            4: 15,
            3: 4,
            2: 2,
            1: 1,
        },
        averageRating: 4.7,
    };


    return (
        <>
            <Navbar />
            <div className='bg-gray-100'>
                <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #10b981, #059669);
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #059669, #047857);
                    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
                }
                
                /* Firefox */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #10b981 #f1f5f9;
                }
            `}</style>

                <CourseBanner courseData={sampleCourse} />

                {/* Course Overview Section */}
                <div className='max-w-7xl mx-auto px-2 sm:px-3 lg:px-3 mt-4 grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='md:col-span-2 rounded-lg h-96 md:h-[420px] overflow-y-auto custom-scrollbar'>
                        <WhatYoullLearn learningOutcomes={sampleLearningOutcomes} />
                    </div>
                    <div className='md:col-span-1 h-96 md:h-[420px] overflow-y-auto custom-scrollbar'>
                        <CourseIncludes courseData={sampleCourseData} />
                    </div>
                </div>

                {/* Course Content and Requirements Section */}
                <div className='max-w-7xl gap-5 mx-auto  mt-4 px-2 sm:px-3 lg:px-3 grid grid-cols-1 md:grid-cols-2'>
                    <div className='md:col-span-1  '>
                        <RequirementsDescription courseData={sampleRequirementDescriptions} />
                    </div>
                    <div className='md:col-span-1 rounded-lg  h-96 md:h-[600px] overflow-y-auto custom-scrollbar'>
                        <CourseContent courseData={sampleCourseContent} />
                    </div>
                </div>

                <div className='max-w-7xl mx-auto px-2 sm:px-3 lg:px-3 mt-4 mb-10'>
                    <CourseReviews data={sampleReviewsData} />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default CoursePage