import { useEffect, useRef } from "react"

export default function Presentation() {
    const slogan = useRef(null)
    useEffect(() => {
        let slogans = ["Track Earnings, Control Spending, with IncomesExpenses", "Master Your Money Journey with IncomesExpenses", "Track, Plan, and Prosper with IncomesExpenses", "Made Your Financial Roadmap Easy with IncomesExpenses", "Made Your Monthly Budget Simple with IncomesExpenses"]
        const txtSlogan = slogan.current
        let i = 1
        setInterval(() => {
            txtSlogan.textContent = slogans[i]
            i++
            if (i === slogans.length) {
                i = 0
            }
        }, 2000)
    }, [])
    return (
        <section id="home" className="home">
            <p>Record <span>income</span> Money </p>
            <p>And <span>spent</span> Money </p>
            <p ref={slogan} className="slogan">Track Earnings, Control Spending, with IncomesExpenses</p>
        </section>
    )
}