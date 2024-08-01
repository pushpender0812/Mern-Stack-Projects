import { createContext,useContext, useEffect, useState } from "react";


// 1)  Context

export const AuthContext = createContext()

// 2) Provider      

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [getCategory,setGetCategory] = useState([])
    const [getProduct,setGetProduct] = useState([])
    const [user,setUser] = useState("")
    const [wishList,setWishList] = useState([])
    const [cart, setCart] = useState([]);

    const authorizationToken = `Bearer ${token}`

    const storeTokenInloclStr = (servertoken) => {
        setToken(servertoken)
        return localStorage.setItem("token",servertoken)
    }

    let isLoggedIn = !! token

    const LogoutUser = () => {
        setUser("");
        setToken("");
        return localStorage.removeItem("token")
    }

    const getCategoryData = async() => {
        try {
            const response = await fetch(`http://localhost:3000/api/getcategory-data`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                  
                  },
            })

            if (response.ok) {
                const data = await response.json()
                  console.log("Category Data",data);    
                  setGetCategory(data)
            }
            
        } catch (error) {
            console.log(`Category getting Frontend error ${error}`);
        }
    }


    // getting product data

    const getProductData = async() => {
        try {
            const response = await fetch(`http://localhost:3000/api/getproduct-data`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                
                  },    
            })

            if (response.ok) {
                const data = await response.json()
                  console.log("Product Data",data);    
                  setGetProduct(data)
            }
            
        } catch (error) {
            console.log(`Product getting Frontend error ${error}`);
        }
    }

    

    const getCurrentUser = async() => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/user-me`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                  },

                  
            })
            // console.log("AUTH user data",response);

            if (response.ok) {
                const data = await response.json()
                  console.log("Current User Data",data);    
                  setUser(data);
            }
        } catch (error) {
            console.log("Error Fetching User data",error)
        }
    }

    const getWishlist = async () => {
        // console.log("pushpender e yadav",user);
        try {
          const response = await fetch(`http://localhost:3000/api/user/view-wishlist`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            // console.log("data in auth in wishlist",data);
            setWishList(data);
          } else {
            console.error("Failed to fetch wishlist");
          }
        } catch (error) {
          console.error("Error fetching wishlist", error);
        }
      };

      
  const getCartItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/view-cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

    useEffect(() => {
        getCategoryData()
        getProductData()
        getCurrentUser()
        getWishlist()
        getCartItem()
    },[token])
    
    console.log(user,"Aedbasdvasdvasdf")
    return <AuthContext.Provider value={{storeTokenInloclStr,isLoggedIn,LogoutUser,getCategory,getProduct,user,token,wishList,setWishList,authorizationToken,getCurrentUser,getWishlist,cart,setCart,getCartItem}}>
        {children}
    </AuthContext.Provider>
}


    export const useAuth = () => {
        const authContextValue = useContext(AuthContext);

        if (!authContextValue) {
            throw new Error("useAuth used Outside of Provider")
        }
        return authContextValue
    }
