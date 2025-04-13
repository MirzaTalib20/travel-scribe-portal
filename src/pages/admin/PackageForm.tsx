
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPackageById, createPackage, updatePackage } from '@/services/api';
import { Package, ItineraryDay, FAQ } from '@/models/Package';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft, Save, Plus, Trash2, Loader2 } from 'lucide-react';

export default function PackageForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  const [packageData, setPackageData] = useState<Partial<Package>>({
    title: '',
    description: '',
    price: 0,
    duration: '',
    location: '',
    imageUrl: '',
    itinerary: [{ day: 1, title: '', description: '', activities: [''] }],
    inclusions: [''],
    exclusions: [''],
    faqs: [{ question: '', answer: '' }],
    featured: false
  });
  
  useEffect(() => {
    if (isEditing) {
      const loadPackage = async () => {
        try {
          const data = await fetchPackageById(id!);
          if (data) {
            setPackageData(data);
          } else {
            toast({
              title: 'Error',
              description: 'Package not found',
              variant: 'destructive',
            });
            navigate('/admin/packages');
          }
        } catch (error) {
          console.error('Failed to load package:', error);
          toast({
            title: 'Error',
            description: 'Failed to load package details',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };
      
      loadPackage();
    }
  }, [id, isEditing, navigate]);
  
  const handleInputChange = (field: keyof Package, value: any) => {
    setPackageData({
      ...packageData,
      [field]: value,
    });
  };
  
  // Handle itinerary changes
  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    updatedItinerary[index] = {
      ...updatedItinerary[index],
      [field]: value,
    };
    handleInputChange('itinerary', updatedItinerary);
  };
  
  const addItineraryDay = () => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    const lastDay = updatedItinerary.length > 0 ? updatedItinerary[updatedItinerary.length - 1].day : 0;
    updatedItinerary.push({ day: lastDay + 1, title: '', description: '', activities: [''] });
    handleInputChange('itinerary', updatedItinerary);
  };
  
  const removeItineraryDay = (index: number) => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    updatedItinerary.splice(index, 1);
    // Re-number the days
    updatedItinerary.forEach((day, idx) => {
      day.day = idx + 1;
    });
    handleInputChange('itinerary', updatedItinerary);
  };
  
  // Handle itinerary activities
  const updateActivity = (dayIndex: number, activityIndex: number, value: string) => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    updatedItinerary[dayIndex].activities[activityIndex] = value;
    handleInputChange('itinerary', updatedItinerary);
  };
  
  const addActivity = (dayIndex: number) => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    updatedItinerary[dayIndex].activities.push('');
    handleInputChange('itinerary', updatedItinerary);
  };
  
  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = [...(packageData.itinerary || [])];
    updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
    handleInputChange('itinerary', updatedItinerary);
  };
  
  // Handle inclusions/exclusions
  const updateListItem = (list: 'inclusions' | 'exclusions', index: number, value: string) => {
    const updatedList = [...(packageData[list] || [])];
    updatedList[index] = value;
    handleInputChange(list, updatedList);
  };
  
  const addListItem = (list: 'inclusions' | 'exclusions') => {
    const updatedList = [...(packageData[list] || [])];
    updatedList.push('');
    handleInputChange(list, updatedList);
  };
  
  const removeListItem = (list: 'inclusions' | 'exclusions', index: number) => {
    const updatedList = [...(packageData[list] || [])];
    updatedList.splice(index, 1);
    handleInputChange(list, updatedList);
  };
  
  // Handle FAQs
  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const updatedFAQs = [...(packageData.faqs || [])];
    updatedFAQs[index] = {
      ...updatedFAQs[index],
      [field]: value,
    };
    handleInputChange('faqs', updatedFAQs);
  };
  
  const addFAQ = () => {
    const updatedFAQs = [...(packageData.faqs || [])];
    updatedFAQs.push({ question: '', answer: '' });
    handleInputChange('faqs', updatedFAQs);
  };
  
  const removeFAQ = (index: number) => {
    const updatedFAQs = [...(packageData.faqs || [])];
    updatedFAQs.splice(index, 1);
    handleInputChange('faqs', updatedFAQs);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (isEditing) {
        await updatePackage(id!, packageData);
        toast({ title: 'Success', description: 'Package updated successfully' });
      } else {
        await createPackage(packageData as any);
        toast({ title: 'Success', description: 'Package created successfully' });
      }
      navigate('/admin/packages');
    } catch (error) {
      console.error('Failed to save package:', error);
      toast({
        title: 'Error',
        description: isEditing ? 'Failed to update package' : 'Failed to create package',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-teal"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/packages')}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Button>
          <h2 className="text-2xl font-bold tracking-tight text-travel-dark">
            {isEditing ? 'Edit Package' : 'Create New Package'}
          </h2>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Package
            </>
          )}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Package Title</Label>
                <Input
                  id="title"
                  value={packageData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. Bali Paradise Escape"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={packageData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. Bali, Indonesia"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={packageData.price}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  placeholder="e.g. 1299"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={packageData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g. 7 days"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={packageData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Write a detailed description of the package"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={packageData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {packageData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={packageData.imageUrl} 
                    alt="Package Preview" 
                    className="max-h-40 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={packageData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Package</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {packageData.itinerary && packageData.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="border p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => removeItineraryDay(dayIndex)}
                  className="absolute right-2 top-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="bg-travel-teal text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {day.day}
                    </div>
                    <h3 className="text-lg font-medium ml-2">Day {day.day}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`day-${dayIndex}-title`}>Day Title</Label>
                    <Input
                      id={`day-${dayIndex}-title`}
                      value={day.title}
                      onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                      placeholder="e.g. Arrival in Denpasar"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`day-${dayIndex}-description`}>Description</Label>
                    <Textarea
                      id={`day-${dayIndex}-description`}
                      value={day.description}
                      onChange={(e) => updateItineraryDay(dayIndex, 'description', e.target.value)}
                      placeholder="Describe the day's activities"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Activities</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addActivity(dayIndex)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Activity
                      </Button>
                    </div>
                    
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-center gap-2">
                        <Input
                          value={activity}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                          placeholder="e.g. Hotel check-in"
                        />
                        {day.activities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={addItineraryDay}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Day to Itinerary
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Inclusions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {packageData.inclusions && packageData.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={inclusion}
                    onChange={(e) => updateListItem('inclusions', index, e.target.value)}
                    placeholder="e.g. Hotel accommodation"
                  />
                  {packageData.inclusions!.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeListItem('inclusions', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addListItem('inclusions')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Inclusion
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exclusions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {packageData.exclusions && packageData.exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={exclusion}
                    onChange={(e) => updateListItem('exclusions', index, e.target.value)}
                    placeholder="e.g. International flights"
                  />
                  {packageData.exclusions!.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeListItem('exclusions', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addListItem('exclusions')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Exclusion
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {packageData.faqs && packageData.faqs.map((faq, index) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="absolute right-2 top-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`faq-${index}-question`}>Question</Label>
                    <Input
                      id={`faq-${index}-question`}
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      placeholder="e.g. What's the best time to visit?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`faq-${index}-answer`}>Answer</Label>
                    <Textarea
                      id={`faq-${index}-answer`}
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      placeholder="Provide a helpful answer"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={addFAQ}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Package
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
