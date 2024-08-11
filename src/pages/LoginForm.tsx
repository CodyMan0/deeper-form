import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../schema/authSchema";

export type LoginInput = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //TODO : 인증 서버로 보내는 함수 로직 추가

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log("data", data);
  };

  const handleFormInvalid: SubmitErrorHandler<LoginInput> = (errors) => {
    if (errors.email) {
      console.log(errors.email);
    } else if (errors.password) {
      console.log(errors.password);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col gap-xs"></div>
        <div>
          <p className="font-normal text-gray-700 text-center mb-3xs">
            아직 계정이 없으신가요?{" "}
          </p>

          <button
            type="submit"
            className="h-xl"
            onClick={methods.handleSubmit(onSubmit, handleFormInvalid)}
          >
            로그인
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginForm;
