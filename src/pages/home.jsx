import Presentation from "../components/presentation"
import Container from "../components/container"
import Contact from "../components/contact"
import ProtectedCompenents from "../components/protectedCompenents";

export default function Home() {
    return (
        <>
            <Presentation />
            <ProtectedCompenents>
                <Container />
            </ProtectedCompenents>
            <Contact />
        </>
    )
}