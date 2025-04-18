import { getAnalytics, updateAnalytics } from '../models/index.js';

/**
 * Get analytics data
 * @route GET /api/analytics
 * @access Private (Admin)
 */
export const getAnalyticsData = (req, res) => {
  try {
    const analytics = getAnalytics();
    return res.status(200).json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update analytics data
 * @route PUT /api/analytics
 * @access Private (Admin)
 */
export const updateAnalyticsData = (req, res) => {
  try {
    const analyticsData = req.body;
    const updatedAnalytics = updateAnalytics(analyticsData);
    return res.status(200).json(updatedAnalytics);
  } catch (error) {
    console.error('Update analytics error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Record page view
 * @route POST /api/analytics/pageview
 * @access Public
 */
export const recordPageView = (req, res) => {
  try {
    const analytics = getAnalytics();

    // Increment page views
    const updatedData = {
      pageViews: analytics.pageViews + 1,
      uniqueVisitors: analytics.uniqueVisitors + 1, // In a real app, this would check for unique visitors
    };

    const updatedAnalytics = updateAnalytics(updatedData);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Record page view error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Record project view
 * @route POST /api/analytics/project/:projectId
 * @access Public
 */
export const recordProjectView = (req, res) => {
  try {
    const { projectId } = req.params;
    const analytics = getAnalytics();

    // Find the project in the analytics
    const projectViewIndex = analytics.projectViews.findIndex(
      (pv) => pv.projectId === projectId,
    );

    let updatedProjectViews = [...analytics.projectViews];

    if (projectViewIndex !== -1) {
      // Update existing project views
      updatedProjectViews[projectViewIndex] = {
        ...updatedProjectViews[projectViewIndex],
        views: updatedProjectViews[projectViewIndex].views + 1,
      };
    } else {
      // Add new project to the views
      updatedProjectViews.push({
        projectId,
        views: 1,
      });
    }

    const updatedAnalytics = updateAnalytics({
      projectViews: updatedProjectViews,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Record project view error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getAnalyticsData,
  updateAnalyticsData,
  recordPageView,
  recordProjectView,
};
