
import React, { useState, useEffect } from 'react';
import { getAllPages, fetchContentByPage, updateContentByPage } from '@/services/api';
import { WebsiteContent } from '@/models/WebsiteContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function ContentManagement() {
  const [pages, setPages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const pagesData = await getAllPages();
        setPages(pagesData);
        if (pagesData.length > 0) {
          setActiveTab(pagesData[0]);
        }
      } catch (error) {
        console.error('Failed to load pages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load website pages',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  useEffect(() => {
    if (activeTab) {
      loadPageContent(activeTab);
    }
  }, [activeTab]);

  const loadPageContent = async (page: string) => {
    setLoading(true);
    try {
      const contentData = await fetchContentByPage(page);
      setContent(contentData || null);
    } catch (error) {
      console.error(`Failed to load ${page} content:`, error);
      toast({
        title: 'Error',
        description: `Failed to load ${page} page content`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (field: string, value: string) => {
    if (!content) return;
    
    setContent({
      ...content,
      [field]: value,
    });
  };

  const handleBlockChange = (blockId: string, field: string, value: string) => {
    if (!content) return;
    
    const updatedBlocks = content.blocks.map(block => 
      block.id === blockId ? { ...block, [field]: value } : block
    );
    
    setContent({
      ...content,
      blocks: updatedBlocks,
    });
  };

  const handleBlockItemChange = (blockId: string, itemIndex: number, field: string, value: string) => {
    if (!content) return;
    
    const updatedBlocks = content.blocks.map(block => {
      if (block.id === blockId && block.items) {
        const updatedItems = [...block.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          [field]: value
        };
        return { ...block, items: updatedItems };
      }
      return block;
    });
    
    setContent({
      ...content,
      blocks: updatedBlocks,
    });
  };

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      await updateContentByPage(content.page, content);
      toast({
        title: 'Success',
        description: `${content.page.charAt(0).toUpperCase() + content.page.slice(1)} page content updated successfully`,
      });
    } catch (error) {
      console.error('Failed to update content:', error);
      toast({
        title: 'Error',
        description: 'Failed to update page content',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-travel-dark">Website Content</h2>
          <p className="text-muted-foreground">Manage your website content by page.</p>
        </div>
        <Button onClick={handleSave} disabled={saving || loading || !content}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Website Content</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && !content ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-teal"></div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                {pages.map((page) => (
                  <TabsTrigger key={page} value={page} className="capitalize">
                    {page}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {content && pages.map((page) => (
                <TabsContent key={page} value={page} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="page-title">Page Title</Label>
                      <Input
                        id="page-title"
                        value={content.title}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="page-description">Meta Description</Label>
                      <Input
                        id="page-description"
                        value={content.description}
                        onChange={(e) => handleContentChange('description', e.target.value)}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">Content Blocks</h3>
                  
                  <div className="space-y-6">
                    {content.blocks.map((block) => (
                      <Card key={block.id}>
                        <CardHeader>
                          <CardTitle className="text-base capitalize">{block.type} Block</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {block.title !== undefined && (
                            <div className="grid gap-2">
                              <Label htmlFor={`${block.id}-title`}>Title</Label>
                              <Input
                                id={`${block.id}-title`}
                                value={block.title}
                                onChange={(e) => handleBlockChange(block.id, 'title', e.target.value)}
                              />
                            </div>
                          )}
                          
                          {block.content !== undefined && (
                            <div className="grid gap-2">
                              <Label htmlFor={`${block.id}-content`}>Content</Label>
                              <Textarea
                                id={`${block.id}-content`}
                                value={block.content}
                                onChange={(e) => handleBlockChange(block.id, 'content', e.target.value)}
                                rows={4}
                              />
                            </div>
                          )}
                          
                          {block.imageUrl !== undefined && (
                            <div className="grid gap-2">
                              <Label htmlFor={`${block.id}-image`}>Image URL</Label>
                              <Input
                                id={`${block.id}-image`}
                                value={block.imageUrl}
                                onChange={(e) => handleBlockChange(block.id, 'imageUrl', e.target.value)}
                              />
                              {block.imageUrl && (
                                <div className="mt-2">
                                  <img 
                                    src={block.imageUrl} 
                                    alt="Preview" 
                                    className="max-h-40 rounded-md object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                          
                          {block.buttonText !== undefined && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`${block.id}-button-text`}>Button Text</Label>
                                <Input
                                  id={`${block.id}-button-text`}
                                  value={block.buttonText}
                                  onChange={(e) => handleBlockChange(block.id, 'buttonText', e.target.value)}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`${block.id}-button-link`}>Button Link</Label>
                                <Input
                                  id={`${block.id}-button-link`}
                                  value={block.buttonLink || ''}
                                  onChange={(e) => handleBlockChange(block.id, 'buttonLink', e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          
                          {block.items && block.items.length > 0 && (
                            <div className="space-y-4">
                              <Label>Items</Label>
                              {block.items.map((item, index) => (
                                <Card key={index}>
                                  <CardContent className="pt-4 space-y-4">
                                    {item.title !== undefined && (
                                      <div className="grid gap-2">
                                        <Label htmlFor={`${block.id}-item-${index}-title`}>Title</Label>
                                        <Input
                                          id={`${block.id}-item-${index}-title`}
                                          value={item.title}
                                          onChange={(e) => handleBlockItemChange(block.id, index, 'title', e.target.value)}
                                        />
                                      </div>
                                    )}
                                    
                                    {item.content !== undefined && (
                                      <div className="grid gap-2">
                                        <Label htmlFor={`${block.id}-item-${index}-content`}>Content</Label>
                                        <Textarea
                                          id={`${block.id}-item-${index}-content`}
                                          value={item.content}
                                          onChange={(e) => handleBlockItemChange(block.id, index, 'content', e.target.value)}
                                          rows={3}
                                        />
                                      </div>
                                    )}
                                    
                                    {item.imageUrl !== undefined && (
                                      <div className="grid gap-2">
                                        <Label htmlFor={`${block.id}-item-${index}-image`}>Image URL</Label>
                                        <Input
                                          id={`${block.id}-item-${index}-image`}
                                          value={item.imageUrl}
                                          onChange={(e) => handleBlockItemChange(block.id, index, 'imageUrl', e.target.value)}
                                        />
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
