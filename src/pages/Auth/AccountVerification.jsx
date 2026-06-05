import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import { verifyUserAPI } from "~/apis";

function AccountVerification() {
  //Lay gia tri email va token tu URL
  let [searchParams] = useSearchParams();

  // const email = searchParams.get("email");
  // const token = searchParams.get("token");
  const { email, token } = Object.fromEntries([...searchParams]);

  //Tao mot bien state de biet duoc la da verify tai khoan thanh cong hay chua
  const [verified, setVerified] = useState(false);

  //Call API de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({
        email,
        token,
      }).then(() => setVerified(true));
    }
  }, [email, token]);

  //Neu Url co van de (Khong ton tai 1 trong 2 email hoac Token => page 404)
  if (!email || !token) {
    return <Navigate to="/404" />;
  }

  //Neu chua verify xong thi hien Loading
  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />;
  }
  //Cuoi cung neu khong gap van de gi + verify thanh cong thi dieu huong ve trang login cung gia tri verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />;
}

export default AccountVerification;
