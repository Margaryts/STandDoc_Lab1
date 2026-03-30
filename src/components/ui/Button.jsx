const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
    const styles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition',
        secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition',
        success: 'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition',
        danger: 'bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
};

export default Button;