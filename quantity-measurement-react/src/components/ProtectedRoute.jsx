import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/useAuth";

function ProtectedRoute({ children }) {
    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}

export default ProtectedRoute;