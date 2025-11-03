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
import TechnologyPage from "@/pages/technology";
import UseCasesPage from "@/pages/use-cases";
import DocumentationPage from "@/pages/documentation";
import DocsDevelopers from "@/pages/docs/developers";
import DocsOperators from "@/pages/docs/operators";
import DocsProviders from "@/pages/docs/providers";
import DocsUsers from "@/pages/docs/users";
import DocsOverview from "@/pages/docs/overview";
import DocsSecurity from "@/pages/docs/security";
import ContactPage from "@/pages/contact";
import DownloadsPage from "@/pages/downloads";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/technology" component={TechnologyPage} />
      {/* Backwards-compatibility routes */}
      <Route path="/architecture" component={TechnologyPage} />
      <Route path="/features" component={TechnologyPage} />
      <Route path="/use-cases" component={UseCasesPage} />
      <Route path="/documentation" component={DocumentationPage} />
      <Route path="/docs/developers" component={DocsDevelopers} />
      <Route path="/docs/operators" component={DocsOperators} />
      <Route path="/docs/providers" component={DocsProviders} />
      <Route path="/docs/users" component={DocsUsers} />
      <Route path="/docs/overview" component={DocsOverview} />
      <Route path="/docs/security" component={DocsSecurity} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/downloads" component={DownloadsPage} />
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
