import { axiosInstance } from "./commonAPI"

export const registerUserApi = async (reqBody) => {
  return await axiosInstance.post(`/user/register`, reqBody)
}

export const loginUserApi = async (reqBody) => {
  return await axiosInstance.post(`/user/login`, reqBody)
}

export const getAllProductsUsersApi = async () => {
  return await axiosInstance.get(`/getAllProductUsers`);
};
export const getAllProductsApi = async () => {
  return await axiosInstance.get(`/getAllProduct`)
}

export const getSingleProductApi = async (id) => {
  return await axiosInstance.get(`/getProduct/${id}`)
}

export const getSingleUserApi = async (id) => {
  return await axiosInstance.get(`/user/getAccount`)
}

export const updateProfileApi = async (reqBody) => {
  return await axiosInstance.put(`/user/update`, reqBody)
}

export const addToCartApi = async (reqBody) => {
  return await axiosInstance.post(`/userCart/addCart`, reqBody);
};

export const getCartApi = async () => {
  return await axiosInstance.get(`/userCart/viewCart`);
};

export const editCartApi = async (reqBody) => {
  return await axiosInstance.put(`/userCart/editCart`, reqBody);
};

export const deleteCartItemApi = async (productId,reqBody) => {
  return await axiosInstance.delete(`/userCart/deleteCart/${productId}`, reqBody);
};

export const placeOrderApi = async () => {
  return await axiosInstance.post(`/order/placeOrder`);
};

export const getUserOrdersApi = async () => {
  return await axiosInstance.get(`/order/getuserOrder`);
};

export const updatePaymentStatusApi = async (orderId, reqBody) => {
  return await axiosInstance.put(`/order/editpayment/${orderId}`, reqBody);
};

export const getAllUsersApi = async () => {
  return await axiosInstance.get(`/admin/getUsers`);
};

export const getAllOrdersApi = async () => {
  return await axiosInstance.get(`/order/getAllOrders`);
};

export const adminLoginApi = async (reqBody) => {
  return await axiosInstance.post(`/admin/login`, reqBody, {
    withCredentials: true,
  });
};


export const toggleUserStatusApi = async (id) => {
  return await axiosInstance.delete(`/admin/disableUser/${id}`);
};

export const logoutUserApi = async () => {
  return await axiosInstance.delete(`/user/logout`);
};

export const logoutAdminApi = async () => {
  return await axiosInstance.delete(`/admin/admin_logout`);
};


export const adminGetProductsApi = async () => {
  return await axiosInstance.get(`/getAllProduct`);
};

export const disableProductApi = async (id) => {
  return await axiosInstance.delete(`/disableProduct/${id}`);
};

export const updateProductApi = async (id, formData) => {
  return await axiosInstance.put(`/updateProduct/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const addProductApi = async (formData) => {
  return await axiosInstance.post("/addProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};


export const getAllCategoriesApi = async () => {
  return await axiosInstance.get("/getAllCategory", { withCredentials: true });
};

export const addCategoryApi = async (reqBody) => {
  return await axiosInstance.post("/addCategory", reqBody, { withCredentials: true });
};

export const updateCategoryApi = async (id, reqBody) => {
  return await axiosInstance.put(`/editCategory/${id}`, reqBody, { withCredentials: true });
};

export const deleteCategoryApi = async (id) => {
  return await axiosInstance.delete(`/dltCategory/${id}`, { withCredentials: true });
};


export const getAdminAllOrdersApi = async () => {
  return await axiosInstance.get("/order/getAllOrders", { withCredentials: true });
};

export const editShippingStatusApi = async (id, reqBody) => {
  return await axiosInstance.put(`/order/editOrder/${id}`, reqBody, { withCredentials: true });
};

export const deleteOrderApi = async (id) => {
  return await axiosInstance.delete(`/order/deleteOrder/${id}`, { withCredentials: true });
};
