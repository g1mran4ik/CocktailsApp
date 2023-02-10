import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { required, validatePasswords } from "../../constants/validators";
import useFetching from "../../hooks/useFetching";
import { postUserAccount } from "../../pages/Account/http";
import { CreateAccountFormValues, LoginFormValues } from "../interface";


export default function ModalCreateAccount() {
  const [open, setOpen] = useState(false);

  const [fetchUserAccountPOST, loadingUserAccountPOST, errorUserAccountPOST] =
    useFetching({
      fetch: async (data: LoginFormValues) => await postUserAccount(data),
      afterFetch: () => {
        form.resetFields();
        setOpen(false);
        message.success("Account created!", 3);
      },
    });

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    errorUserAccountPOST && message.error("Something went wrong...", 3);
  }, [errorUserAccountPOST]);

  const [form] = Form.useForm();

  return (
    <>
      <a onClick={() => setOpen(true)}>Create an account</a>
      <Modal
        title="Create a new account"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Create account"}
        width={400}
        confirmLoading={loadingUserAccountPOST}
      >
        <Form
          onFinish={({ confirmPassword, ...values }: CreateAccountFormValues) =>
            fetchUserAccountPOST(values)
          }
          autoComplete="off"
          requiredMark={false}
          form={form}
        >
          <Form.Item
            name="username"
            validateFirst
            hasFeedback
            rules={[required()]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            rules={[required()]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[required(), validatePasswords]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
