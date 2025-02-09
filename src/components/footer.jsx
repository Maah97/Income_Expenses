export default function Footer() {
    const date = new Date();
    return(
        <footer>
            <div className="container-footer">
                <div className="address">
                        <p>Address</p>
                        <ul>
                            <li>IncomeExpense LLP,</li>
                            <li>North Region, Garoua</li>
                            <li>Cameroon</li>
                            <li>Contact : +237 656 368 060</li>
                        </ul>
                </div>
                <div className="about">
                        <p>About the website</p>
                        <p>Income-Expenses, is your ultimate financial tracking tool ! We are here to helps you monitor your income and expenses over any period, from months to years, giving you a clear view of your financial health.</p>
                </div>
                <div className="follow-us">
                    <p>Follow Us</p>
                    <div className="links">
                        <a href="mailto:mahmoudouaboul@gmail.com">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                        <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180" rel='noreferrer' target='_blank'>
                            <i id='linkedin' className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/Maah97" rel='noreferrer' target='_blank'>
                            <i id='github' className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://x.com/mahmoudouabdoul" rel='noreferrer' target='_blank'>
                            <i id='twitter' className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <p className="droit-reserve">
                <i className="fa-regular fa-copyright"></i>{" " + date.getFullYear() + " IncomesExpenses, " + "all rights reserved"}
            </p>
        </footer>
    )
}