const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // TODO: Add your seed data here
  // Example:
  await prisma.project.createMany({
    data: [
      {
        title: "Test DB Query 1",
        description: "A personal portfolio website built with Next.js and Tailwind CSS.",
        imageUrl: "/project1.jpg",
        projectUrl: "https://your-portfolio.vercel.app",
        githubUrl: "https://github.com/yourusername/portfolio",
        technologies: ["Next.js", "Tailwind CSS", "React"]
      },
      {
        title: "Test DB Query 2",
        description: "A full-stack task management application with user authentication.",
        imageUrl: "/project2.jpg",
        projectUrl: "https://bc-app-lake.vercel.app/",
        githubUrl: "https://github.com/chriskeels/bc-app",
        technologies: ["React", "Node.js", "CSS"]
      },
      {
        title: "Test DB Query 3",
        description: "A responsive weather dashboard using external APIs.",
        imageUrl: "/project3.jpg",
        projectUrl: "https://weather-dash.vercel.app",
        githubUrl: "https://github.com/yourusername/weather-dashboard",
        technologies: ["JavaScript", "CSS", "Weather API"]
      }
    ]
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });