import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div>
            Error page
            <Link className="btn" to={'/'}>   Back to home</Link>
        </div>
    )
}
