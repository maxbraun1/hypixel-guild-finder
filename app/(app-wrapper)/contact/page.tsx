export const metadata = {
  title: "Contact | Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

export default function Contact() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
      <p>
        If you have questions, requests, want to report a bug, or anything else,
        please send me an email at{" "}
        <a
          className="text-purple-400"
          href="mailto:info@hypixelguildfinder.com"
        >
          info@hypixelguildfinder.com
        </a>
        .
      </p>
    </div>
  );
}
