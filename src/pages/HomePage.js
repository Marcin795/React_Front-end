import React from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";

export default function HomePage() {
    return (
        <div className={'h-100'}>
            <NavBar/>
            <Container className="d-flex align-items-center h-100">
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Urna duis convallis convallis tellus id interdum velit. Nascetur ridiculus mus mauris vitae ultricies leo. Arcu odio ut sem nulla pharetra diam sit amet nisl. Eget dolor morbi non arcu risus quis varius quam. Vel risus commodo viverra maecenas. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Praesent elementum facilisis leo vel fringilla est ullamcorper eget.</p>
                </div>
            </Container>
        </div>
    )
}