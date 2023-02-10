import { Button, Layout, Space } from "antd";
import { PAGES } from "../../constants/router";
import CreateAccountModal from "../ModalCreateAccount/ModalCreateAccount";
import useLoggedIn from "../../hooks/useLoggedIn";
import LoginModal from "../ModalLogin/ModalLogin";
import './CustomLayout.css';
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import useFetching from "../../hooks/useFetching";
import { logout } from "../../pages/Account/http";

const { Header, Content } = Layout;

export default function CustomLayout({ children }: { children: JSX.Element }) {
  const {
    loggedIn,
    user: { username },
    deleteTokenAndLogout,
  } = useLoggedIn();

  const [fetchLogout] = useFetching({
    fetch: async() => await logout(),
    afterFetch: () => deleteTokenAndLogout()
  })

  return (
    <Layout>
      <Header>
        <div className="header-wrapper">
          <HeaderMenu {...{ loggedIn, routeConstructor: PAGES }} />
          {loggedIn ? (
            <Space>
              <span className="username">Hello, mr. {username}</span>
              <Button type="link" onClick={() => fetchLogout()}>
                Log Out
              </Button>
            </Space>
          ) : (
            <Space>
              <LoginModal />
              <CreateAccountModal />
            </Space>
          )}
        </div>
      </Header>
      <Content children={children} />
    </Layout>
  );
}
