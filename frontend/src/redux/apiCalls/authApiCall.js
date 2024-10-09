import { authActions } from "../slices/authSlice";
import request from "../../utils/request";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
  
    } catch (error) {
      // Gérer les différents types d'erreurs
      const errorMessage =
        error.response?.data?.message || // Pour le message de vérification de l'email
        error.response?.data?.errors || // S'il s'agit d'une liste d'erreurs
        error.response?.data?.error || // S'il s'agit d'un message d'erreur unique
        "Une erreur est survenue. Veuillez réessayer.";
 console.log(errorMessage)
    }
  };
}
