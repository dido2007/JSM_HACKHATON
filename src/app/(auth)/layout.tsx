/**
 * Gradient taken from cssgradient.io
 * @see https://cssgradient.io/
 */

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[linear-gradient(176deg,_rgba(0,36,7,1)_0%,_rgba(34,75,29,1)_25%,_rgba(68,113,51,1)_50%,_rgba(69,163,21,1)_75%,_rgba(70,200,0,1)_100%)]">
      {children}
    </div>
  );
};

export default AuthLayout;
