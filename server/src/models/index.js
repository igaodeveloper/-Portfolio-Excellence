import { v4 as uuidv4 } from 'uuid';

// In-memory data storage
let data = {
  users: [
    {
      id: '1',
      email: 'admin@example.com',
      password: '$2a$10$sWh4Wnf64WjyQ4v2f8OU5uW3jWgvM94xZpBFOZ5lWHPMbEL7Z3JjC', // hashed 'password123'
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  profile: {
    name: 'John Doe',
    title: 'Full Stack Developer',
    subtitle: 'Turning ideas into real life products',
    bio: 'Experienced developer with a passion for creating beautiful, functional applications.',
    email: 'contact@johndoe.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    },
    avatar: 'https://example.com/avatar.jpg'
  },
  skills: [
    { id: '1', name: 'React', category: 'frontend', level: 90 },
    { id: '2', name: 'Node.js', category: 'backend', level: 85 },
    { id: '3', name: 'TypeScript', category: 'language', level: 80 },
    { id: '4', name: 'MongoDB', category: 'database', level: 75 },
    { id: '5', name: 'Express', category: 'backend', level: 85 }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      title: 'Senior Developer',
      location: 'Remote',
      startDate: '2021-01-01',
      endDate: null,
      current: true,
      description: 'Leading development of enterprise web applications.'
    },
    {
      id: '2',
      company: 'Web Solutions Ltd.',
      title: 'Full Stack Developer',
      location: 'New York, NY',
      startDate: '2018-06-01',
      endDate: '2020-12-31',
      current: false,
      description: 'Developed and maintained various client websites and applications.'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-featured e-commerce solution with payment processing, inventory management, and analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      imageUrl: 'https://example.com/project1.jpg',
      demoUrl: 'https://demo.example.com/project1',
      githubUrl: 'https://github.com/johndoe/project1',
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      slug: 'mobile-banking-app',
      description: 'A secure mobile banking application with real-time transactions and budgeting tools.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Express'],
      imageUrl: 'https://example.com/project2.jpg',
      demoUrl: 'https://demo.example.com/project2',
      githubUrl: 'https://github.com/johndoe/project2',
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  services: [
    {
      id: '1',
      title: 'Web Development',
      description: 'Building responsive and interactive websites using modern technologies.',
      icon: 'code',
      order: 1
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Creating native and cross-platform mobile applications.',
      icon: 'smartphone',
      order: 2
    },
    {
      id: '3',
      title: 'API Development',
      description: 'Designing and implementing RESTful APIs and backend services.',
      icon: 'server',
      order: 3
    }
  ],
  analytics: {
    pageViews: 1234,
    uniqueVisitors: 567,
    averageSessionDuration: '2:45',
    trafficSources: [
      { name: 'Direct', percentage: 45 },
      { name: 'LinkedIn', percentage: 32 },
      { name: 'GitHub', percentage: 18 },
      { name: 'Other', percentage: 5 }
    ],
    projectViews: [
      { projectId: '1', views: 423 },
      { projectId: '2', views: 287 }
    ],
    lastUpdated: new Date().toISOString()
  }
};

// Generic CRUD methods
export const findAll = (collection) => {
  return [...data[collection]];
};

export const findById = (collection, id) => {
  return data[collection].find(item => item.id === id) || null;
};

export const findByField = (collection, field, value) => {
  return data[collection].find(item => item[field] === value) || null;
};

export const create = (collection, item) => {
  const newItem = {
    id: item.id || uuidv4(),
    ...item,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data[collection].push(newItem);
  return newItem;
};

export const update = (collection, id, updates) => {
  const index = data[collection].findIndex(item => item.id === id);
  if (index === -1) return null;

  data[collection][index] = {
    ...data[collection][index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  return data[collection][index];
};

export const remove = (collection, id) => {
  const index = data[collection].findIndex(item => item.id === id);
  if (index === -1) return false;

  data[collection].splice(index, 1);
  return true;
};

// Singleton object methods
export const getProfile = () => {
  return { ...data.profile };
};

export const updateProfile = (updates) => {
  data.profile = {
    ...data.profile,
    ...updates
  };
  return data.profile;
};

export const getAnalytics = () => {
  return { ...data.analytics };
};

export const updateAnalytics = (updates) => {
  data.analytics = {
    ...data.analytics,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  return data.analytics;
};

// Export data model interfaces
export default {
  findAll,
  findById,
  findByField,
  create,
  update,
  remove,
  getProfile,
  updateProfile,
  getAnalytics,
  updateAnalytics
}; 