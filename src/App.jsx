import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const categories = [
  {
    title: 'Unstitched',
    eyebrow: 'The edit',
    filter: 'Unstitched',
    image: '/images/asset-19.jpg',
  },
  {
    title: 'Ready to wear',
    eyebrow: 'Effortless days',
    filter: 'Ready to wear',
    image: '/images/asset-09.jpg',
  },
  {
    title: 'Festive',
    eyebrow: 'Made to celebrate',
    filter: 'Festive',
    image: '/images/asset-22.jpg',
  },
]

const products = [
  { id: 1, name: 'Sunehri Print', category: 'Unstitched', price: 'PKR 5,490', oldPrice: '', badge: 'New in', image: '/images/asset-18.jpg', description: 'A soft printed lawn set with a fluid drape and a sun-washed palette for easy summer dressing.' },
  { id: 2, name: 'Mehr Embroidered Shirt', category: 'Embroidered', price: 'PKR 8,990', oldPrice: 'PKR 10,490', badge: 'Bestseller', image: '/images/asset-13.jpg', description: 'A finely embroidered shirt designed to carry you from late afternoons to dressed-up evenings.' },
  { id: 3, name: 'Rang-e-Bahar Set', category: 'Ready to wear', price: 'PKR 12,490', oldPrice: '', badge: 'Limited', image: '/images/asset-11.jpg', description: 'An effortless co-ord in a painterly floral print, finished with a relaxed, modern silhouette.' },
  { id: 4, name: 'Maya Lawn Co-ord', category: 'Lawn', price: 'PKR 6,990', oldPrice: '', badge: '', image: '/images/asset-12.jpg', description: 'Lightweight lawn separates with a clean cut and a soft hand feel for everyday movement.' },
  { id: 5, name: 'Gulabo Silk Kurta', category: 'Festive', price: 'PKR 14,990', oldPrice: '', badge: 'New in', image: '/images/asset-03.jpg', description: 'A jewel-toned silk kurta with an easy fit and a subtle sheen that catches the light.' },
  { id: 6, name: 'Aab-e-Rawan Dupatta', category: 'Unstitched', price: 'PKR 3,490', oldPrice: '', badge: '', image: '/images/asset-21.jpg', description: 'A versatile printed dupatta to finish a look with colour, movement and a little poetry.' },
  { id: 7, name: 'Dastaan 3-Piece Set', category: 'Unstitched', price: 'PKR 9,490', oldPrice: '', badge: 'New in', image: '/images/asset-17.jpg', description: 'A considered three-piece story of soft cotton, delicate print and easy tailoring.' },
  { id: 8, name: 'Noor Chikankari Kurta', category: 'Ready to wear', price: 'PKR 10,990', oldPrice: '', badge: 'Bestseller', image: '/images/asset-20.jpg', description: 'A timeless kurta with an airy feel, delicate texture and a silhouette made for repeat wear.' },
  { id: 9, name: 'Mausam Silk Scarf', category: 'Accessories', price: 'PKR 2,990', oldPrice: '', badge: '', image: '/images/asset-15.jpg', description: 'A soft silk scarf that brings a considered finishing note to your everyday wardrobe.' },
  { id: 10, name: 'Raat Ki Rani Dress', category: 'Festive', price: 'PKR 16,490', oldPrice: '', badge: 'Limited', image: '/images/asset-10.jpg', description: 'An elegant evening dress with a gentle fall, rich colour and room to make it your own.' },
  { id: 11, name: 'Rang Silk Belt', category: 'Accessories', price: 'PKR 2,490', oldPrice: '', badge: 'New in', image: '/images/asset-16.jpg', description: 'A polished finishing piece that brings shape and colour to a relaxed look.' },
  { id: 12, name: 'Noor Beaded Clutch', category: 'Accessories', price: 'PKR 4,990', oldPrice: '', badge: 'Limited', image: '/images/asset-14.jpg', description: 'A small evening clutch with a soft structure and just enough shimmer for after-hours.' },
  { id: 13, name: 'Ayla Everyday Tunic', category: 'Ready to wear', price: 'PKR 9,490', oldPrice: '', badge: '', image: '/images/asset-06.jpg', description: 'An easy tunic with a clean neckline and the kind of fit you reach for again and again.' },
  { id: 14, name: 'Noor Velvet Set', category: 'Festive', price: 'PKR 18,990', oldPrice: '', badge: 'New in', image: '/images/asset-20.jpg', description: 'A rich festive set with a soft velvet touch and a graceful, easy-to-style cut.' },
]

const filters = ['All', 'New in', 'Unstitched', 'Ready to wear', 'Festive', 'Accessories']
const fallbackProductImage = '/images/asset-06.jpg'

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l1 11h-15l1-11Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.8-3.5 2.9-5.3 6.5-5.3s5.7 1.8 6.5 5.3" /></svg>
}

function HeartIcon({ filled = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'heart-filled' : ''}><path d="M20.8 8.6c0 5.2-8.8 10.1-8.8 10.1S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.3Z" /></svg>
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function ThemeIcon({ theme }) {
  return theme === 'dark' ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.4A8 8 0 0 1 8.6 4a8.1 8.1 0 1 0 11.4 11.4Z" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" /></svg>
}

function parseRoute() {
  const route = window.location.hash.replace(/^#/, '') || 'home'
  const [page, id] = route.split('/')
  return { page, id: id ? Number(id) : null }
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Header({ route, navigate, cartCount, menuOpen, setMenuOpen, theme, setTheme, setSearchOpen, setCartOpen, setAccountOpen }) {
  const navItems = [
    ['Shop', 'shop'],
    ['Collections', 'collections'],
    ['Our story', 'about'],
  ]

  return <>
    <div className="announcement"><span>Complimentary delivery on orders above PKR 5,000</span><button type="button" onClick={() => navigate('shop')}>Shop new arrivals <ArrowIcon /></button></div>
    <header className="site-header">
      <button className="mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map(([label, page]) => <a className={route.page === page ? 'active' : ''} href={`#${page}`} key={page} onClick={(event) => { event.preventDefault(); navigate(page); setMenuOpen(false) }}>{label}</a>)}
      </nav>
      <a className="brand-mark" href="#home" aria-label="BAAR home" onClick={(event) => { event.preventDefault(); navigate('home') }}><span className="brand-monogram">BR</span><span className="brand-name">BAAR</span></a>
      <div className="header-actions">
        <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)}><SearchIcon /></button>
        <button type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><ThemeIcon theme={theme} /></button>
        <button type="button" className="account-button" aria-label="Open account" onClick={() => setAccountOpen(true)}><UserIcon /></button>
        <button type="button" className="bag-button" aria-label="Shopping bag" onClick={() => setCartOpen(true)}><BagIcon />{cartCount > 0 && <span>{cartCount}</span>}</button>
      </div>
    </header>
  </>
}

function ProductCard({ product, navigate, favorites, toggleFavorite, addToCart }) {
  const openProduct = () => navigate(`product/${product.id}`)
  return <article className="product-card reveal" role="link" tabIndex="0" onClick={openProduct} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openProduct() }}>
    <div className="product-image-wrap">
      <img src={product.image} alt={product.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackProductImage }} />
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className="favorite-button" type="button" aria-label={`Save ${product.name}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id) }}><HeartIcon filled={favorites.includes(product.id)} /></button>
      <button className="quick-add" type="button" onClick={(event) => { event.stopPropagation(); addToCart(product) }}>Quick add <span>+</span></button>
    </div>
    <div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="price"><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div></div>
  </article>
}

function ProductGrid({ items, ...props }) {
  return <div className="product-grid">{items.length > 0 ? items.map((product) => <ProductCard product={product} key={product.id} {...props} />) : <div className="no-results"><span>✳</span><h3>No pieces found</h3><p>Try another search or explore the full edit.</p></div>}</div>
}

function HomePage({ navigate, setFilter, videoRef, videoPlaying, toggleVideo, ...productProps }) {
  return <main id="top">
    <section className="hero-section">
      <div className="hero-copy"><div className="hero-kicker"><span className="status-dot" /> Chapter 01 / Summer 2025</div><h1>Wear your<br /><em>story.</em></h1><p className="hero-description">Thoughtful clothes for the days that become memories. Discover modern silhouettes, rich craft and the ease of dressing well.</p><button className="outline-button" type="button" onClick={() => navigate('shop')}>Explore the collection <ArrowIcon /></button><div className="hero-scroll-note"><span>Scroll to discover</span><i>↓</i></div></div>
      <div className="hero-image-wrap"><video ref={videoRef} autoPlay muted loop playsInline poster="/images/asset-05.jpg" aria-label="Fashion film showing the BAAR collection"><source src="https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_25fps.mp4" type="video/mp4" /><img src="/images/asset-05.jpg" alt="Woman wearing a refined neutral fashion look" /></video><span className="video-shade" /><div className="hero-stamp"><span>Made in</span><strong>Pakistan</strong><i>✳</i></div><div className="video-control"><span><i className="status-dot" /> Now playing / BAAR film</span><button type="button" onClick={toggleVideo}>{videoPlaying ? 'Pause' : 'Play'} <span>{videoPlaying ? 'Ⅱ' : '▶'}</span></button></div></div>
      <div className="hero-side-note">A new expression of<br />everyday tradition <span>↘</span></div>
    </section>
    <section className="marquee-band" aria-label="Brand values"><div className="marquee-track"><span>DESIGNED WITH INTENTION</span><i>✳</i><span>MADE FOR EVERYDAY RITUALS</span><i>✳</i><span>DESIGNED WITH INTENTION</span><i>✳</i><span>MADE FOR EVERYDAY RITUALS</span></div></section>
    <Reveal className="category-section content-width"><div className="section-heading split-heading"><div><p className="eyebrow">Find your feeling</p><h2>Shop by mood</h2></div><p>Three ways to make the everyday<br />feel a little more considered.</p></div><div className="category-grid">{categories.map((category, index) => <button className={`category-card category-card-${index + 1}`} type="button" key={category.title} onClick={() => { setFilter(category.filter); navigate('shop') }}><img src={category.image} alt={category.title} /><span className="category-overlay" /><span className="category-copy"><small>{category.eyebrow}</small><strong>{category.title}</strong><em>Explore <ArrowIcon /></em></span></button>)}</div></Reveal>
    <Reveal className="shop-section content-width"><div className="section-heading shop-heading"><div><p className="eyebrow">A considered edit</p><h2>New arrivals</h2></div><button className="text-button" type="button" onClick={() => navigate('shop')}>View all <ArrowIcon /></button></div><div className="filter-row compact-filters">{filters.slice(0, 5).map((filter) => <button type="button" key={filter} onClick={() => { setFilter(filter); navigate('shop') }}>{filter}</button>)}</div><ProductGrid items={products.slice(0, 6)} {...productProps} /></Reveal>
    <Reveal className="editorial-section" id="story"><div className="editorial-image"><img src="/images/asset-07.jpg" alt="A woman in a flowing rust colored outfit" /></div><div className="editorial-copy"><p className="eyebrow">The BAAR way</p><h2>Rooted in<br /><em>expression.</em></h2><p>We believe what you wear should feel like you—familiar, but never ordinary. BAAR brings a fresh point of view to the clothes we grew up loving.</p><button type="button" className="text-button" onClick={() => navigate('about')}>Read our story <ArrowIcon /></button><div className="editorial-number">02 <span>/</span> 03</div></div></Reveal>
    <TrustStrip />
    <Newsletter />
  </main>
}

function ShopPage({ filter, setFilter, searchQuery, ...productProps }) {
  const visibleProducts = useMemo(() => {
    let next = products
    if (filter === 'New in') next = products.filter((product) => product.badge === 'New in')
    else if (filter === 'Festive') next = products.filter((product) => product.category === 'Festive' || product.badge === 'Limited')
    else if (filter !== 'All') next = products.filter((product) => product.category === filter)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      next = next.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query))
    }
    return next
  }, [filter, searchQuery])

  return <main className="inner-page"><PageHero eyebrow="The BAAR edit" title="Shop all pieces" description="Everyday silhouettes, elevated details and the colours of a life well lived." image="/images/asset-01.jpg" /><section className="shop-page-content content-width"><div className="shop-toolbar"><div><p className="eyebrow">{searchQuery ? `Results for “${searchQuery}”` : 'Showing the full edit'}</p><h2>{visibleProducts.length} pieces</h2></div><div className="shop-sort"><span>Sort by</span><button type="button">Featured <span>⌄</span></button></div></div><div className="filter-row page-filters">{filters.map((item) => <button className={filter === item ? 'active' : ''} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><ProductGrid items={visibleProducts} {...productProps} /></section></main>
}

function CollectionsPage({ navigate, setFilter }) {
  return <main className="inner-page"><PageHero eyebrow="Curated chapters" title="Collections" description="A wardrobe in chapters—each collection designed to meet a different mood." image="/images/asset-02.jpg" /><section className="collections-page content-width"><div className="collection-intro"><p className="eyebrow">Three ways to dress the day</p><h2>Find your<br /><em>next chapter.</em></h2><p>From the quiet ease of lawn to evenings that call for a little more glow, explore the edits that make getting dressed feel instinctive.</p><button className="text-button collection-cta" type="button" onClick={() => navigate('shop')}>Shop all pieces <ArrowIcon /></button></div><div className="collection-list">{categories.map((category, index) => <button className={`collection-row collection-row-${index + 1}`} type="button" key={category.title} onClick={() => { setFilter(category.filter); navigate('shop') }}><img src={category.image} alt={category.title} /><span><small>0{index + 1} / Collection</small><strong>{category.title}</strong><em>Shop the edit <ArrowIcon /></em></span></button>)}</div></section><section className="lookbook-band"><div className="content-width"><p className="eyebrow">From the lookbook</p><h2>Clothes for the<br /><em>in-between moments.</em></h2><button className="outline-button" type="button" onClick={() => navigate('shop')}>Shop the lookbook <ArrowIcon /></button></div></section></main>
}

function AboutPage({ navigate }) {
  return <main className="inner-page"><PageHero eyebrow="Our story" title="Clothes with a point of view." description="BAAR is a modern expression of the clothes we grew up loving—made with intention, worn with feeling." image="/images/asset-04.jpg" /><section className="about-story content-width"><div className="about-copy"><p className="eyebrow">A note from Lahore</p><h2>Familiar,<br /><em>never ordinary.</em></h2><p>We started BAAR with a simple thought: the clothes in our wardrobes should hold a little more meaning. They should make room for movement, carry the memory of a place and feel as good on the hundredth wear as they did on the first.</p><p>Our collections bring together considered silhouettes, expressive colour and the craft of our region. Everything is designed to be lived in—not saved for someday.</p><button type="button" className="text-button" onClick={() => navigate('shop')}>Discover the collection <ArrowIcon /></button></div><div className="about-image"><img src="/images/asset-08.jpg" alt="Clothing textures and a fashion studio" /></div></section><section className="values-section"><div className="content-width"><p className="eyebrow">What we care about</p><div className="values-grid"><div><strong>01</strong><h3>Thoughtful design</h3><p>Every print, proportion and finishing detail has a reason to be here.</p></div><div><strong>02</strong><h3>Made to be lived in</h3><p>Beautiful pieces that move through real days, not just special occasions.</p></div><div><strong>03</strong><h3>Rooted in place</h3><p>Our point of view begins in Pakistan and stays curious about the world.</p></div></div></div></section></main>
}

function ProductPage({ product, navigate, addToCart }) {
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  if (!product) return <main className="inner-page not-found"><span>✳</span><h1>Piece not found</h1><button className="outline-button" type="button" onClick={() => navigate('shop')}>Back to shop <ArrowIcon /></button></main>
  return <main className="product-page content-width"><button className="back-link" type="button" onClick={() => navigate('shop')}><span>←</span> Back to shop</button><div className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackProductImage }} /><span className="detail-badge">{product.badge || 'BAAR edit'}</span></div><div className="detail-copy"><p className="eyebrow">{product.category} / BAAR 2025</p><h1>{product.name}</h1><div className="detail-price"><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-rule" /><div className="option-block"><span>Size</span><div className="size-options">{['S', 'M', 'L', 'XL'].map((item) => <button className={size === item ? 'active' : ''} type="button" key={item} onClick={() => setSize(item)}>{item}</button>)}</div></div><div className="option-block"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div></div><button className="add-to-bag" type="button" onClick={() => addToCart(product, quantity)}>Add to bag <ArrowIcon /></button><div className="detail-notes"><p><span>✳</span> Complimentary delivery over PKR 5,000</p><p><span>◌</span> Easy exchanges within 7 days</p></div></div></div><div className="product-story"><p className="eyebrow">A little more about it</p><h2>Made for the moments<br /><em>you don't plan.</em></h2><p>Pair it with your favourite pieces, wear it your way and let it become part of the story. BAAR pieces are designed to move easily between the days you planned and the ones that surprised you.</p></div></main>
}

function CartPage({ cart, removeFromCart, navigate }) {
  const subtotal = cart.reduce((sum, product) => sum + Number(product.price.replace(/[^0-9]/g, '')), 0)
  return <main className="cart-page content-width"><div className="cart-page-heading"><div><p className="eyebrow">Your edit</p><h1>Shopping bag <span>({cart.length})</span></h1></div><button className="text-button" type="button" onClick={() => navigate('shop')}>Continue shopping <ArrowIcon /></button></div>{cart.length === 0 ? <div className="empty-cart-page"><span>✳</span><h2>Your bag is waiting<br />for something special.</h2><button className="outline-button" type="button" onClick={() => navigate('shop')}>Explore the shop <ArrowIcon /></button></div> : <div className="cart-page-grid"><div className="cart-page-items">{cart.map((product, index) => <div className="cart-page-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><strong>{product.price}</strong><button type="button" onClick={() => removeFromCart(index)}>Remove</button></div></div>)}</div><aside className="order-summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>PKR {subtotal.toLocaleString()}</strong></div><div><span>Delivery</span><span>Calculated at checkout</span></div><hr /><div className="summary-total"><span>Total</span><strong>PKR {subtotal.toLocaleString()}</strong></div><button className="checkout-button" type="button">Checkout <ArrowIcon /></button><small>Secure checkout · Easy exchanges</small></aside></div>}</main>
}

function PageHero({ eyebrow, title, description, image }) {
  return <section className="page-hero"><img src={image} alt="" /><span className="page-hero-overlay" /><div className="page-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title === 'Shop all pieces' ? <>Shop all<br />pieces</> : title}</h1><p>{description}</p></div></section>
}

function TrustStrip() {
  return <section className="service-section content-width"><div className="service-card"><span className="service-icon">✳</span><h3>Free delivery</h3><p>On orders over PKR 5,000 across Pakistan.</p></div><div className="service-card"><span className="service-icon">◌</span><h3>Easy exchanges</h3><p>Because the right fit makes all the difference.</p></div><div className="service-card"><span className="service-icon">⌁</span><h3>Made with care</h3><p>Thoughtful details, from our studio to you.</p></div></section>
}

function Newsletter() {
  return <section className="newsletter-section"><div><p className="eyebrow">A note from us</p><h2>Stay in the know.</h2><p>New collections, styling notes and a little inspiration—delivered occasionally.</p></div><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Your email address</label><div className="email-row"><input id="email" type="email" placeholder="you@example.com" required /><button type="submit" aria-label="Subscribe"><ArrowIcon /></button></div></form></section>
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div className="footer-brand"><button className="brand-mark" type="button" onClick={() => navigate('home')}><span className="brand-monogram">BR</span><span className="brand-name">BAAR</span></button><p>Clothes with a point of view.<br />Lahore · Pakistan</p></div><div className="footer-links"><div><h4>Explore</h4><button type="button" onClick={() => navigate('shop')}>Shop all</button><button type="button" onClick={() => navigate('collections')}>Collections</button><button type="button" onClick={() => navigate('about')}>Our story</button></div><div><h4>Help</h4><button type="button">Contact us</button><button type="button">Shipping & returns</button><button type="button">FAQs</button></div><div><h4>Follow along</h4><button type="button">Instagram</button><button type="button">Pinterest</button><button type="button">TikTok</button></div></div><div className="footer-bottom"><span>© 2025 BAAR</span><span>Designed for the everyday extraordinary</span><span>Pakistan (PKR) ↗</span></div></footer>
}

function SearchModal({ query, setQuery, setFilter, close, navigate }) {
  const submit = (event) => { event.preventDefault(); setFilter('All'); close(); navigate('shop') }
  const chooseSuggestion = (item) => { setQuery(item); setFilter('All'); close(); navigate('shop') }
  return <div className="modal-backdrop" role="presentation" onClick={close}><div className="search-modal" role="dialog" aria-modal="true" aria-label="Search products" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={close} aria-label="Close search">×</button><p className="eyebrow">What are you looking for?</p><form className="search-input" onSubmit={submit}><SearchIcon /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Search collections, fabrics, styles..." /><button className="clear-search" type="button" aria-label="Clear search" onClick={() => setQuery('')}>×</button></form><div className="search-suggestions"><span>Popular searches</span>{['Lawn', 'Embroidered', 'Festive'].map((item) => <button type="button" key={item} onClick={() => chooseSuggestion(item)}>{item}</button>)}</div><p className="search-hint">Press Enter to see matching pieces</p></div></div>
}

function AccountModal({ close, navigate }) {
  return <div className="modal-backdrop" role="presentation" onClick={close}><div className="account-modal" role="dialog" aria-modal="true" aria-label="Your BAAR account" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={close} aria-label="Close account">×</button><span className="account-mark">BR</span><p className="eyebrow">Welcome to BAAR</p><h2>Your wardrobe,<br /><em>your story.</em></h2><p className="account-copy">Sign in to save your favourites, check orders and keep your edit close.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="account-email">Email address</label><input id="account-email" type="email" placeholder="you@example.com" required /><button className="account-submit" type="submit">Continue <ArrowIcon /></button></form><button className="guest-button" type="button" onClick={() => { close(); navigate('shop') }}>Continue as guest <ArrowIcon /></button></div></div>
}

function CartDrawer({ cart, close, navigate, removeFromCart }) {
  const subtotal = cart.reduce((sum, product) => sum + Number(product.price.replace(/[^0-9]/g, '')), 0)
  return <div className="cart-backdrop" role="presentation" onClick={close}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your edit</p><h2>Shopping bag <span>({cart.length})</span></h2></div><button className="close-button" type="button" onClick={close} aria-label="Close shopping bag">×</button></div>{cart.length === 0 ? <div className="empty-cart"><span>✳</span><p>Your bag is waiting<br />for something special.</p><button type="button" onClick={() => { close(); navigate('shop') }}>Continue shopping <ArrowIcon /></button></div> : <><div className="cart-items">{cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{product.price}</p><button type="button" onClick={() => removeFromCart(index)}>Remove</button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>PKR {subtotal.toLocaleString()}</strong></div><button className="checkout-button" type="button" onClick={() => { close(); navigate('cart') }}>View bag <ArrowIcon /></button></>}</aside></div>
}

function App() {
  const [route, setRoute] = useState(parseRoute)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState(() => window.localStorage.getItem('baar-theme') || 'light')
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleRoute = () => { setRoute(parseRoute()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('baar-theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = route.page === 'home' ? 'BAAR — Modern South Asian Clothing' : `BAAR — ${route.page[0].toUpperCase()}${route.page.slice(1)}`
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: .1 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [route.page, filter, searchQuery])

  const navigate = (path) => { const next = `#${path}`; if (window.location.hash === next) { setRoute(parseRoute()); window.scrollTo({ top: 0, behavior: 'smooth' }) } else window.location.hash = path }
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const addToCart = (product, quantity = 1) => { setCart((current) => [...current, ...Array.from({ length: quantity }, () => product)]); setCartOpen(true) }
  const removeFromCart = (index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))
  const toggleVideo = () => { if (!videoRef.current) return; if (videoRef.current.paused) { videoRef.current.play(); setVideoPlaying(true) } else { videoRef.current.pause(); setVideoPlaying(false) } }
  const productProps = { navigate, favorites, toggleFavorite, addToCart }
  const currentProduct = products.find((product) => product.id === route.id)

  let page
  if (route.page === 'shop') page = <ShopPage filter={filter} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} {...productProps} />
  else if (route.page === 'collections') page = <CollectionsPage navigate={navigate} setFilter={setFilter} />
  else if (route.page === 'about') page = <AboutPage navigate={navigate} />
  else if (route.page === 'product') page = <ProductPage product={currentProduct} navigate={navigate} addToCart={addToCart} />
  else if (route.page === 'cart') page = <CartPage cart={cart} removeFromCart={removeFromCart} navigate={navigate} />
  else page = <HomePage navigate={navigate} setFilter={setFilter} videoRef={videoRef} videoPlaying={videoPlaying} toggleVideo={toggleVideo} {...productProps} />

  return <div className="site-shell"><Header route={route} navigate={navigate} cartCount={cart.length} menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} setTheme={setTheme} setSearchOpen={setSearchOpen} setCartOpen={setCartOpen} setAccountOpen={setAccountOpen} />{page}<Footer navigate={navigate} />{searchOpen && <SearchModal query={searchQuery} setQuery={setSearchQuery} setFilter={setFilter} close={() => setSearchOpen(false)} navigate={navigate} />}{accountOpen && <AccountModal close={() => setAccountOpen(false)} navigate={navigate} />}{cartOpen && <CartDrawer cart={cart} close={() => setCartOpen(false)} navigate={navigate} removeFromCart={removeFromCart} />}</div>
}

export default App
