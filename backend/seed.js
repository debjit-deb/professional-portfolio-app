require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const ContactMessage = require('./src/models/ContactMessage');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await ContactMessage.deleteMany({});

    console.log('Seeding users...');
    const users = await User.create([
      {
        name: 'Arman',
        slug: 'arman',
        email: 'arman@company.com',
        password: 'SecurePass123',
        role: 'admin',
        title: 'Frontend Engineer',
        avatar: 'https://via.placeholder.com/200?text=Arman',
        bio: '5 years building performant React interfaces.',
      },
      {
        name: 'Biswajit',
        slug: 'biswajit',
        email: 'biswajit@company.com',
        password: 'SecurePass123',
        role: 'admin',
        title: 'Backend Engineer',
        avatar: 'https://via.placeholder.com/200?text=Biswajit',
        bio: 'Node.js and distributed systems specialist.',
      },
      {
        name: 'Debjit',
        slug: 'debjit',
        email: 'debjit@company.com',
        password: 'SecurePass123',
        role: 'admin',
        title: 'UI/UX Designer',
        avatar: 'https://via.placeholder.com/200?text=Debjit',
        bio: 'Designs clean, human-centered interfaces.',
      },
      {
        name: 'Sankha',
        slug: 'sankha',
        email: 'sankha@company.com',
        password: 'SecurePass123',
        role: 'admin',
        title: 'Full Stack Developer',
        avatar: 'https://via.placeholder.com/200?text=Sankha',
        bio: 'Builds end-to-end features across the stack.',
      },
      {
        name: 'Super Admin',
        slug: 'super-admin',
        email: 'superadmin@company.com',
        password: 'SuperSecurePass123',
        role: 'superadmin',
        title: 'Platform Owner',
        avatar: 'https://via.placeholder.com/200?text=SuperAdmin',
      },
    ]);

    console.log('Seeding projects...');
    await Project.create([
      {
        title: 'Weather Dashboard',
        image: 'https://via.placeholder.com/600x400?text=Weather+Dashboard',
        liveLink: 'https://weather-app.vercel.app',
        githubLink: 'https://github.com/arman/weather',
        description: 'Real-time weather with animated forecasts.',
        techStack: ['React', 'OpenWeather API', 'Tailwind CSS'],
        type: 'personal',
        owner: users[0]._id,
        featured: true,
      },
      {
        title: 'Realtime Chat API',
        image: 'https://via.placeholder.com/600x400?text=Chat+API',
        liveLink: 'https://chat-api-biswajit.onrender.com',
        githubLink: null,
        description: 'WebSocket-based real-time messaging system.',
        techStack: ['Node.js', 'Socket.io', 'MongoDB'],
        type: 'personal',
        owner: users[1]._id,
        featured: false,
      },
      {
        title: 'E-Commerce UI Kit',
        image: 'https://via.placeholder.com/600x400?text=UI+Kit',
        liveLink: 'https://ecommerce-uikit.netlify.app',
        githubLink: 'https://github.com/debjit/ecommerce-uikit',
        description: 'A comprehensive component library for e-commerce.',
        techStack: ['React', 'Tailwind CSS', 'Storybook'],
        type: 'personal',
        owner: users[2]._id,
        featured: true,
      },
      {
        title: 'Portfolio Analytics Tool',
        image: 'https://via.placeholder.com/600x400?text=Analytics',
        liveLink: 'https://analytics-sankha.vercel.app',
        githubLink: 'https://github.com/sankha/analytics-tool',
        description: 'Tracks visitor engagement across portfolio pages.',
        techStack: ['React', 'Node.js', 'Chart.js'],
        type: 'personal',
        owner: users[3]._id,
        featured: false,
      },
      {
        title: 'Company SaaS Platform',
        image: 'https://via.placeholder.com/600x400?text=SaaS+Platform',
        liveLink: 'https://company-saas.com',
        githubLink: null,
        description: 'Our flagship internal product, used company-wide.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Three.js'],
        type: 'organization',
        featured: true,
      },
    ]);

    console.log('Seeding contact messages...');
    await ContactMessage.create([
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        address: 'Bengaluru, India',
        message: "We'd like to discuss a potential collaboration on a SaaS product.",
        status: 'new',
      },
      {
        name: 'John Miller',
        email: 'john.miller@example.com',
        phone: '+1 415 555 0199',
        address: null,
        message: 'Interested in your Three.js configurator project — can we set up a call?',
        status: 'resolved',
      },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Default Accounts:');
    console.log('   Admin Accounts:');
    console.log('   - arman@company.com / SecurePass123');
    console.log('   - biswajit@company.com / SecurePass123');
    console.log('   - debjit@company.com / SecurePass123');
    console.log('   - sankha@company.com / SecurePass123');
    console.log('   Super Admin Account:');
    console.log('   - superadmin@company.com / SuperSecurePass123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
