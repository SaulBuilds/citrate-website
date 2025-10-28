import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="text-blog-title">
            Blog & <span className="text-primary">News</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-16">
            Latest updates from the Citrate ecosystem
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-2 border-border rounded-lg p-6">
                <div className="h-6 bg-muted/30 rounded mb-4 animate-pulse" />
                <div className="h-4 bg-muted/20 rounded w-3/4 mb-3 animate-pulse" />
                <div className="h-4 bg-muted/20 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = posts?.find(p => p.featured === 1);
  const regularPosts = posts?.filter(p => p.featured !== 1) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="text-blog-title">
          Blog & <span className="text-primary">News</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-16">
          Latest updates from the Citrate ecosystem
        </p>

        {featuredPost && (
          <div className="mb-16" data-testid="featured-post">
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="border-2 border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-card text-card-foreground border border-border text-sm rounded">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>By {featuredPost.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {regularPosts.length === 0 && !featuredPost && (
          <div className="text-center py-16" data-testid="no-posts">
            <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div 
                  className="border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  data-testid={`blog-post-${post.slug}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-card text-card-foreground border border-border text-xs rounded">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2" data-testid={`button-read-${post.slug}`}>
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border flex-wrap">
                      <Tag className="w-3 h-3 text-muted-foreground" />
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
