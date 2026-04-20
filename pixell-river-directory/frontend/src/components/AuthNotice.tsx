import { SignInButton } from "@clerk/react";

type AuthRequiredNoticeProps = {
  title: string;
  message: string;
};

export default function AuthNotice(props: AuthRequiredNoticeProps) {
  return (
    <section className="auth-required-notice">
      <h2>{props.title}</h2>
      <p>{props.message}</p>

      <SignInButton mode="modal">
        <button type="button">Log in to continue</button>
      </SignInButton>
    </section>
  );
}