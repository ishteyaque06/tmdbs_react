import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", fallback = "/", className = "" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className={`block self-start text-left text-light-200 hover:underline mb-6 ${className}`}
        >
            &larr; {label}
        </button>
    );
};

export default BackButton;