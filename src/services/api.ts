
import { Package, packages } from '../models/Package';
import { WebsiteContent, websiteContent } from '../models/WebsiteContent';

// Simulate API request delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Package API
export const fetchPackages = async (): Promise<Package[]> => {
  await delay(800); // Simulate network delay
  return [...packages];
};

export const fetchPackageById = async (id: string): Promise<Package | undefined> => {
  await delay(600);
  return packages.find(pkg => pkg.id === id);
};

export const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
  await delay(1000);
  const newPackage: Package = {
    ...packageData,
    id: `${packages.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  packages.push(newPackage);
  return newPackage;
};

export const updatePackage = async (id: string, packageData: Partial<Package>): Promise<Package | undefined> => {
  await delay(1000);
  const index = packages.findIndex(pkg => pkg.id === id);
  
  if (index === -1) return undefined;
  
  const updatedPackage: Package = {
    ...packages[index],
    ...packageData,
    updatedAt: new Date()
  };
  
  packages[index] = updatedPackage;
  return updatedPackage;
};

export const deletePackage = async (id: string): Promise<boolean> => {
  await delay(800);
  const index = packages.findIndex(pkg => pkg.id === id);
  
  if (index === -1) return false;
  
  packages.splice(index, 1);
  return true;
};

// Website Content API
export const fetchContentByPage = async (page: string): Promise<WebsiteContent | undefined> => {
  await delay(700);
  return websiteContent.find(content => content.page === page);
};

export const updateContentByPage = async (page: string, contentData: Partial<WebsiteContent>): Promise<WebsiteContent | undefined> => {
  await delay(1000);
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
  await delay(500);
  return websiteContent.map(content => content.page);
};
