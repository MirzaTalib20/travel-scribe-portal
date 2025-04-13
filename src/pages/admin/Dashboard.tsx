
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package as PackageIcon, FileText, Users, Globe } from 'lucide-react';
import { packages } from '@/models/Package';
import { websiteContent } from '@/models/WebsiteContent';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-travel-dark">Welcome to TravelScribe Admin</h2>
        <p className="text-muted-foreground">Manage your travel packages and website content.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <PackageIcon className="h-4 w-4 text-travel-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.length}</div>
            <p className="text-xs text-muted-foreground">Travel packages in your catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Pages</CardTitle>
            <FileText className="h-4 w-4 text-travel-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websiteContent.length}</div>
            <p className="text-xs text-muted-foreground">Website content pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Packages</CardTitle>
            <Globe className="h-4 w-4 text-travel-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.filter(pkg => pkg.featured).length}</div>
            <p className="text-xs text-muted-foreground">Packages featured on your site</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <Users className="h-4 w-4 text-travel-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">Since last content update</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-travel-teal/10 p-2 rounded-full">
                  <PackageIcon className="h-4 w-4 text-travel-teal" />
                </div>
                <div>
                  <p className="text-sm font-medium">Thailand Adventure package updated</p>
                  <p className="text-xs text-muted-foreground">30 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-travel-teal/10 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-travel-teal" />
                </div>
                <div>
                  <p className="text-sm font-medium">Home page content edited</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-travel-teal/10 p-2 rounded-full">
                  <PackageIcon className="h-4 w-4 text-travel-teal" />
                </div>
                <div>
                  <p className="text-sm font-medium">New package created: Bali Paradise Escape</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <PackageIcon className="h-4 w-4 text-travel-teal mr-2" />
              <p className="text-sm">Add new travel package</p>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <FileText className="h-4 w-4 text-travel-teal mr-2" />
              <p className="text-sm">Edit home page content</p>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Globe className="h-4 w-4 text-travel-teal mr-2" />
              <p className="text-sm">Update about page</p>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Users className="h-4 w-4 text-travel-teal mr-2" />
              <p className="text-sm">View website analytics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
