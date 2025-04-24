import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // ✅ must point to the file with @tailwind directives

// Sample data (unchanged)
const PRODUCTS = [
  {
    id: 1,
    name: "Iphone 16 Pro",
    category: "Smartphones",
    description: "The latest flagship smartphone with cutting-edge features",
    fullDescription: "The Iphone 16 Pro 16 sets a new standard for smartphones with its revolutionary camera system, blazing-fast processor, and all-day battery life. Experience unprecedented performance in a sleek, premium design.",
    specs: {
      "Display": "6.7-inch OLED (2778 x 1284)",
      "Processor": "A16 Bionic",
      "RAM": "8GB",
      "Storage": "128GB / 256GB / 512GB",
      "Battery": "4,500 mAh",
      "Camera": "48MP main, 12MP ultrawide, 12MP telephoto",
      "OS": "ProOS 17"
    },
    rating: 4.7,
    reviewCount: 128,
    image: "img/iphone16pro.jpg"
  },
  {
    id: 2,
    name: "Macbook Pro",
    category: "Laptops",
    description: "Premium ultrabook with exceptional performance and battery life",
    fullDescription: "The Macbook Pro combines incredible power with remarkable portability. Featuring the latest processors, a stunning Retina display, and up to 20 hours of battery life, it's the perfect companion for professionals on the go.",
    specs: {
      "Display": "14-inch Retina (3024 x 1964)",
      "Processor": "Intel Core i7-12700H",
      "RAM": "16GB / 32GB",
      "Storage": "512GB / 1TB SSD",
      "Graphics": "Intel Iris Xe Graphics",
      "Battery": "Up to 20 hours",
      "Weight": "1.4 kg"
    },
    rating: 4.5,
    reviewCount: 89,
    image: "img/macbookpro.jpeg"
  },
  {
    id: 3,
    name: "Airpods",
    category: "Audio",
    description: "Wireless earbuds with active noise cancellation and premium sound",
    fullDescription: "Experience immersive audio with the Airpods. Featuring advanced noise cancellation, crystal-clear sound quality, and a comfortable fit, these earbuds are perfect for music lovers and professionals alike.",
    specs: {
      "Driver": "11mm dynamic driver",
      "Noise Cancellation": "Active, up to 35dB",
      "Battery Life": "8 hours (30 with case)",
      "Connectivity": "Bluetooth 5.2",
      "Water Resistance": "IPX7",
      "Charging": "USB-C and wireless"
    },
    rating: 4.8,
    reviewCount: 56,
    image: "./img/airpods.jpeg"
  },
  {
    id: 4,
    name: "Apple Watch",
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring and smart features",
    fullDescription: "The Apple Watch is your ultimate health and fitness companion. With advanced health monitoring, GPS tracking, and seamless integration with your smartphone, it keeps you connected and informed throughout your day.",
    specs: {
      "Display": "1.4-inch AMOLED",
      "Battery": "Up to 7 days",
      "Sensors": "Heart rate, SpO2, Temperature",
      "Water Resistance": "5ATM",
      "GPS": "Built-in GPS, GLONASS",
      "Connectivity": "Bluetooth 5.0, Wi-Fi"
    },
    rating: 4.6,
    reviewCount: 73,
    image: "./img/applewatch.png"
  },
  {
    id: 5,
    name: "Amazon Echo",
    category: "Smart Home",
    description: "Intelligent speaker with voice assistant and smart home controls",
    fullDescription: "Transform your home with the Amazon Echo. With its powerful assistant, superior sound quality, and ability to control all your smart home devices, it's the central hub your connected home needs.",
    specs: {
      "Sound": "360° audio with 3 speakers",
      "Microphones": "6-mic array with far-field detection",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1",
      "Compatibility": "Works with over 10,000 smart home devices",
      "Voice Control": "Advanced natural language processing"
    },
    rating: 4.3,
    reviewCount: 42,
    image: "./img/alexa.webp"
  },
  {
    id: 6,
    name: "Playstation 5",
    category: "Gaming",
    description: "Next-gen gaming console with incredible graphics and performance",
    fullDescription: "Experience gaming like never before with the Playstation 5. Featuring ray-tracing technology, lightning-fast load times, and an extensive game library, it delivers truly immersive gaming experiences that push the boundaries of what's possible.",
    specs: {
      "CPU": "8-core 3.5GHz Custom Zen 2",
      "GPU": "10.28 TFLOPS, 36 CUs at 2.23GHz",
      "RAM": "16GB GDDR6",
      "Storage": "825GB SSD",
      "Resolution": "Up to 8K",
      "Frame Rate": "Up to 120fps"
    },
    rating: 4.9,
    reviewCount: 112,
    image: "./img/playstation.jpg"
  }
];

const INITIAL_COMMENTS = {
  1: [
    {
      author: "John Smith",
      date: "April 15, 2025",
      rating: 5,
      text: "This is the best smartphone I've ever owned! The camera quality is incredible, and the battery lasts all day."
    },
    {
      author: "Sarah Johnson",
      date: "April 10, 2025",
      rating: 4,
      text: "Great phone overall, but I think it's a bit expensive for what you get. Still, the performance is top-notch."
    }
  ],
  2: [
    {
      author: "Michael Brown",
      date: "April 12, 2025",
      rating: 5,
      text: "This laptop is a game-changer for my work. Fast, lightweight, and the battery life is amazing."
    }
  ],
  3: [
    {
      author: "Emily Davis",
      date: "April 18, 2025",
      rating: 5,
      text: "The noise cancellation is incredible! I use these earbuds on my daily commute and they block out all the subway noise."
    },
    {
      author: "David Wilson",
      date: "April 5, 2025",
      rating: 4,
      text: "Sound quality is excellent, but I wish the case was a bit smaller. Overall very satisfied with my purchase."
    }
  ]
};

export default function TechRater() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getProductById = (id) => PRODUCTS.find(product => product.id === id);
  const handleProductSelect = (id) => {
    setSelectedProduct(getProductById(id));
    navigateTo('product-detail');
  };
  const handleLogout = () => {
    setCurrentUser(null);
    alert('You have been logged out.');
  };

  const getFeaturedProducts = () => {
    const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <div className="app bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Header */}
      <Header 
        currentUser={currentUser}
        setLoginModalOpen={setLoginModalOpen}
        setSignupModalOpen={setSignupModalOpen}
        navigateTo={navigateTo}
        handleLogout={handleLogout}
      />

      {/* Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage 
            navigateTo={navigateTo} 
            featuredProducts={getFeaturedProducts()}
            onProductSelect={handleProductSelect}
          />
        )}
        {currentPage === 'products' && (
          <ProductsPage 
            products={PRODUCTS}
            onProductSelect={handleProductSelect}
          />
        )}
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            navigateTo={navigateTo}
            comments={comments[selectedProduct.id] || []}
            currentUser={currentUser}
            setComments={setComments}
            setLoginModalOpen={setLoginModalOpen}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />

      {/* Modals */}
      <AnimatePresence>
        {loginModalOpen && (
          <LoginModal 
            setLoginModalOpen={setLoginModalOpen}
            setSignupModalOpen={setSignupModalOpen}
            setCurrentUser={setCurrentUser}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {signupModalOpen && (
          <SignupModal 
            setSignupModalOpen={setSignupModalOpen}
            setLoginModalOpen={setLoginModalOpen}
            setCurrentUser={setCurrentUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Header Component (Enhanced Styling)
function Header({ currentUser, setLoginModalOpen, setSignupModalOpen, navigateTo, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-gradient-to-r from-gray-900 to-black text-white py-4 sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('home'); }} 
          className="text-2xl font-bold flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-orange-500">Tech</span>
          <span className="text-white">Rater</span>
        </motion.a>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <motion.a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                className="text-white hover:text-orange-500 transition duration-300 relative group"
                whileHover={{ scale: 1.05 }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo('products'); }}
                className="text-white hover:text-orange-500 transition duration-300 relative group"
                whileHover={{ scale: 1.05 }}
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            </li>
            <li>
              <motion.a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                className="text-white hover:text-orange-500 transition duration-300 relative group"
                whileHover={{ scale: 1.05 }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:hidden mt-4"
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('home'); setIsMenuOpen(false); }}
                  className="block text-white hover:text-orange-500 transition duration-300 py-2"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('products'); setIsMenuOpen(false); }}
                  className="block text-white hover:text-orange-500 transition duration-300 py-2"
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('contact'); setIsMenuOpen(false); }}
                  className="block text-white hover:text-orange-500 transition duration-300 py-2"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              <motion.span 
                className="text-white hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Welcome, {currentUser.name}
              </motion.span>
              <motion.button 
                onClick={handleLogout}
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button 
                onClick={() => setLoginModalOpen(true)}
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button 
                onClick={() => setSignupModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

// HomePage Component (Enhanced Styling and Animations)
function HomePage({ navigateTo, featuredProducts, onProductSelect }) {
  return (
    <div className="page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent animate-pulse"></div>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Discover & Rate <span className="text-orange-500">Tech</span> Products
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Your trusted source for honest tech reviews and ratings. Join our community and share your experiences with the latest tech products.
          </p>
          <motion.button 
            onClick={() => navigateTo('products')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Products
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Check out our top-rated tech products based on community reviews
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  onProductSelect={onProductSelect} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose TechRater?</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              We provide unbiased reviews from real users to help you make informed decisions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-orange-500 text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Honest Reviews</h3>
                <p className="text-gray-600">
                  Read genuine reviews from real users who have actually used the products.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-orange-500 text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Detailed Comparisons</h3>
                <p className="text-gray-600">
                  Compare products side-by-side with our comprehensive comparison tools.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-orange-500 text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-600">
                  Join our community and share your own experiences with tech products.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ProductsPage Component (Enhanced Styling and Animations)
function ProductsPage({ products, onProductSelect }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-8">Browse our collection of top-rated tech products</p>
        
        {/* Category Filter (Optional) */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(products.map(p => p.category))).map(category => (
              <motion.button
                key={category}
                className="bg-white border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-orange-100 hover:text-orange-700 hover:border-orange-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard 
                product={product} 
                onProductSelect={onProductSelect} 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Product Card Component (Enhanced Styling and Animations)
function ProductCard({ product, onProductSelect }) {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center mb-4">
            <div className="text-orange-500 text-lg">
              {getStarRating(product.rating)}
            </div>
            <div className="text-gray-500 text-sm ml-2">
              ({product.reviewCount} reviews)
            </div>
          </div>
          <motion.button 
            onClick={() => onProductSelect(product.id)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Generate Star Rating Display
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  let stars = '';
  for (let i = 0; i < fullStars; i++) stars += '★';
  if (halfStar) stars += '½';
  for (let i = 0; i < emptyStars; i++) stars += '☆';
  return stars;
}

// Product Detail Page Component (Enhanced Styling and Animations)
function ProductDetailPage({ product, navigateTo, comments, currentUser, setComments, setLoginModalOpen }) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      alert('Please select a rating');
      return;
    }
    if (reviewText.trim() === '') {
      alert('Please write a review');
      return;
    }
    const newComment = {
      author: currentUser.name,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: reviewRating,
      text: reviewText
    };
    setComments(prevComments => {
      const updatedComments = {...prevComments};
      if (!updatedComments[product.id]) updatedComments[product.id] = [];
      updatedComments[product.id] = [newComment, ...updatedComments[product.id]];
      return updatedComments;
    });
    setReviewRating(0);
    setReviewText('');
    setHoverRating(0);
    alert('Your review has been submitted!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.a 
        href="#" 
        onClick={(e) => { e.preventDefault(); navigateTo('products'); }}
        className="inline-flex items-center text-orange-500 font-semibold mb-6 hover:underline"
        whileHover={{ x: -5 }}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </motion.a>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full mb-2">
                {product.category}
              </div>
              <div className="flex items-center">
                <div className="text-orange-500 text-xl">{getStarRating(product.rating)}</div>
                <div className="text-gray-500 ml-2">({product.reviewCount} reviews)</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg shadow-md transition duration-500 hover:scale-105"
              />
            </div>
            <div>
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Specifications
                  </button>
                </nav>
              </div>
              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4">Product Description</h2>
                    <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
                  </motion.div>
                )}
                {activeTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                    <ul className="space-y-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <li key={key} className="flex border-b border-gray-100 pb-2">
                          <span className="font-semibold w-40 text-gray-600">{key}:</span>
                          <span className="text-gray-800 flex-grow">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              {currentUser ? (
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Your Rating</label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${hoverRating >= star || reviewRating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setReviewRating(star)}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Your Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      rows="4"
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </div>
                  <motion.button 
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Review
                  </motion.button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please log in to write a review.</p>
                  <motion.button 
                    onClick={() => setLoginModalOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                </div>
              )}
            </div>
            {/* Existing Reviews */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      <div className="text-orange-500 text-lg">{getStarRating(comment.rating)}</div>
                      <div className="text-gray-500 text-sm ml-2">by {comment.author} on {comment.date}</div>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">😕</div>
                  <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to write a review!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Footer Component
function Footer({ navigateTo }) {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-orange-500 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('products'); }} className="hover:text-orange-500 transition duration-300">
                  Products
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="hover:text-orange-500 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0120 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © 2025 TechRater. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Login Modal Component
function LoginModal({ setLoginModalOpen, setSignupModalOpen, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      setCurrentUser({ name: email.split('@')[0] });
      setLoginModalOpen(false);
      alert('Logged in successfully!');
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <button 
          onClick={() => setLoginModalOpen(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <motion.button 
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <button 
            onClick={() => {
              setLoginModalOpen(false);
              setSignupModalOpen(true);
            }}
            className="text-orange-500 hover:underline transition"
          >
            Sign Up here
          </button>
        </p>
      </motion.div>
    </div>
  );
}

// Signup Modal Component
function SignupModal({ setSignupModalOpen, setLoginModalOpen, setCurrentUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setCurrentUser({ name });
    setSignupModalOpen(false);
    alert('Account created successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <button 
          onClick={() => setSignupModalOpen(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>
          <motion.button 
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => {
              setSignupModalOpen(false);
              setLoginModalOpen(true);
            }}
            className="text-orange-500 hover:underline transition"
          >
            Login here
          </button>
        </p>
      </motion.div>
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">Have questions or feedback? We'd love to hear from you!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                ></textarea>
              </div>
              <motion.button 
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">Feel free to reach out to us through any of the following methods:</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">support@techrater.com</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-gray-600">123 Tech Avenue, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}