import { getProfile, updateProfile } from '../models/index.js';

/**
 * Get profile data
 * @route GET /api/profile
 * @access Public
 */
export const getProfileData = (req, res) => {
  try {
    const profile = getProfile();
    return res.status(200).json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update profile data
 * @route PUT /api/profile
 * @access Private (Admin)
 */
export const updateProfileData = (req, res) => {
  try {
    const profileData = req.body;
    const updatedProfile = updateProfile(profileData);
    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getProfileData,
  updateProfileData,
};
