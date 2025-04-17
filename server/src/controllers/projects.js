import { findAll, findById, create, update, remove } from '../models/index.js';

/**
 * Get all projects
 * @route GET /api/projects
 * @access Public
 */
export const getAllProjects = (req, res) => {
  try {
    const projects = findAll('projects');
    
    // Sort by order
    const sortedProjects = projects.sort((a, b) => a.order - b.order);
    
    return res.status(200).json(sortedProjects);
  } catch (error) {
    console.error('Get all projects error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get project by ID
 * @route GET /api/projects/:id
 * @access Public
 */
export const getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = findById('projects', id);
    
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }
    
    return res.status(200).json(project);
  } catch (error) {
    console.error('Get project by ID error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get featured projects
 * @route GET /api/projects/featured
 * @access Public
 */
export const getFeaturedProjects = (req, res) => {
  try {
    const projects = findAll('projects');
    
    // Filter featured and sort by order
    const featuredProjects = projects
      .filter(project => project.featured)
      .sort((a, b) => a.order - b.order);
    
    return res.status(200).json(featuredProjects);
  } catch (error) {
    console.error('Get featured projects error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Create a new project
 * @route POST /api/projects
 * @access Private (Admin)
 */
export const createProject = (req, res) => {
  try {
    const projectData = req.body;
    
    // Generate slug if not provided
    if (!projectData.slug) {
      projectData.slug = projectData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    
    // Get max order and add 1
    const projects = findAll('projects');
    const maxOrder = projects.reduce((max, project) => {
      return project.order > max ? project.order : max;
    }, 0);
    
    projectData.order = projectData.order || (maxOrder + 1);
    
    const newProject = create('projects', projectData);
    
    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update a project
 * @route PUT /api/projects/:id
 * @access Private (Admin)
 */
export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    
    // Check if project exists
    const project = findById('projects', id);
    
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }
    
    // Update slug if title changed and slug wasn't manually provided
    if (projectData.title && projectData.title !== project.title && !projectData.slug) {
      projectData.slug = projectData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    
    const updatedProject = update('projects', id, projectData);
    
    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Delete a project
 * @route DELETE /api/projects/:id
 * @access Private (Admin)
 */
export const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = findById('projects', id);
    
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }
    
    // Delete the project
    const deleted = remove('projects', id);
    
    if (!deleted) {
      return res.status(500).json({ error: { message: 'Failed to delete project' } });
    }
    
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject
}; 