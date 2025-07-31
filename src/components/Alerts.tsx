interface AlerrtProps {
    message: string;
    show: boolean;
  }
  
  export function Alert({ message, show }: AlerrtProps) {
    return (
      <div
        className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500 transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {message}
      </div>
    );
  }
  