const token = localStorage.getItem("directVendor");

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default auth;
