
import { Package } from '../models/Package';
import { WebsiteContent, websiteContent } from '../models/WebsiteContent';

// Base API URL - replace with your actual API URL in production
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Package API - now connects to MongoDB backend
export const fetchPackages = async (): Promise<Package[]> => {
  try {
    const response = await fetch(`${API_URL}/packages`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
};

export const fetchPackageById = async (id: string): Promise<Package | undefined> => {
  try {
    const response = await fetch(`${API_URL}/packages/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch package');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching package:', error);
    return undefined;
  }
};

export const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
  try {
    const response = await fetch(`${API_URL}/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create package');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

export const updatePackage = async (id: string, packageData: Partial<Package>): Promise<Package | undefined> => {
  try {
    const response = await fetch(`${API_URL}/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update package');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating package:', error);
    return undefined;
  }
};

export const deletePackage = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/packages/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete package');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting package:', error);
    return false;
  }
};

// Website Content API - still using in-memory data for now
// Note: These methods can also be updated to use the backend API when ready
export const fetchContentByPage = async (page: string): Promise<WebsiteContent | undefined> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 700));
  return websiteContent.find(content => content.page === page);
};

export const updateContentByPage = async (page: string, contentData: Partial<WebsiteContent>): Promise<WebsiteContent | undefined> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = websiteContent.findIndex(content => content.page === page);
  
  if (index === -1) return undefined;
  
  const updatedContent: WebsiteContent = {
    ...websiteContent[index],
    ...contentData,
    updatedAt: new Date()
  };
  
  websiteContent[index] = updatedContent;
  return updatedContent;
};

export const getAllPages = async (): Promise<string[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return websiteContent.map(content => content.page);
};
