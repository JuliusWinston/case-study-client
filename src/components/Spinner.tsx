import { FC } from "react"

interface SpinnerProps {
  size?: number
}

const Spinner: FC<SpinnerProps> = ({ size }) => {
  return (
    <div className="spinner-border text-primary" style={{ width: size, height: size }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner
