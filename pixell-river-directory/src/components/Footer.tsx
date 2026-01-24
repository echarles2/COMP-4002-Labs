export default function Footer() {
  var year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>Copyright Pixell River Financial {year}.</p>
    </footer>
  );
}
