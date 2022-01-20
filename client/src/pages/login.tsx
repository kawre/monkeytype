import { Form, Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Input from "../components/Form/Input";
import Text, { Hyperlink } from "../components/Text";
import { useAuth } from "../contexts/auth.context";
import FormLayout, { SubmitFooter } from "../Layout/FormLayout";
import Layout from "../Layout/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const login: NextPage<Props> = () => {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <Layout title="Log In">
      <FormLayout title="Login">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (input) => {
            await login(input);
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input name="email" placeholder="Email" />
              <Input name="password" type="password" placeholder="Password" />
              <SubmitFooter>
                <Text fontSize={"sm"} textColor={"neutral.500"}>
                  Don't have an account?{" "}
                  <Link href={"/register"}>
                    <Hyperlink as={"span"}>Sign Up</Hyperlink>
                  </Link>
                </Text>
                <Button loading={isSubmitting}>Submit</Button>
              </SubmitFooter>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </Layout>
  );
};

export default login;
