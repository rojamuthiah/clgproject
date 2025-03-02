import { useNavigate } from 'react-router-dom';
import flr from "../assets/flr.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      minHeight: '90vh',
      backgroundColor: 'white',
      padding: '2rem'
    }}>
      {/* Left side image */}
      <div style={{
        flex: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px'
      }}><img src={flr} alt="flr" style={{height:"100%",width:"100%"}}/>
      </div>

      {/* Right side content */}
      <div style={{
        flex: 1,
        padding: '2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          color: '#333',
          marginBottom: '2rem',
          fontFamily: 'Playfair Display, serif'
        }}>
          Welcome to Happy Petal Land
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          At Happy Petal Land, we believe every flower tells a story. Our passion for creating beautiful floral arrangements has been bringing joy and color to people's lives . We carefully select the freshest blooms and craft them into stunning arrangements that capture the essence of nature's beauty.
        </p>

        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          lineHeight: '1.8',
          marginBottom: '3rem'
        }}>
          Whether you're celebrating a special occasion or simply want to brighten someone's day, our expert flower model is here to help you choose the perfect arrangement. We offer a wide selection of flowers, from classic roses to exotic orchids, all arranged with artistic flair and attention to detail.
        </p>

        <button 
          onClick={() => navigate('/shop')}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            backgroundColor: '#FF69B4',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            alignSelf: 'center',
            marginTop: 'auto'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Explore Our Collection
        </button>
      </div>
    </div>
  );
};

export default Home;
