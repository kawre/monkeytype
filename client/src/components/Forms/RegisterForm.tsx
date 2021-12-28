import { Form, Formik } from "formik";
import { NextPage } from "next";
import styled from "styled-components";
import { useCreateUser } from "../../api/users.api";
import FormLayout from "../../Layout/FormLayout";
import Button from "../Button";
import Heading from "../Heading";
import FormInput from "./FormInput";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RegisterForm: NextPage<Props> = () => {
  const { mutateAsync } = useCreateUser();
  return (
    <FormLayout>
      <Heading fontSize={"xxxl"} textAlign={"center"} mb={"1rem"}>
        Sign Up
      </Heading>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        }}
        onSubmit={async (input) => {
          console.log(input);
          const res = await mutateAsync(input);
          console.log(res);
        }}
      >
        {() => (
          <Form>
            <FormInput name="username" placeholder="Username" />
            <FormInput name="email" placeholder="Email" />
            <FormInput
              name="password"
              placeholder="Password"
              type={"password"}
            />
            <FormInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type={"password"}
            />
            <Button>Submit</Button>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default RegisterForm;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
