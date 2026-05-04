
import { useParams } from "react-router-dom";

function DetailPage() {
    const { contentid } = useParams();

    return (
        <>
            <h1>{contentid}</h1>
        </>
    )
}

export default DetailPage