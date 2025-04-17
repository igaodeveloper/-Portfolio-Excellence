import { findAll, findById, create, update, remove } from '../models/index.js';

/**
 * Get all experiences
 * @route GET /api/experience
 * @access Public
 */
export const getAllExperiences = (req, res) => {
  try {
    const experiences = findAll('experience');
    
    // Sort by startDate in descending order (most recent first)
    const sortedExperiences = experiences.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });
    
    return res.status(200).json(sortedExperiences);
  } catch (error) {
    console.error('Get all experiences error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get experience by ID
 * @route GET /api/experience/:id
 * @access Public
 */
export const getExperienceById = (req, res) => {
  try {
    const { id } = req.params;
    const experience = findById('experience', id);
    
    if (!experience) {
      return res.status(404).json({ error: { message: 'Experience not found' } });
    }
    
    return res.status(200).json(experience);
  } catch (error) {
    console.error('Get experience by ID error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Create a new experience
 * @route POST /api/experience
 * @access Private (Admin)
 */
export const createExperience = (req, res) => {
  try {
    const experienceData = req.body;
    
    // If current is true, ensure endDate is null
    if (experienceData.current === true) {
      experienceData.endDate = null;
    }
    
    const newExperience = create('experience', experienceData);
    
    return res.status(201).json(newExperience);
  } catch (error) {
    console.error('Create experience error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update an experience
 * @route PUT /api/experience/:id
 * @access Private (Admin)
 */
export const updateExperience = (req, res) => {
  try {
    const { id } = req.params;
    const experienceData = req.body;
    
    // Check if experience exists
    const experience = findById('experience', id);
    
    if (!experience) {
      return res.status(404).json({ error: { message: 'Experience not found' } });
    }
    
    // If current is true, ensure endDate is null
    if (experienceData.current === true) {
      experienceData.endDate = null;
    }
    
    const updatedExperience = update('experience', id, experienceData);
    
    return res.status(200).json(updatedExperience);
  } catch (error) {
    console.error('Update experience error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Delete an experience
 * @route DELETE /api/experience/:id
 * @access Private (Admin)
 */
export const deleteExperience = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if experience exists
    const experience = findById('experience', id);
    
    if (!experience) {
      return res.status(404).json({ error: { message: 'Experience not found' } });
    }
    
    // Delete the experience
    const deleted = remove('experience', id);
    
    if (!deleted) {
      return res.status(500).json({ error: { message: 'Failed to delete experience' } });
    }
    
    return res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Delete experience error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
}; 