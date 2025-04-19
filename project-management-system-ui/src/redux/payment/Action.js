import axioApi from "@/config/api"

export const createPayment = async({ planType, jwt }) => {
  try {
    const { data } = await axioApi.post(`/api/payments/${planType}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}