"useClient";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, togglePopup } from "@/redux/checkLoginSlice";

function useLogin() {
  const dispatch = useDispatch();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);

  const checkLogin = () => {
    if (!mnemonics) {
      dispatch(togglePopup(true));

      const secret = localStorage.getItem("secret");

      if (secret) {
        dispatch(setLogin(true));
      } else {
        dispatch(setLogin(false));
      }

      return false;
    }
    return true;
  };

  return { checkLogin };
}

export default useLogin;
