export default function Contact() {
    return (
        <section id="contact" className="contact">
            <h3>Contact</h3>
            <p>Feel free to Contact us by mail or by submitting the form below and we will get back to you as soon as possible</p>
            <form className="form-contact">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter your name" />
                <label htmlFor="email">Email</label>
                <input type="mail" placeholder="Enter your Email" />
                <label htmlFor="comment">Your recommandation</label>
                <textarea name="comment" id="comment" placeholder="Enter your recommandatoion for a better user experience" />
                <button>Submit</button>
            </form>
        </section>
    )
}