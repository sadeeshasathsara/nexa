import { ObjectId } from "bson";

export const coursesData = [
    {
        id: new ObjectId().toString(),
        title: "Complete Web Development Bootcamp with React & Node.js",
        description:
            "Learn modern web development from scratch with hands-on projects, real-world applications, and industry best practices.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
        duration: "8h 30m",
        rating: 4.8,
        reviewsCount: 1240,
        coordinator: "Dr. Sarah Johnson",
        syllabus: [
            { week: 1, topic: "HTML & CSS Basics", lessons: 8 },
            { week: 2, topic: "JavaScript Fundamentals", lessons: 10 },
            { week: 3, topic: "React Essentials", lessons: 12 },
            { week: 4, topic: "Node.js & Express", lessons: 10 },
        ],
        reviews: [
            {
                id: new ObjectId().toString(),
                user: {
                    name: "Alice Smith",
                    verified: true,
                    avatar: "https://i.pravatar.cc/100?img=1",
                },
                rating: 5,
                date: "2024-01-15",
                title: "Excellent course!",
                content: "The best course I’ve ever taken. Super practical.",
                helpful: 45,
                tags: ["Beginner Friendly", "Hands-on"],
            },
            {
                id: new ObjectId().toString(),
                user: {
                    name: "David Johnson",
                    verified: false,
                    avatar: "https://i.pravatar.cc/100?img=2",
                },
                rating: 4,
                date: "2024-02-01",
                title: "Great content, but a bit fast-paced",
                content: "Really informative, but beginners might struggle.",
                helpful: 12,
                tags: ["Challenging", "Well-structured"],
            },
        ],
        tags: ["Web Development", "Full Stack", "React", "JavaScript"],
    },
    {
        id: new ObjectId().toString(),
        title: "Introduction to Python Programming for Beginners",
        description:
            "Learn the basics of Python programming with hands-on examples and projects.",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
        duration: "2h 15m",
        rating: 4.5,
        reviewsCount: 89,
        coordinator: "Mark Wilson",
        syllabus: [
            { week: 1, topic: "Python Basics", lessons: 6 },
            { week: 2, topic: "Data Types & Operators", lessons: 8 },
            { week: 3, topic: "Functions & Loops", lessons: 7 },
            { week: 4, topic: "Mini Project: Calculator", lessons: 3 },
        ],
        reviews: [
            {
                id: new ObjectId().toString(),
                user: {
                    name: "Sophia Lee",
                    verified: true,
                    avatar: "https://i.pravatar.cc/100?img=3",
                },
                rating: 5,
                date: "2024-03-10",
                title: "Perfect for beginners!",
                content: "Loved the step-by-step explanations.",
                helpful: 30,
                tags: ["Beginner Friendly", "Easy to follow"],
            },
        ],
        tags: ["Python", "Programming", "Beginner"],
    },
    {
        id: new ObjectId().toString(),
        title: "Data Science and Machine Learning Masterclass",
        description:
            "Master data science and machine learning with Python, Pandas, Scikit-learn, and TensorFlow.",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
        duration: "12h 45m",
        rating: 4.9,
        reviewsCount: 2567,
        coordinator: "Prof. Michael Chen",
        syllabus: [
            { week: 1, topic: "Data Analysis with Pandas", lessons: 9 },
            { week: 2, topic: "Machine Learning Basics", lessons: 12 },
            { week: 3, topic: "Deep Learning with TensorFlow", lessons: 14 },
            { week: 4, topic: "Capstone Project", lessons: 6 },
        ],
        reviews: [
            {
                id: new ObjectId().toString(),
                user: {
                    name: "Liam Martinez",
                    verified: true,
                    avatar: "https://i.pravatar.cc/100?img=4",
                },
                rating: 5,
                date: "2024-05-05",
                title: "Best ML course",
                content: "Hands-on projects made concepts crystal clear.",
                helpful: 67,
                tags: ["Hands-on", "Advanced"],
            },
        ],
        tags: ["Data Science", "Machine Learning", "Python"],
    },
    {
        id: new ObjectId().toString(),
        title: "UI/UX Design Fundamentals and Prototyping",
        description:
            "Learn the principles of user interface and user experience design, wireframing, and prototyping.",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
        duration: "6h 20m",
        rating: 4.7,
        reviewsCount: 540,
        coordinator: "Emily Davis",
        syllabus: [
            { week: 1, topic: "UI/UX Principles", lessons: 5 },
            { week: 2, topic: "Wireframing Basics", lessons: 7 },
            { week: 3, topic: "Prototyping with Figma", lessons: 8 },
            { week: 4, topic: "Case Study Project", lessons: 4 },
        ],
        reviews: [
            {
                id: new ObjectId().toString(),
                user: {
                    name: "Noah Brown",
                    verified: false,
                    avatar: "https://i.pravatar.cc/100?img=5",
                },
                rating: 4,
                date: "2024-06-12",
                title: "Good intro to design",
                content: "Covers a lot of tools and design basics.",
                helpful: 15,
                tags: ["Design Tools", "Beginner"],
            },
        ],
        tags: ["UI/UX", "Design", "Figma"],
    },
    {
        id: new ObjectId().toString(),
        title: "Advanced JavaScript Concepts and ES6+ Features",
        description:
            "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
        image:
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
        duration: "7h 10m",
        rating: 4.6,
        reviewsCount: 320,
        coordinator: "James Smith",
        syllabus: [
            { week: 1, topic: "Closures & Scope", lessons: 6 },
            { week: 2, topic: "Asynchronous JS", lessons: 8 },
            { week: 3, topic: "ES6+ Features", lessons: 9 },
            { week: 4, topic: "Project: Async API App", lessons: 5 },
        ],
        reviews: [
            {
                id: new ObjectId().toString(),
                user: {
                    name: "Emma Garcia",
                    verified: true,
                    avatar: "https://i.pravatar.cc/100?img=6",
                },
                rating: 5,
                date: "2024-07-20",
                title: "Deep & challenging",
                content: "Exactly what I needed to go from intermediate to advanced.",
                helpful: 25,
                tags: ["Advanced", "Challenging"],
            },
        ],
        tags: ["JavaScript", "ES6+", "Advanced"],
    },
];
