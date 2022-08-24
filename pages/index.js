import Link from "next/link";
import Image from "next/image";
import { Col, Row, Button } from "react-bootstrap";
import { useStateContext } from "../src/context/StateContext";
import { Footer, ModalDialog } from "../src/components";

const Home = () => {
  const { handleModal, configured } = useStateContext();

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center mb-3">
        <ModalDialog />
        <h1 className="text-center font-weight-bold font-roboto m-3">
          BATTLESHIP{" "}
        </h1>

        <Row className="justify-content-center mb-2">
          <Image
            src="/header.jpg"
            alt="battleship"
            width={700}
            height={250}
            className="shadow"
          />
        </Row>

        <Col md={4} className="mt-4">
          <Row className="h-100">
            <Button className="m-2 p-3" onClick={handleModal}>
              Configure
            </Button>
          </Row>
          <Row className="h-100">
            <Link href="/game">
              <Button className="m-2 p-3" disabled={configured ? false : true}>
                Play
              </Button>
            </Link>
          </Row>
          <Row className="h-100">
            <Link href={"https://docs.hoprnet.org/v1.86/about-hopr"} passHref>
              <Button className="m-2 p-3">About Hopr</Button>
            </Link>
          </Row>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Home;
