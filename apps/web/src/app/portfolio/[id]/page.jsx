export default function PortfolioItemPage({ params }) {
  const portfolioItems = [
    {
      id: 1,
      title: "Brand Identity Design",
      category: "branding",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      description:
        "Complete brand identity for tech startup including logo, business cards, and style guide",
    },
    {
      id: 2,
      title: "E-commerce Website Design",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description:
        "Modern e-commerce platform design with focus on user experience and conversion",
    },
    {
      id: 3,
      title: "Mobile App UI/UX",
      category: "mobile",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      description:
        "Fitness tracking app with intuitive interface and engaging user experience",
    },
    {
      id: 4,
      title: "Print Campaign Design",
      category: "print",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
      description: "Magazine advertisement series for luxury fashion brand",
    },
    {
      id: 5,
      title: "Logo Design Collection",
      category: "branding",
      image:
        "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&h=400&fit=crop",
      description:
        "Various logo designs for different industries and brand personalities",
    },
    {
      id: 6,
      title: "Social Media Graphics",
      category: "digital",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      description:
        "Engaging social media templates and graphics for brand consistency",
    },
  ];

  const itemId = parseInt(params.id);
  const item = portfolioItems.find((item) => item.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio Item Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The requested portfolio item doesn't exist.
          </p>
          <a
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Portfolio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">
              Praise Sylvester
            </div>
            <a
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8">{item.title}</h1>
          <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 capitalize">
            {item.category}
          </div>
          <p className="text-xl max-w-2xl mx-auto">{item.description}</p>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            More details about this project coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
