import React from 'react'
import Navbar from '../../components/student.components/global.components/navbar.components/navbar.component'
import BannerSlider from '../../components/student.components/home.components/banner.components/bannerSlider.component'
import Tray from '../../components/student.components/global.components/tray.components/tray.component'
import CourseCard from '../../components/student.components/global.components/cards.components/courseCard.component';
import EnrolledCoursesCard from '../../components/student.components/global.components/cards.components/enrolledCaurseCard.component';
import ClassCard from '../../components/student.components/global.components/cards.components/classCard.component';
import EnrolledClassCard from '../../components/student.components/global.components/cards.components/enrolledClassCard.component';
import Footer from '../../components/global.components/footer.component';

function HomePage() {

    const courses = [
        {
            id: 1,
            title: "Complete Web Development Bootcamp with React, Node.js and Advanced JavaScript",
            description: "Learn modern web development from scratch with hands-on projects, real-world applications, and industry best practices",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
            duration: "8h 30m",
            rating: 4.8,
            reviews: 1240,
            coordinator: "Dr. Sarah Johnson"
        },
        {
            id: 2,
            title: "Introduction to Python Programming for Beginners",
            description: "Learn the basics of Python programming with hands-on examples and projects.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
            duration: "2h 15m",
            rating: 4.5,
            reviews: 89,
            coordinator: "Mark Wilson"
        },
        {
            id: 3,
            title: "Data Science and Machine Learning Masterclass with Python, Pandas, Scikit-learn and TensorFlow for Beginners to Advanced",
            description: "Master data science and machine learning with comprehensive coverage of Python libraries, statistical analysis, deep learning algorithms, and real-world case studies",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            duration: "12h 45m",
            rating: 4.9,
            reviews: 2567,
            coordinator: "Prof. Michael Chen"
        },
        {
            id: 4,
            title: "UI/UX Design Fundamentals and Prototyping with Figma, Adobe XD and Sketch for Beginners",
            description: "Learn the principles of user interface and user experience design, wireframing, prototyping, and usability testing with popular design tools",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
            duration: "6h 20m",
            rating: 4.7,
            reviews: 540,
            coordinator: "Emily Davis"
        },
        {
            id: 5,
            title: "Advanced JavaScript Concepts and Modern ES6+ Features for Professional Developers",
            description: "Deep dive into advanced JavaScript topics including closures, prototypes, async programming, and modern ES6+ features with practical examples and best practices",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
            duration: "7h 10m",
            rating: 4.6,
            reviews: 320,
            coordinator: "James Smith"
        }
    ];

    const enrolledCourses = [
        {
            id: 1,
            title: "Complete React Developer Course with Hooks and Redux",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
            completedLessons: 24,
            totalLessons: 45,
            timeRemaining: 180, // minutes
            lastAccessed: "2 days ago",
            dueDate: "2025-10-15",
        },
        {
            id: 2,
            title: "Data Science Fundamentals",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            completedLessons: 8,
            totalLessons: 12,
            timeRemaining: 45,
            lastAccessed: "1 day ago",
            dueDate: "2025-09-30",
        },
        {
            id: 3,
            title: "Advanced JavaScript and Modern ES6+ Features for Professional Development",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
            completedLessons: 15,
            totalLessons: 30,
            timeRemaining: 240,
            lastAccessed: "5 hours ago",
            dueDate: null, // No due date
        }
    ];

    const liveClasses = [
        {
            id: 1,
            title: "Advanced React Patterns and Best Practices Workshop",
            description: "Deep dive into advanced React concepts including custom hooks, context patterns, and performance optimization techniques",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
            instructor: "Sarah Chen",
            scheduledTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago (live)
            duration: "2h 30m",
            currentParticipants: 24,
            maxParticipants: 50,
            status: 'live'
        },
        {
            id: 2,
            title: "JavaScript Fundamentals Masterclass",
            description: "Complete guide to JavaScript from basics to advanced concepts",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
            instructor: "Mike Johnson",
            scheduledTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
            duration: "1h 45m",
            currentParticipants: 8,
            maxParticipants: 30,
            status: 'starting-soon'
        },
        {
            id: 3,
            title: "Data Visualization with D3.js and Modern Web Technologies",
            description: "Learn to create stunning interactive data visualizations using D3.js, Canvas, and SVG with real-world examples",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            instructor: "Dr. Emily Rodriguez",
            scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            duration: "3h 15m",
            currentParticipants: 0,
            maxParticipants: 25,
            status: 'upcoming'
        },
        {
            id: 4,
            title: "UI/UX Design Principles",
            description: "Essential design principles for creating beautiful user interfaces",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop",
            instructor: "Alex Thompson",
            scheduledTime: new Date(), // Right now
            duration: "1h 30m",
            currentParticipants: 15,
            maxParticipants: 40,
            status: 'starting-soon'
        }
    ];

    const enrolledClasses = [
        {
            id: 1,
            title: "Advanced React Patterns",
            instructor: "Sarah Chen",
            scheduledTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
            duration: 120, // 2 hours in minutes
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
        },
        {
            id: 2,
            title: "UI/UX Design Fundamentals",
            instructor: "Mike Johnson",
            scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
            duration: 90, // 1.5 hours in minutes
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop"
        },
        {
            id: 3,
            title: "JavaScript ES6+ Features",
            instructor: "Alex Rivera",
            scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
            duration: 60, // 1 hour in minutes
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop"
        },
        {
            id: 4,
            title: "Database Design Workshop",
            instructor: "Lisa Wang",
            scheduledTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
            duration: 180, // 3 hours in minutes
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop"
        },
        {
            id: 5,
            title: "Python for Data Science",
            instructor: "David Kumar",
            scheduledTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            duration: 120, // 2 hours in minutes (still ongoing)
            image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=300&h=200&fit=crop"
        },
        {
            id: 6,
            title: "Morning Yoga Session",
            instructor: "Emma Thompson",
            scheduledTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            duration: 60, // 1 hour (already ended)
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
        },
        {
            id: 7,
            title: "Today's Web Development",
            instructor: "John Doe",
            scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now (today)
            duration: 90,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop"
        }
    ];

    // Get current time from browser
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Filter and sort classes
    const sortedClasses = [...enrolledClasses]
        .filter(classInfo => {
            // Only include today's classes
            const classDate = new Date(classInfo.scheduledTime);
            const classDateOnly = new Date(classDate.getFullYear(), classDate.getMonth(), classDate.getDate());
            return classDateOnly.getTime() === today.getTime();
        })
        .map(classInfo => {
            // Add status for sorting
            const classStartTime = new Date(classInfo.scheduledTime);
            const classEndTime = new Date(classStartTime.getTime() + (classInfo.duration * 60 * 1000));
            const isOngoing = now >= classStartTime && now < classEndTime;
            const hasEnded = now >= classEndTime;

            return {
                ...classInfo,
                isOngoing,
                hasEnded,
                sortPriority: isOngoing ? 2 : hasEnded ? 3 : 1 // 1=upcoming, 2=ongoing, 3=ended
            };
        })
        .sort((a, b) => {
            // First sort by priority (upcoming first, then ongoing, then ended)
            if (a.sortPriority !== b.sortPriority) {
                return a.sortPriority - b.sortPriority;
            }

            // Within same priority, sort by time
            if (a.sortPriority === 1) {
                // Upcoming: earliest first
                return new Date(a.scheduledTime) - new Date(b.scheduledTime);
            } else {
                // Ongoing or ended: latest first
                return new Date(b.scheduledTime) - new Date(a.scheduledTime);
            }
        });

    return (
        <>
            <div>
                {/* Nav Bar */}
                <Navbar />

                <BannerSlider />

                {/* Enrolled Classes */}
                <div className=" bg-gray-50 px-8 py-2  mt-8">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Tray
                            shareSpace={false}
                            className=""
                            showScrollIndicator={true}
                        >
                            {sortedClasses.map((classInfo) => (
                                <EnrolledClassCard key={classInfo.id} classInfo={classInfo} />
                            ))}
                        </Tray>
                    </div>
                </div>

                {/* Courses */}
                <div className=" bg-gray-50 px-8 py-2  mt-8">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Tray
                            title="Ready to reimagine your skills?"
                            subTitle="Get the skills and real-world experience employers want with Career Accelerators."
                            shareSpace={false}
                            className=""
                            showScrollIndicator={true}
                            seeMoreLink={'/accelerators'}
                            seeMoreText="See More"
                        >
                            {courses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </Tray>
                    </div>
                </div>

                {/* Live Classes */}
                <div className=" bg-gray-50 px-8 mt-8">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Tray
                            title="Classes you might be interested in"
                            subTitle="Join live sessions and interact with instructors in real-time."
                            shareSpace={false}
                            className=""
                            showScrollIndicator={true}
                            seeMoreLink={'/accelerators'}
                            seeMoreText="See More"
                        >
                            {liveClasses.map(classInfo => (
                                <ClassCard key={classInfo.id} classInfo={classInfo} />
                            ))}
                        </Tray>
                    </div>
                </div>

                {/* Enrolled Courses */}
                <div className=" bg-gray-50 px-8  mt-8">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Tray
                            title="My Courses"
                            subTitle="Continue learning where you left off."
                            shareSpace={false}
                            className="items-center justify-center"
                            showScrollIndicator={false}
                            seeMoreLink={'/accelerators'}
                            seeMoreText="See More"
                        >
                            {enrolledCourses.map(course => (
                                <EnrolledCoursesCard key={course.id} course={course} />
                            ))}
                        </Tray>
                    </div>
                </div>



            </div >
            <Footer />
        </>
    )
}

export default HomePage