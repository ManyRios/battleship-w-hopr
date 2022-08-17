import Image from 'next/image'
import {Container, Row} from 'react-bootstrap'

const Footer = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center p-3">
          {'Powered by'}<Image 
            src="/HOPR_logo.svg"
            alt="hopr_logo"
            width={150}
            height={50}
          />
      </Row>
    </Container>
  )
}

export default Footer