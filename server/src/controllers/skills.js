import { findAll, findById, create, update, remove } from '../models/index.js';

/**
 * Get all skills
 * @route GET /api/skills
 * @access Public
 */
export const getAllSkills = (req, res) => {
  try {
    const skills = findAll('skills');
    
    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    return res.status(200).json(groupedSkills);
  } catch (error) {
    console.error('Get all skills error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get skill by ID
 * @route GET /api/skills/:id
 * @access Public
 */
export const getSkillById = (req, res) => {
  try {
    const { id } = req.params;
    const skill = findById('skills', id);
    
    if (!skill) {
      return res.status(404).json({ error: { message: 'Skill not found' } });
    }
    
    return res.status(200).json(skill);
  } catch (error) {
    console.error('Get skill by ID error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Create a new skill
 * @route POST /api/skills
 * @access Private (Admin)
 */
export const createSkill = (req, res) => {
  try {
    const skillData = req.body;
    const newSkill = create('skills', skillData);
    
    return res.status(201).json(newSkill);
  } catch (error) {
    console.error('Create skill error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update a skill
 * @route PUT /api/skills/:id
 * @access Private (Admin)
 */
export const updateSkill = (req, res) => {
  try {
    const { id } = req.params;
    const skillData = req.body;
    
    // Check if skill exists
    const skill = findById('skills', id);
    
    if (!skill) {
      return res.status(404).json({ error: { message: 'Skill not found' } });
    }
    
    const updatedSkill = update('skills', id, skillData);
    
    return res.status(200).json(updatedSkill);
  } catch (error) {
    console.error('Update skill error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Delete a skill
 * @route DELETE /api/skills/:id
 * @access Private (Admin)
 */
export const deleteSkill = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if skill exists
    const skill = findById('skills', id);
    
    if (!skill) {
      return res.status(404).json({ error: { message: 'Skill not found' } });
    }
    
    // Delete the skill
    const deleted = remove('skills', id);
    
    if (!deleted) {
      return res.status(500).json({ error: { message: 'Failed to delete skill' } });
    }
    
    return res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
}; 