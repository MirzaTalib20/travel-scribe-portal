
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-travel-cream">
      <div className="text-center max-w-3xl px-4">
        <div className="flex items-center justify-center mb-6">
          <Compass className="w-12 h-12 text-travel-teal" />
          <h1 className="text-4xl font-bold text-travel-dark ml-2">TravelScribe</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-travel-dark">
          Travel Portal Backend & Admin Dashboard
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          A complete backend solution for managing travel packages and website content
          with a modern admin interface.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            className="bg-travel-teal hover:bg-travel-teal/90 text-white px-8 py-6 text-lg"
            onClick={() => navigate('/admin')}
          >
            Access Admin Dashboard
          </Button>
          <Button 
            variant="outline"
            className="border-travel-teal text-travel-teal hover:bg-travel-teal/10 px-8 py-6 text-lg"
            onClick={() => navigate('/api-docs')}
          >
            View API Documentation
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-travel-dark text-xl mb-3">Travel Package Management</h3>
            <p className="text-gray-600">Create and manage travel packages with detailed information including itineraries, pricing, and features.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-travel-dark text-xl mb-3">Content Management</h3>
            <p className="text-gray-600">Update website content for multiple pages including home, about, and gallery sections.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-travel-dark text-xl mb-3">API Integration</h3>
            <p className="text-gray-600">REST API endpoints ready to connect with your frontend website or mobile applications.</p>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-500">
        <p>TravelScribe Portal v1.0</p>
      </footer>
    </div>
  );
};

export default Index;
