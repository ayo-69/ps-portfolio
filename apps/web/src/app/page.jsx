import { useState } from "react";
import {
  Mail,
  Phone,
  Download,
  ExternalLink,
  Award,
  Users,
  Clock,
} from "lucide-react";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("https://praise-email-service.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Response status:", response.status);
      const responseBody = await response.text();
      console.log("Response body:", responseBody);

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", budget: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const categories = [
    { id: "all", name: "All Work" },
    { id: "branding", name: "Branding" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "print", name: "Print Design" },
    { id: "digital", name: "Digital" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Exceptional design work that perfectly captured our brand vision. The attention to detail and creativity exceeded our expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Retail Plus",
      text: "Professional, timely, and incredibly talented. Our new website design has increased conversions by 40%.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      company: "Creative Agency",
      text: "Outstanding collaboration and communication throughout the project. Delivered exactly what we needed and more.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">
              Praise Sylvester
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#portfolio"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
            </nav>
            <a
              href="#contact"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Creative Designer Who Brings Ideas to Life
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                I create stunning visual experiences that help brands stand out
                and connect with their audience. From logos to websites, I
                deliver designs that drive results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center"
                >
                  <Mail size={20} />
                  Get In Touch
                </a>
                <a
                  href="/api/resume/download"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://i.postimg.cc/ZnT9GD8h/1692268535087-3.jpg"
                alt="Praise Sylvester - Graphics Designer"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="text-yellow-500" size={24} />
                  <div>
                    <div className="font-semibold text-gray-900">5+ Years</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">150+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">24h</div>
              <div className="text-gray-600">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A selection of my best projects that showcase creativity,
              technical skill, and results-driven design
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <a
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group block"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={24}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive design solutions to help your business grow and
              succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Brand Identity
              </h3>
              <p className="text-gray-600 mb-4">
                Complete brand identity packages including logos, color schemes,
                typography, and brand guidelines.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <ExternalLink className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Web Design
              </h3>
              <p className="text-gray-600 mb-4">
                Modern, responsive websites that convert visitors into customers
                with stunning visual design.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                UI/UX Design
              </h3>
              <p className="text-gray-600 mb-4">
                User-centered design for mobile apps and web applications that
                prioritize usability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take my word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="text-yellow-400">
                      ★
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to bring your vision to life? I'm here to help you create
                something amazing.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={20} />
                  <span>praise.sylvester.design@email.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-gray-400" size={20} />
                  <span>+234-7073-739-757</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-gray-400" size={20} />
                  <span>Available</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="your@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Budget
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Your project budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Tell me about your project..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "success" && (
                  <p className="text-green-400 text-center">
                    Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white font-bold text-xl mb-4 md:mb-0">
              Praise Sylvester
            </div>
            <div className="text-sm">
              © 2025 Praise Sylvester Design. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}