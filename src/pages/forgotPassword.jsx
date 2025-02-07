

export default function ForgotPassword() {
    return (
        <div className="connexion-page">
            <p>Reset Password</p>
            <form className="form-login">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter your Email" required />
                <div className="btn">
                    <button>Send</button>
                </div>
                <p>A recovery link will be sent to you by email if you click Send</p>
            </form>
        </div>
    )
}