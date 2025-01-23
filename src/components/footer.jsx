export default function Footer() {
    const date = new Date();
    return(
        <footer>
            <div className="container-footer">
                
                <p>Follow us</p>
                <p>Address</p>
                <p>About the website</p>
            </div>
            <p className="droit-reserve">
                <i className="fa-regular fa-copyright"></i>{" " + date.getFullYear() + " IncomesExpenses, " + "all rights reserved"}
            </p>
        </footer>
    )
}