/** API origin: explicit env, or Vercel experimental backend prefix, or local Express. */
function resolveApiBaseURL() {
    const explicit = import.meta.env.VITE_API_URL
    if (explicit) return String(explicit).replace(/\/$/, "")

    if (import.meta.env.DEV) return "http://localhost:5000"

    if (typeof window !== "undefined") {
        return `${window.location.origin}/_/backend`
    }

    return "http://localhost:5000"
}

export const baseURL = resolveApiBaseURL()

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password : {
        url : "/api/user/forgot-password",
        method : 'put'
    },
    forgotPassword : {
        url : "/api/user/forgot-password",
        method : 'put'
    },
    forgot_password_otp_verification : {
        url : '/api/user/verify-forgot-password-otp',
        method : 'put'
    },
    VerifyOtp : {
        url : '/api/user/verify-forgot-password-otp',
        method : 'put'
    },
    resetPassword : {
        url : "/api/user/reset-password",
        method : 'put'
    },
    refreshToken : {
        url : '/api/user/refresh-token',
        method : 'post'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : "get"
    },
    logout : {
        url : "/api/user/logout",
        method : 'get'
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : 'put'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addCategory : {
        url : '/api/category/add-category',
        method : 'post'
    },
    uploadImage : {
        url : '/api/file/upload',
        method : 'post'
    },
    getCategory : {
        url : '/api/category/get-category',
        method : 'get'
    },
    getCategoryLegacy : {
        url : '/api/category/get',
        method : 'get'
    },
    updateCategory : {
        url : '/api/category/update-category',
        method : 'put'
    },
    deleteCategory : {
        url : '/api/category/delete-category',
        method : 'delete'
    },
    createSubCategory : {
        url : '/api/subcategory/create',
        method : 'post'
    },
    getSubCategory : {
        url : '/api/subcategory/get-subcategory',
        method : 'get'
    },
    updateSubCategory : {
        url : '/api/subcategory/update-subcategory',
        method : 'put'
    },
    deleteSubCategory : {
        url : '/api/subcategory/delete-subcategory',
        method : 'delete'
    },
    createProduct : {
        url : '/api/product/create',
        method : 'post'
    },
    addProduct : {
        url : '/api/product/create',
        method : 'post'
    },
    getProduct : {
        url : '/api/product/get',
        method : 'post'
    },
    getProductByCategory : {
        url : '/api/product/get-product-by-category',
        method : 'post'
    },
    getProductByCategoryAndSubCategory : {
        url : '/api/product/get-pruduct-by-category-and-subcategory',
        method : 'post'
    },
    getProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    updateProductDetails : {
        url : "/api/product/update-product-details",
        method : 'put'
    },
    updateProduct : {
        url : "/api/product/update-product-details",
        method : 'put'
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : 'delete'
    },
    searchProduct : {
        url : '/api/product/search-product',
        method : 'post'
    },
    addTocart : {
        url : "/api/cart/add",
        method : 'post'
    },
    addToCart : {
        url : "/api/cart/add",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/get',
        method : 'get'
    },
    getCartItems : {
        url : '/api/cart/get',
        method : 'get'
    },
    getCart : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/update',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete',
        method : 'delete'
    },
    createAddress : {
        url : '/api/address/add',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/delete',
        method : 'delete'
    },
    addAddress : {
        url : '/api/address/add',
        method : 'post'
    },
    deleteAddress : {
        url : '/api/address/delete',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/place-cod",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/place-online",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/my-orders',
        method : 'get'
    },
    allOrders : {
        url : '/api/order/all',
        method : 'get'
    },
    updateOrderStatus : {
        url : '/api/order/update-status',
        method : 'put'
    },
    adminStats : {
        url : '/api/admin/stats',
        method : 'get'
    }
}

export default SummaryApi