import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  MailOutlined,
  LockOutlined,
  SyncOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { AlreadyMember } from "../SignUpForm/AlreadyMember";
import { PasswordRecover } from "../PasswordRecover/PasswordRecover";
import { authStore } from "../../stores/authStore/authStore";
import { postVerifyEmailLink } from "./postVerifyEmailLink";

import "./LoginForm.css";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const isEmail = useRef(undefined);
  const { t } = useTranslation();

  const submitHandler = async (values) => {
    setIsLoading(true);
    const email = values.email;
    isEmail.current = email;
    const password = values.password;
    const remember = values.remember;
    try {
      const error = await authStore.login(email, null, password, remember);
      if (error) {
        if (error === "Error: Email is not verified!") {
          const errorMessage = (
            <>
              <strong>{t("login.emailNotVerifyYet")}!</strong>{" "}
              {t("login.checkPostBoxForVerificationLink")}.
              <div
                className="login__verifyEmailLink"
                onClick={() => {
                  postVerifyEmailLink(isEmail.current);
                }}
              >
                <LinkOutlined /> {t("login.clickToGetNewVerificationLink")}
                <span className="link"> {t("login.verifyYourEmail")}</span>.
              </div>
            </>
          );
          notification.error({
            duration: 0,
            message: errorMessage,
            placement: "topLeft",
          });
        } else if (error === "Error: Password is incorrect!") {
          const errorMessage = (
            <>
              <strong>{t("login.passwordIsIncorrect")}!</strong> <br />
              {t("login.pleaseCheckPasswordOrUse")}
              <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
                {" "}
                {t("login.recoverPassword")}{" "}
              </span>{" "}
              {t("login.feature")}.
            </>
          );
          notification.error({
            message: errorMessage,
            placement: "topLeft",
          });
        } else {
          notification.error({
            message: error,
            placement: "topLeft",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return isRecovery ? (
    <PasswordRecover setIsRecovery={setIsRecovery} email={isEmail.current} />
  ) : (
    <div className="login__full">
      <div className="login__header">
        {t("login.loginto")} <b>todogether</b>
        .com {t("login.logintoAfter")}
      </div>

      <Form
        name="form_login"
        className="login__form"
        initialValues={{
          email: isEmail.current,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: t("login.pleaseInputEmail"),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputPassword"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.password")}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ display: "inline-block", width: "calc(50%)" }}
          defaultChecked={false}
        >
          <Checkbox className="login__remember">
            {t("login.rememberMe")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="passwordRecover"
          style={{
            display: "inline-block",
            width: "calc(50%)",
            textAlign: "right",
          }}
        >
          <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
            {t("login.recoverPassword").replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login__formbutton"
          >
            {isLoading ? <SyncOutlined spin /> : t("login.logMeIn")}
          </Button>
          <div className="login__showAlreadyMember">
            <AlreadyMember />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
