import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useStateContext } from "../src/context/StateContext";
import { Footer, ModalDialog } from "../src/components";

const Home = () => {
  const router = useRouter();
  const {
    handleModal,
    configured,
    httpEndpoint,
    setWsEndpoint,
    securityToken,
    setHTTPEndpoint,
    setSecurityToken,
  } = useStateContext();

  useEffect(() => {
    const getParamsUrl = () => {
      if (router.query.apiEndpoint) {
        setHTTPEndpoint(router.query.apiEndpoint);
        setWsEndpoint(`${httpEndpoint}/api/v2/messages/websocket`);
      }
      if (router.query.apiToken) {
        setSecurityToken(router.query.apiToken);
      }
    };
    getParamsUrl();
  }, [router]);

  const handleClick = () => {
    router.push(
      {
        pathname: "/game",
        query: {
          apiEndpoint: httpEndpoint,
          apiToken: securityToken,
        },
      },
      undefined,
      { shallow: true }
    );
  };

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
            <Button
              className="m-2 p-3"
              onClick={handleClick}
              disabled={configured ? false : true}
            >
              Play
            </Button>
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
