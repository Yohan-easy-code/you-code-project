export default function LegalNoticePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Mentions legales</h1>
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Cette page regroupe les informations legales de l&apos;application
          YouCode.
        </p>
        <p>
          Editeur : YouCode
          <br />
          Contact : contact@youcode.local
        </p>
        <p>
          Hebergement, responsable de publication et informations societes sont
          a completer avant mise en production.
        </p>
      </div>
    </div>
  );
}
