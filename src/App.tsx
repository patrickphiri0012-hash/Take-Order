/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Check, 
  Instagram, 
  Facebook, 
  Twitter, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Exit Intent logic
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = localStorage.getItem('hasSeenExitPopup');
        if (!hasSeenPopup) {
          setShowPopup(true);
          localStorage.setItem('hasSeenExitPopup', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    const timer = setTimeout(() => {
      // Show popup after 5 seconds as a fallback
      const hasSeenPopup = localStorage.getItem('hasSeenExitPopup');
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('hasSeenExitPopup', 'true');
      }
    }, 5000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <div className="smooth-scroll relative">
      {/* Sticky Mobile CTA - CRO Requirement */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] pointer-events-none">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 pointer-events-auto"
        >
          Order Now <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* WhatsApp Floating Button - CRO Requirement */}
      <a 
        href="https://wa.me/123456789" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle fill="currentColor" size={28} />
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-[60] bg-warm-white/95 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-display font-black italic text-xl">H</div>
            <span className="font-display font-black text-2xl tracking-tighter text-charcoal">HARVEST <span className="text-primary">&</span> HEAT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Order', 'Location', 'Offers'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-charcoal font-medium hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95">
              Order Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-charcoal" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-warm-white border-b border-charcoal/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Menu', 'About', 'Order', 'Location', 'Offers'].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`} 
                    className="text-xl font-bold text-charcoal"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
                <button className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg">
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/restaurant/1920/1080" 
            alt="Delicious harvest table"
            className="w-full h-full object-cover brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary-foreground font-bold text-sm">🔥 Lunch special ends at 2PM</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              FRESHLY REAPED. <br />
              <span className="text-primary italic">FIERCELY</span> GRILLED.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium">
              Hand-crafted meals using locally sourced seasonal ingredients, delivered hot to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white text-xl px-12 py-5 rounded-full font-black transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1">
                Order Now <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xl px-12 py-5 rounded-full font-black border border-white/30 transition-all flex items-center justify-center gap-2">
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-charcoal text-white py-10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-12 opacity-80">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="font-bold underline">4.9/5 — 2,400+ Trusted Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span className="font-medium inline-block align-middle">Serving Smiles Since 2012</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" />
              <span className="font-medium">Gold Standard Health Badge</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <span className="font-display italic">"Best Local Eats 2024" — Daily News</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Menu */}
      <section id="menu" className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 md:px-8 text-center mb-16">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl font-black mb-4">OUR HARVEST <span className="text-primary">FAVORITES</span></h2>
            <p className="text-charcoal/60 max-w-xl mx-auto text-lg">Taste the difference of farm-to-table freshness. Every item is cooked to order with passion.</p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, name: "The Harvest Feast", price: "$14.99", desc: "A double-decker grilled chicken burger with smashed avocado and spicy slaw.", img: "burgers" },
            { id: 2, name: "Heated Roots Salad", price: "$12.50", desc: "Roasted seasonal root vegetables over massaged kale with a honey-tahini drizzle.", img: "salad" },
            { id: 3, name: "Fire-Kissed Wings", price: "$11.99", desc: "6 jumbo wings tossed in our signature smoky habanero glaze.", img: "wings" },
            { id: 4, name: "The Gold Bowl", price: "$13.50", desc: "Quinoa base with roasted sweet potatoes, black beans, and charred corn.", img: "bowl" },
            { id: 5, name: "Rustic Chicken Soup", price: "$9.99", desc: "Heirloom carrots and organic chicken in a 24-hour slow-cooked bone broth.", img: "soup" },
            { id: 6, name: "Sweet Heat Tacos", price: "$10.50", desc: "Three tacos with pulled smoked pork, pineapple salsa, and lime crema.", img: "tacos" }
          ].map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-charcoal/5 group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${item.id + 10}/600/400`} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-primary text-white font-black px-4 py-1 rounded-full shadow-lg">
                  {item.price}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-2">{item.name}</h3>
                <p className="text-charcoal/60 mb-6 line-clamp-2">{item.desc}</p>
                <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1]">A STORY BORN IN <span className="text-primary italic">THE KITCHEN</span></h2>
            <div className="space-y-6 text-lg text-white/70">
              <p>
                Founded by Chef Marcus Thorne, Harvest & Heat began as a simple farm stand with a single grill. Our mission has always been clear: to prove that "fast" doesn't have to mean "processed".
              </p>
              <p>
                We partner with 12 local farms to bring you ingredients that were in the soil less than 24 hours before they reach your plate. No freezers, no shortcuts—just real fire and real food.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: <Clock className="text-primary" />, title: "Fresh", desc: "Reaped Daily" },
                { icon: <Send className="text-primary" />, title: "Fast", desc: "Under 15 Mins" },
                { icon: <MessageCircle className="text-primary" />, title: "Friendly", desc: "Real Humans" }
              ].map((prop, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                  <div className="mb-3 flex justify-center">{prop.icon}</div>
                  <div className="font-bold text-white mb-1">{prop.title}</div>
                  <div className="text-sm text-white/40">{prop.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/5]">
              <img 
                src="https://picsum.photos/seed/chef/800/1000" 
                alt="Chef Marcus Thorne" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 z-20 bg-primary p-8 rounded-3xl shadow-2xl max-w-[280px]">
              <p className="font-display italic text-2xl text-white mb-4">"Food is the most primitive form of comfort."</p>
              <div className="font-bold text-white uppercase tracking-widest text-sm">— Marcus Thorne, Founder</div>
            </div>
            {/* Design element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 underline decoration-primary">HEAR FROM THE <span className="italic">FLOCK</span></h2>
              <p className="text-charcoal/60 text-lg">Join thousands of satisfied locals who have made us their go-to spot.</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-2xl shadow-sm border border-charcoal/5">
              <div className="w-10 h-10 bg-[#4285F4] rounded-lg flex items-center justify-center text-white font-bold">G</div>
              <div>
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <div className="text-xs font-bold text-charcoal/40 uppercase tracking-tighter">Google Reviews 4.9 Stars</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Local Guide", quote: "Best fried chicken sandwich in the city. The smoky slaw is life-changing. I order here at least twice a week!" },
              { name: "David Chen", role: "Food Blogger", quote: "The commitment to freshness is evident in every bite. Those fire-kissed wings are perfectly balanced - sweet and dangerous." },
              { name: "Elena Rodriguez", role: "Repeat Customer", quote: "Harvest & Heat has spoiled other restaurants for me. The service is fast, friendly, and the quality is incredibly consistent." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-charcoal/5 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-primary/10">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt={review.name} referrerPolicy="no-referrer" />
                </div>
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-charcoal/80 text-lg mb-8 italic">"{review.quote}"</p>
                <div>
                  <div className="font-black text-xl">{review.name}</div>
                  <div className="text-primary font-bold text-sm uppercase tracking-widest">{review.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers & Email Capture */}
      <section id="offers" className="container mx-auto px-4 md:px-8 mb-24">
        <div className="bg-primary rounded-[4rem] px-8 py-20 text-center relative overflow-hidden">
          {/* Abstract circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">JOIN THE TABLE. <br /> GET <span className="text-charcoal">20% OFF</span>.</h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto font-medium">Subscribe to our newsletter for exclusive offers, secret menu items, and a sweet discount on your first order.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white px-8 py-5 rounded-full text-charcoal font-bold focus:outline-none focus:ring-4 focus:ring-black/20 text-lg" 
              />
              <button className="bg-charcoal text-white hover:bg-black px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl">
                Get My Coupon
              </button>
            </form>
            <p className="mt-4 text-white/60 text-sm font-bold flex items-center justify-center gap-2">
              <Clock size={14} /> Today only: Join 15,000+ happy diners
            </p>
            
            {isSubscribed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-white font-bold bg-green-500/20 backdrop-blur-md inline-block px-6 py-2 rounded-lg"
              >
                Welcome to the family! Check your inbox.
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section id="location" className="py-24 bg-white border-t border-charcoal/5">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-12">VISIT THE <span className="text-primary italic">STOKE</span></h2>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2">Our Flagship Store</h3>
                  <p className="text-charcoal/60 text-lg">123 Harvest Lane, Market District<br />Downtown, Springfield 54321</p>
                  <button className="mt-4 text-primary font-bold flex items-center gap-2 hover:underline border-b-2 border-primary/20 pb-1">
                    Get Directions <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Clock size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-6">Opening Hours</h3>
                  <div className="grid grid-cols-2 max-w-sm">
                    {[
                      { day: "Mon - Thu", time: "11:00 - 22:00" },
                      { day: "Fri - Sat", time: "11:00 - 23:00" },
                      { day: "Sunday", time: "12:00 - 21:00" }
                    ].map((row, i) => (
                      <div key={i} className="contents">
                        <div className="py-3 border-b border-charcoal/5 font-bold">{row.day}</div>
                        <div className="py-3 border-b border-charcoal/5 text-right font-medium text-charcoal/60">{row.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2">Call Us</h3>
                  <p className="text-charcoal/60 text-lg">+1 (555) 000-HEIRLOOM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[600px] rounded-[3rem] overflow-hidden bg-charcoal/5 relative border-8 border-warm-white shadow-2xl">
            {/* Google Map Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280821873!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1715012345678!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-warm-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-display font-black italic text-xl">H</div>
                <span className="font-display font-black text-2xl tracking-tighter">HARVEST <span className="text-primary">&</span> HEAT</span>
              </div>
              <p className="text-white/40 mb-8 max-w-xs">
                Fulfilling your hunger with freshly reaped ingredients and fierce flavors. The future of fast food is local.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all hover:text-white">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">Discover</h4>
              <ul className="space-y-4 font-medium opacity-60">
                <li><a href="#menu" className="hover:text-primary transition-colors">Featured Menu</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Our Farms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">Join Us</h4>
              <ul className="space-y-4 font-medium opacity-60">
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partner Farms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Franchising</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">Legal</h4>
              <ul className="space-y-4 font-medium opacity-60">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30 font-bold uppercase tracking-widest">
            <p>&copy; 2024 HARVEST & HEAT. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span>DESIGNED BY CORTEX</span>
              <span>EST. 2012</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-lg"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] overflow-hidden max-w-2xl w-full flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 z-20 text-charcoal/40 hover:text-charcoal transition-colors bg-warm-white p-2 rounded-full shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src="https://picsum.photos/seed/promo/600/800" 
                  alt="Delicious reward" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-none">WAIT! THE GRILL IS <span className="text-primary italic text-3xl">STILL HOT</span>.</h2>
                <p className="text-charcoal/60 font-bold mb-8">Before you leave, grab a 10% discount coupon for your first visit!</p>
                
                <form onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }} className="space-y-4">
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    className="w-full bg-warm-white px-6 py-4 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    Send My Coupon
                  </button>
                </form>
                <p className="mt-6 text-xs text-charcoal/30 font-bold uppercase tracking-widest text-center">No spam. Only delicious updates.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
