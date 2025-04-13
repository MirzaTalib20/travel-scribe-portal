
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Package, FileText, Layout, Code } from 'lucide-react';

export default function ApiDocs() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-travel-dark">API Documentation</h1>
            <p className="text-gray-500">Reference guide for TravelScribe's REST API endpoints</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Layout className="h-5 w-5 text-travel-teal mr-2" />
              <CardTitle>Introduction</CardTitle>
            </div>
            <CardDescription>Overview of the TravelScribe API</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              The TravelScribe API provides programmatic access to travel packages and website content.
              All API requests should be made to the base URL: <code>/api</code>
            </p>
            <div className="bg-gray-100 p-4 rounded-md my-4">
              <p className="font-mono text-sm">Base URL: <code>/api</code></p>
            </div>
            <p>All responses are returned in JSON format. Authentication is required for write operations.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Package className="h-5 w-5 text-travel-teal mr-2" />
              <CardTitle>Travel Packages Endpoints</CardTitle>
            </div>
            <CardDescription>Manage travel packages through these endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Get All Packages</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">GET</span> /api/packages
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Returns a list of all available travel packages.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Response: 200 OK</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify([
                    {
                      "id": "1",
                      "title": "Bali Paradise Escape",
                      "description": "Experience the beautiful beaches of Bali...",
                      "price": 1299,
                      "duration": "7 days"
                    }
                  ], null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Get Package by ID</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">GET</span> /api/packages/:id
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Returns detailed information about a specific package.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Response: 200 OK</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify({
                    "id": "1",
                    "title": "Bali Paradise Escape",
                    "description": "Experience the beautiful beaches and vibrant culture of Bali on this 7-day adventure.",
                    "price": 1299,
                    "duration": "7 days",
                    "location": "Bali, Indonesia",
                    "itinerary": [
                      { "day": 1, "title": "Arrival in Denpasar" }
                    ],
                    "inclusions": ["Hotel accommodation", "Daily breakfast"],
                    "exclusions": ["International flights", "Travel insurance"]
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Create Package</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600 font-bold">POST</span> /api/packages
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Creates a new travel package. Requires authentication.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Request Body:</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify({
                    "title": "New Package Title",
                    "description": "Package description",
                    "price": 999,
                    "duration": "5 days",
                    "location": "Destination"
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Update Package</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-orange-600 font-bold">PUT</span> /api/packages/:id
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Updates an existing travel package. Requires authentication.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Delete Package</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-red-600 font-bold">DELETE</span> /api/packages/:id
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Deletes a travel package. Requires authentication.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-travel-teal mr-2" />
              <CardTitle>Website Content Endpoints</CardTitle>
            </div>
            <CardDescription>Manage website content through these endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Get Content by Page</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">GET</span> /api/content/:page
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Returns content for a specific page (e.g., home, about).</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Response: 200 OK</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify({
                    "page": "home",
                    "title": "TravelScribe - Your Journey Begins Here",
                    "description": "Discover amazing travel packages and experiences",
                    "blocks": [
                      {
                        "id": "home-hero-1",
                        "type": "hero",
                        "title": "Explore the World with TravelScribe"
                      }
                    ]
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Update Content by Page</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-orange-600 font-bold">PUT</span> /api/content/:page
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Updates content for a specific page. Requires authentication.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Request Body:</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify({
                    "title": "Updated Page Title",
                    "description": "Updated page description",
                    "blocks": [
                      {
                        "id": "home-hero-1",
                        "title": "Updated Hero Title"
                      }
                    ]
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Get All Pages</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">GET</span> /api/content
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-2">Returns a list of all content pages.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                <p className="font-mono text-xs">Response: 200 OK</p>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {JSON.stringify(["home", "about"], null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Code className="h-5 w-5 text-travel-teal mr-2" />
              <CardTitle>Authentication</CardTitle>
            </div>
            <CardDescription>How to authenticate with the API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              All write operations (POST, PUT, DELETE) require authentication via a bearer token.
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="font-mono text-sm">
                Authorization: Bearer {"<your_api_token>"}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Contact your administrator to get an API token.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-travel-teal text-travel-teal hover:bg-travel-teal/10"
            onClick={() => navigate('/')}
          >
            Back to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
}
