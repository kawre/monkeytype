import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import styled from "styled-components";
import { useCreateSession } from "../../api/auth.api";
import FormLayout from "../../Layout/FormLayout";
import Button from "../Button";
import Heading from "../Heading";
import FormInput from "./FormInput";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const LoginForm: NextPage<Props> = () => {
  const { mutateAsync } = useCreateSession();
  const router = useRouter();

  return (
    <FormLayout>
      <Heading fontSize={"xxxl"} textAlign={"center"} mb={"1rem"}>
        Log In
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (input) => {
          try {
            await mutateAsync(input, {
              onSuccess: () => router.push("/"),
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput name="email" placeholder="Email" />
            <FormInput name="password" type="password" placeholder="Password" />
            <Button>Submit</Button>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default LoginForm;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
