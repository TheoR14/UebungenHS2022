
function Footer() {
    return (
            <nav className="Footer">
                <ul className="footer_nav">
                    <li className="footer_li">
                        <button disabled className="li-button">Home</button>
                    </li>
                    <li className="footer_li">
                        <button disabled className="li-button">Coordinate Transformation</button>
                    </li>
                    <li className="footer_li">
                        <button disabled className="li-button">Geodetic Calculation</button>
                    </li>
                    <li className="footer_li">
                        <button disabled className="li-button">Show in Map</button>
                    </li>
                </ul>
            </nav>
    )
}

export default Footer