'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaClock, FaTag, FaArrowRight } from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { BLOG_POSTS } from '../lib/constants';

/**
 * Blog Page
 * Blog posts grid and categories
 */
export default function BlogPage() {
  // Extended blog posts
  const allBlogPosts = [
    ...BLOG_POSTS,
    {
      id: 4,
      title: 'Understanding MOT Test Failure Rates',
      excerpt: 'Analyzing the most common reasons vehicles fail MOT tests and how to prepare your car for success.',
      category: 'Guides',
      date: '2024-11-15',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000',
      slug: 'understanding-mot-test-failure-rates'
    },
    {
      id: 5,
      title: 'How to Check if a Car Has Outstanding Finance',
      excerpt: 'A comprehensive guide to verifying finance status before purchasing a used vehicle in the UK.',
      category: 'Buying Guides',
      date: '2024-10-22',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000',
      slug: 'check-outstanding-car-finance'
    },
    {
      id: 6,
      title: 'The Impact of Mileage on Vehicle Value',
      excerpt: 'Discover how mileage affects resale value and what buyers should know about acceptable mileage ranges.',
      category: 'Market Trends',
      date: '2024-10-05',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000',
      slug: 'impact-of-mileage-on-vehicle-value'
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(allBlogPosts.map(post => post.category))];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Market Trends': 'info',
      'Maintenance': 'success',
      'EV Insights': 'warning',
      'Guides': 'primary',
      'Buying Guides': 'secondary'
    };
    return colors[category] || 'default';
  };

  // Featured post (first post)
  const featuredPost = allBlogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog &{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Latest news, insights, and guides about vehicle checks, MOT testing,
              and the UK automotive market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card hover className="overflow-hidden cursor-pointer group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="lg">
                      Featured
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant={getCategoryColor(featuredPost.category)}>
                      {featuredPost.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(featuredPost.date)}
                    </span>
                    <Button variant="ghost" size="sm">
                      Read More
                      <FaArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    category === 'All'
                      ? 'bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 hover:shadow-md'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Recent Articles</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col cursor-pointer group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{post.readTime}</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <Button variant="ghost" size="sm" className="self-start">
                      Read Article
                      <FaArrowRight />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
              <div className="text-center py-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Updated
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest vehicle insights,
                  MOT tips, and market updates delivered to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white text-gray-900 border-0 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 border-0"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="mt-4 text-sm opacity-75">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="secondary" size="lg">
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
