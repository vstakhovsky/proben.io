export default function HomePage() {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        background: "#F6F7EF",
      }}
    >
      <iframe
        src="/proben-mvp6/index.html"
        title="Proben MVP 6"
        style={{
          width: "100%",
          height: "100%",
          border: "0",
          display: "block",
          background: "#F6F7EF",
        }}
      />
    </main>
  );
}
