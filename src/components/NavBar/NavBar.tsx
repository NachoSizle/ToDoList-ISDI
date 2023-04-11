import { Image, Navbar, Text } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar isBordered
      variant="sticky" 
      css={{
        maxW: "100vw"
      }}>
      <Navbar.Brand>
        <Image width={80}
          src="https://pbs.twimg.com/media/E_-ACM_XsAEa6cB?format=png&name=4096x4096"/>
        <Text b color="inherit" hideIn="xs">
          ToDo List
        </Text>
      </Navbar.Brand>
    </Navbar>
  )
}