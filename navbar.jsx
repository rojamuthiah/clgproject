import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'black', padding: '1rem 0' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        <div className="nav-brand">
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
            Petal land
          </Link>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '2rem'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>Shop</Link>
          <Link to="/customize" style={{ color: 'white', textDecoration: 'none' }}>Customize</Link>
          <Link to="/recommend" style={{ color: 'white', textDecoration: 'none' }}>flower bank</Link>
          <Link to="/checkout" style={{ color: 'white', textDecoration: 'none' }}>Checkout</Link>
          <Link to="/payment" style={{ color: 'white', textDecoration: 'none' }}>Payment</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
