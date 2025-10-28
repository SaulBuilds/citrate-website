import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import Dashboard from "@/pages/dashboard";
import BlockDAGVisualization from "@/pages/blockdag-viz";
import FeaturesPage from "@/pages/features";
import ArchitecturePage from "@/pages/architecture";
import UseCasesPage from "@/pages/use-cases";
import RoadmapPage from "@/pages/roadmap";
import DocumentationPage from "@/pages/documentation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/architecture" component={ArchitecturePage} />
      <Route path="/use-cases" component={UseCasesPage} />
      <Route path="/roadmap" component={RoadmapPage} />
      <Route path="/documentation" component={DocumentationPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blockdag" component={BlockDAGVisualization} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
