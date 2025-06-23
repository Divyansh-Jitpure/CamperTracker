import { Children, createContext, useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "sonner";

export const CamperContext = createContext();

export const CamperProvider = ({ children }) => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCampers = async () => {
    try {
      const campersAPI = await API.get("/getCampers", {
        withCredentials: true,
      });
      setCampers(campersAPI.data.campers);
      return campersAPI.data.campers;
    } catch (err) {
      console.error(
        "Error fetching campers:",
        err.response?.data || err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCampers();
  }, [campers]);

  const addCamper = async (day) => {
    const addCamperPromise = new Promise(async (resolve, reject) => {
      await API.post("/addCamper", { date: day })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(
            "Error adding camper:",
            error.response?.data || error.message,
          );
          reject(error.response?.data?.error || "Failed to add camper");
        });
    });

    toast.promise(addCamperPromise, {
      loading: "Adding Camper...",
      success: "Camper added successfully!!",
      error: (errMsg) => errMsg, // Show the specific error message
    });

    return addCamperPromise;
  };

  const removeCamper = async (day) => {
    const removeCamperPromise = new Promise(async (resolve, reject) => {
      await API.delete("/removeCamper", { data: { date: day } })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(
            "Error removing camper:",
            error.response?.data || error.message,
          );
          reject(error.response?.data?.error || "Failed to remove camper");
        });
    });

    toast.promise(removeCamperPromise, {
      loading: "Removing Camper...",
      success: "Camper removed successfully!!",
      error: (errMsg) => errMsg, // Show the specific error message
    });

    return removeCamperPromise;
  };

  const uploadBill = async (bill) => {
    console.log(bill);

    const formData = new FormData();
    formData.append("bill", bill);

    const uploadPromise = new Promise(async (resolve, reject) => {
      await API.post("/uploadBill", formData)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(
            "Error uploading bill:",
            error.response?.data || error.message,
          );
          reject(error.response?.data?.error || "Failed to upload bill");
        });
    });
    toast.promise(uploadPromise, {
      loading: "Uploading Bill...",
      success: "Bill uploaded successfully!!",
      error: (errMsg) => errMsg, // Show the specific error message
    });
    return uploadPromise;
  };


  




  return (
    <CamperContext.Provider
      value={{ campers, loading, removeCamper, addCamper, uploadBill }}
    >
      {children}
    </CamperContext.Provider>
  );
};
