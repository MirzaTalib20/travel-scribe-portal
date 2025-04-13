
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPackages, deletePackage } from '@/services/api';
import { Package } from '@/models/Package';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Search, Package as PackageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

export default function PackagesList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
        setFilteredPackages(data);
      } catch (error) {
        console.error('Failed to load packages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load travel packages',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  useEffect(() => {
    const filtered = packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPackages(filtered);
  }, [searchQuery, packages]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        setPackages(packages.filter(pkg => pkg.id !== id));
        toast({
          title: 'Success',
          description: 'Package deleted successfully',
        });
      } catch (error) {
        console.error('Failed to delete package:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete package',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-travel-dark">Travel Packages</h2>
          <p className="text-muted-foreground">Manage your available travel packages.</p>
        </div>
        <Button onClick={() => navigate('/admin/packages/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Packages</CardTitle>
              <CardDescription>You have {filteredPackages.length} travel packages.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-teal"></div>
            </div>
          ) : filteredPackages.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.title}</TableCell>
                      <TableCell>{pkg.location}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell>{pkg.duration}</TableCell>
                      <TableCell>
                        {pkg.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Standard
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/packages/edit/${pkg.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <PackageIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No packages found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "We couldn't find any packages matching your search."
                  : "You haven't added any travel packages yet."}
              </p>
              {searchQuery ? (
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                  Clear search
                </Button>
              ) : (
                <Button className="mt-4" onClick={() => navigate('/admin/packages/new')}>
                  <Plus className="mr-2 h-4 w-4" /> Add Package
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
