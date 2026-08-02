import AuthTop from "@/modules/reset-pass/components/molecules/AuthTop";
import ForgetPassword from "@/modules/reset-pass/components/organisms/ForgetPassword";


const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 py-4 sm:gap-6 sm:px-4 sm:py-6">
      <AuthTop />
      <ForgetPassword />
    </div>
  );
};

export default page;
