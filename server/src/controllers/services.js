import { findAll, findById, create, update, remove } from '../models/index.js';

/**
 * Get all services
 * @route GET /api/services
 * @access Public
 */
export const getAllServices = (req, res) => {
  try {
    const services = findAll('services');
    
    // Sort by order
    const sortedServices = services.sort((a, b) => a.order - b.order);
    
    return res.status(200).json(sortedServices);
  } catch (error) {
    console.error('Get all services error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get service by ID
 * @route GET /api/services/:id
 * @access Public
 */
export const getServiceById = (req, res) => {
  try {
    const { id } = req.params;
    const service = findById('services', id);
    
    if (!service) {
      return res.status(404).json({ error: { message: 'Service not found' } });
    }
    
    return res.status(200).json(service);
  } catch (error) {
    console.error('Get service by ID error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Create a new service
 * @route POST /api/services
 * @access Private (Admin)
 */
export const createService = (req, res) => {
  try {
    const serviceData = req.body;
    
    // Get max order and add 1 if not provided
    if (!serviceData.order) {
      const services = findAll('services');
      const maxOrder = services.reduce((max, service) => {
        return service.order > max ? service.order : max;
      }, 0);
      
      serviceData.order = maxOrder + 1;
    }
    
    const newService = create('services', serviceData);
    
    return res.status(201).json(newService);
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Update a service
 * @route PUT /api/services/:id
 * @access Private (Admin)
 */
export const updateService = (req, res) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;
    
    // Check if service exists
    const service = findById('services', id);
    
    if (!service) {
      return res.status(404).json({ error: { message: 'Service not found' } });
    }
    
    const updatedService = update('services', id, serviceData);
    
    return res.status(200).json(updatedService);
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Delete a service
 * @route DELETE /api/services/:id
 * @access Private (Admin)
 */
export const deleteService = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if service exists
    const service = findById('services', id);
    
    if (!service) {
      return res.status(404).json({ error: { message: 'Service not found' } });
    }
    
    // Delete the service
    const deleted = remove('services', id);
    
    if (!deleted) {
      return res.status(500).json({ error: { message: 'Failed to delete service' } });
    }
    
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
}; 