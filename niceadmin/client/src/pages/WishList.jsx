import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import WishListItem from './WishListItem';

const WishList = () => {
  // const [wishList, setWishList] = useState([]);
  const { token, user,isLoggedIn,wishList,setWishList ,getWishlist} = useAuth();

  if (!isLoggedIn) {
    // alert("Login To View Your WishList")
    navigate("/login")
  }


  const navigate = useNavigate()



 

  // const getWishlist = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/user/view-wishlist`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setWishList(data);
  //     } else {
  //       console.error("Failed to fetch wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching wishlist", error);
  //   }
  // };


 

  useEffect(() => {
    getWishlist()
  }, [user]);

  return (
    <div style={{marginTop:"150px"}}>
      <h1>Your WishList</h1>
      <ul style={{display:"flex",gap:"80px"}}>
        {wishList.length > 0 ? (
          <WishListItem wishLists={wishList}/>
          // wishList.map((item, index) => (
          //   <li key={index}>
          //     <div style={styles.productItem}>
          //       <img  src={`http://localhost:3000/uploads/${item.product_id.image}`} alt={item.product_id.product_name} style={styles.productImage} />
          //       <div>
          //         <h2>{item.product_id.product_name}</h2>
          //         <p>{item.product_id.product_description}</p>
          //         <p>Price: Rs.{item.product_id.product_price}</p>
          //         <button onClick={() => handleRemoveWishList(item.product_id)} style={styles.removeButton}>Remove</button>
          //       </div>
          //     </div>
          //   </li>
          // ))
        ) : (
          <p>Your wishlist is empty</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  productItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  productImage: {
    width: '100px',
    height: '100px',
    marginRight: '20px',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default WishList;
