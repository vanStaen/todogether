import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postEmailVerified } from "./postEmailVerified";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";

import "./EmailVerified.css";

export const EmailVerified = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { t } = useTranslation();

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(props.match.params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
    }
    setIsLoading(false);
  }, [props.match.params.verifyCode]);

  useEffect(() => {
    emailIsVerified();
  }, [emailIsVerified]);

  return (
    <div>
      <div className="emailVerified__leftPanel">
        <LanguageDropDown />
      </div>
      <div className="emailVerified__rightPanel">
        <div className="emailVerified__container">
          {isLoading ? (
            <LoadingOutlined className="emailVerified__loader" />
          ) : isVerified ? (
            <>
              <strong>{t("login.emailVerified")}</strong> <br />
              {t("login.welcomeInOurCommunity")}!<br />
              {t("login.goAheadAndLogin")}.
              <br />
              <br />
              <div className="emailVerified__link">
                {t("login.redirectedToThe")}{" "}
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {" "}
                  {t("login.loginPage")}.
                </span>
                .
              </div>
            </>
          ) : (
            <>
              <strong>{t("login.emailNotVerified")}!</strong>
              <br />
              {t("login.somethingWrongEmail")}!
              <br />
              <div className="emailVerified__link">
                {t("login.whatCanYouDo")}
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {" "}
                  {t("login.loginPage")}
                </span>
                {", "}
                {t("login.requestNewLink")}.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
