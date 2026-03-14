type HeaderProps = {
  logoSrc: string;
};

export default function Header(props: HeaderProps) {
  return (
    <header className="site-header">
      <img
        className="site-logo"
        src={props.logoSrc}
        alt="Pixell River Financial logo"
      />

      <div className="site-header-text">
        <h1>Pixell River Employee Directory</h1>
        <p>Welcome! Here’s the current list of employees by department.</p>
      </div>
    </header>
  );
}