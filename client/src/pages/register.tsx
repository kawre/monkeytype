import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Form/Input";
import Text, { Hyperlink } from "../components/Text";
import { useAuth } from "../contexts/auth.context";
import FormLayout, { Form, SubmitFooter } from "../Layout/FormLayout";
import Layout from "../Layout/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const register: NextPage<Props> = () => {
  const { register } = useAuth();

  return (
    <Layout title="Register">
      <FormLayout title="Sign Up">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (input, { setErrors }) => {
            const res = await register(input);

            if (Array.isArray(res)) {
              const hash: Record<string, string> = {};

              res.forEach((err: string) => {
                const key = err.split(" ")[0];
                const msg = err;
                hash[key] = msg;
              });

              return setErrors(hash);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input name="username" placeholder="Username" type="text" />
              <Input name="email" placeholder="Email" type="email" />
              <Input name="password" placeholder="Password" type="password" />
              <Input
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
              <SubmitFooter>
                <Text mb={2} fontSize={"sm"} textColor={"neutral.500"}>
                  Already have an account?{" "}
                  <Link href={"/login"}>
                    <Hyperlink as={"span"}>Log In</Hyperlink>
                  </Link>
                </Text>
                <Button isLoading={isSubmitting}>Submit</Button>
              </SubmitFooter>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </Layout>
  );
};

export default register;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
