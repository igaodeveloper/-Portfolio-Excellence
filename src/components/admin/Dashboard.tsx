import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LogoutButton } from './Auth';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  LayoutDashboard,
  BarChart3,
  FileEdit,
  FolderKanban,
  Upload,
  Menu,
  X,
  User,
} from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';

// Placeholder components for dashboard sections
const DashboardOverview = () => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">
      Welcome to your Portfolio Dashboard
    </h2>
    <p className="text-muted-foreground mb-6">
      Manage your portfolio content, track analytics, and update your projects
      from this central dashboard.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Quick Stats</h3>
        <p className="text-3xl font-bold">1,234</p>
        <p className="text-sm text-muted-foreground">Total Portfolio Views</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Projects</h3>
        <p className="text-3xl font-bold">12</p>
        <p className="text-sm text-muted-foreground">Active Projects</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Last Updated</h3>
        <p className="text-xl font-bold">2 days ago</p>
        <p className="text-sm text-muted-foreground">Content Freshness</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Content updated</span>
            <span className="text-sm text-muted-foreground">
              Today, 10:23 AM
            </span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>New project added</span>
            <span className="text-sm text-muted-foreground">
              Yesterday, 3:45 PM
            </span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Media uploaded</span>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </li>
        </ul>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-start p-3 h-auto"
          >
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Content
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start p-3 h-auto"
          >
            <FolderKanban className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start p-3 h-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start p-3 h-auto"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Analytics Section
const AnalyticsSection = () => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Total Views</h3>
        <p className="text-3xl font-bold">1,234</p>
        <p className="text-sm text-muted-foreground">+12% from last month</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Avg. Time on Page</h3>
        <p className="text-3xl font-bold">2:45</p>
        <p className="text-sm text-muted-foreground">Minutes per session</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Project Clicks</h3>
        <p className="text-3xl font-bold">342</p>
        <p className="text-sm text-muted-foreground">This month</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Traffic by Period</h3>
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" size="sm">
            Week
          </Button>
          <Button variant="outline" size="sm">
            Month
          </Button>
          <Button variant="outline" size="sm">
            Year
          </Button>
        </div>
        <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Chart visualization will appear here
          </p>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Most Viewed Projects</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>E-commerce Platform</span>
            <span className="font-medium">423 views</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Mobile Banking App</span>
            <span className="font-medium">287 views</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Portfolio Website</span>
            <span className="font-medium">198 views</span>
          </li>
        </ul>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Traffic Sources</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Direct</span>
            <span className="font-medium">45%</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>LinkedIn</span>
            <span className="font-medium">32%</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>GitHub</span>
            <span className="font-medium">18%</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-accent/50 rounded">
            <span>Other</span>
            <span className="font-medium">5%</span>
          </li>
        </ul>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">User Behavior</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Scroll Depth</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-accent/30 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Time on Projects Section</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-accent/30 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: '45%' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Time on Skills Section</span>
              <span>30%</span>
            </div>
            <div className="w-full bg-accent/30 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: '30%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Content Editor Section
const ContentEditorSection = () => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Content Editor</h2>
    <p className="text-muted-foreground mb-6">
      Edit your portfolio content and information here.
    </p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Bio / Description</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="Enter your bio here..."
              defaultValue="Front-end developer with 5+ years of experience building modern web applications with React, TypeScript, and related technologies."
            />
          </div>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Social Links</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              placeholder="https://github.com/username"
              defaultValue="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              defaultValue="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              defaultValue="https://twitter.com/username"
            />
          </div>
        </div>
      </div>

      <Button className="w-full sm:w-auto">Save Changes</Button>
    </div>
  </div>
);

// Projects Management Section
const ProjectsSection = () => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Projects Management</h2>
    <div className="flex justify-between items-center mb-6">
      <p className="text-muted-foreground">
        Manage your portfolio projects here.
      </p>
      <Button>Add New Project</Button>
    </div>

    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">Project Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Last Updated</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-3">E-commerce Platform</td>
              <td className="px-4 py-3">Web Development</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Visible
                </span>
              </td>
              <td className="px-4 py-3">2 days ago</td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Hide
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Mobile Banking App</td>
              <td className="px-4 py-3">Mobile Development</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Visible
                </span>
              </td>
              <td className="px-4 py-3">1 week ago</td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Hide
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Portfolio Website</td>
              <td className="px-4 py-3">Web Development</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Hidden
                </span>
              </td>
              <td className="px-4 py-3">2 weeks ago</td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Show
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Media Upload Section
const MediaUploadSection = () => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Media Upload</h2>
    <p className="text-muted-foreground mb-6">
      Upload and manage media files for your portfolio.
    </p>

    <div className="bg-card p-6 border rounded-lg mb-6 border-dashed border-2 flex flex-col items-center justify-center">
      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-center mb-2">
        Drag and drop files here, or click to select files
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Supported formats: JPG, PNG, GIF, SVG (Max 5MB)
      </p>
      <Button>Select Files</Button>
    </div>

    <div className="bg-card border rounded-lg p-4">
      <h3 className="font-medium mb-4">Recent Uploads</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80"
            alt="Project thumbnail"
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white"
            >
              View
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
            alt="Project thumbnail"
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white"
            >
              View
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&q=80"
            alt="Project thumbnail"
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white"
            >
              View
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80"
            alt="Project thumbnail"
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white"
            >
              View
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder for other sections that might be added later
const PlaceholderSection = ({ title }: { title: string }) => (
  <div className="p-6 bg-card rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-muted-foreground">
      This section is under development. Check back soon for updates.
    </p>
  </div>
);

// Main Dashboard component
export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Navigation items
  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Overview',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: '/admin/dashboard/analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      path: '/admin/dashboard/content',
      label: 'Content Editor',
      icon: <FileEdit className="h-5 w-5" />,
    },
    {
      path: '/admin/dashboard/projects',
      label: 'Projects',
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      path: '/admin/dashboard/media',
      label: 'Media Upload',
      icon: <Upload className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                   lg:translate-x-0 fixed lg:relative z-40 w-64 h-full transition-transform duration-300 
                   bg-card border-r shadow-sm`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-accent rounded-lg">
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors 
                            ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() =>
                    window.innerWidth < 1024 && setSidebarOpen(false)
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {navItems.find((item) => item.path === location.pathname)
                ?.label || 'Dashboard'}
            </h1>
            <div className="mt-2 sm:mt-0">
              <Button variant="outline" size="sm" asChild>
                <Link to="/" target="_blank">
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Dashboard content */}
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/analytics" element={<AnalyticsSection />} />
            <Route path="/content" element={<ContentEditorSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/media" element={<MediaUploadSection />} />
          </Routes>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
