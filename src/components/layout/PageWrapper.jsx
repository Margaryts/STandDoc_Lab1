const PageWrapper = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
        {children}
    </div>
);

export default PageWrapper;