import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { required } from "../../constants/validators";
import useFetching from "../../hooks/useFetching";
import useLoggedIn from "../../hooks/useLoggedIn";
import { login } from "../../pages/Account/http";
import { LoginFormValues } from "../interface";


export default function ModalLogin() {
  const [open, setOpen] = useState(false);

  const { setTokenAndLogin } = useLoggedIn();

  const [fetchLogin, loadingLogin, errorLogin] = useFetching({
    fetch: async (data: LoginFormValues) => await login(data),
    afterFetch: (token: string) => {
      setTokenAndLogin(token);
      form.resetFields();
      setOpen(false);
    },
  })

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    errorLogin && message.error("Something went wrong...", 3);
  }, [errorLogin]);

  const [form] = Form.useForm();

  return (
    <>
      <a onClick={() => setOpen(true)}>Login</a>
      <Modal
        title="Login"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Login"}
        width={400}
        confirmLoading={loadingLogin}
      >
        <Form
          onFinish={fetchLogin}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="username"
            rules={[required()]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[required()]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
